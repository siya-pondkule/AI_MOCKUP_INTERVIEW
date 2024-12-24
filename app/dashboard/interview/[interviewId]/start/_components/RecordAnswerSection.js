"use client";

import React, { useEffect, useState } from "react";
import Webcam from "react-webcam"; // Importing react-webcam
import Image from "next/image";
import { Button } from "../../../../../../components/ui/button";
import { Mic, StopCircle } from "lucide-react";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";
import { db } from "../../../../../../utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { UserAnswer } from "../../../../../../utils/schema";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyA7o8cPAMYecsV_xCt9wkIzUw2yn7HtjkU");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Debugging: Check interviewData on mount
  useEffect(() => {
    console.log("interviewData:", interviewData);
  }, [interviewData]);

  useEffect(() => {
    
    if (results.length > 0) {
      const fullAnswer = results
        .map((result) => result?.transcript)
        .join(" ");
      setUserAnswer((prevAns) => prevAns + " " + fullAnswer);
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 5) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  // Display error if any
  useEffect(() => {
    if (error) {
      console.error("Speech-to-text error:", error);
    }
  }, [error]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      console.log(userAnswer);
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log("Updating user answer...");
    console.log("User answer:", userAnswer);
    console.log("Interview data:", interviewData);
  
    setLoading(true);
  
    if (!interviewData?.mockId) {
      console.error("mockId is missing from interviewData.");
      toast.error("Mock ID is missing. Please retry.");
      setLoading(false);
      return;
    }
  
    try {
      const feedbackPrompt = `
        Question: ${mockInterviewQuestion[activeQuestionIndex]?.question},
        User Answer: ${userAnswer}.
        Provide a rating and feedback in JSON format:
        { "rating": "1-10", "feedback": "Your feedback here" }
      `;
  
      const result = await model.generateContent(feedbackPrompt);
      const JsonFeedbackResp = JSON.parse(
        result.response.text().replace("```json", "").replace("```", "")
      );
  
      const resp = await db.insert(UserAnswer).values({
        mockIdRef:interviewData?.mockId,
        question:mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns:userAnswer,
        feedback:JsonFeedbackResp?.feedback,
        rating:JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD-MM-YYYY')
      });
  
      console.log("Database insert response:", resp);
      toast.success("User answer recorded successfully!");
      setResults([]);
      
    } catch (err) {
      console.error("Error in UpdateUserAnswer:", err);
      toast.error("An error occurred while saving your answer. Please try again.");
    } finally {
      setUserAnswer("");
      setResults([]);
      setLoading(false);
      
    }
  };
  
  
  

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center rounded-lg p-5 relative">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute z-0"
          alt="webcam"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 1,
          }}
        />
      </div>

      <Button 
        disabled={loading}
        variant="outline"
        className="my-10 cursor-pointer"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-500 cursor-pointer flex gap-2">
            <StopCircle />
            Stop Recording
          </h2>
        ) : (
          <h2 className="text-red-500 cursor-pointer flex gap-2">
            <Mic />
            Record Answer
          </h2>
        )}
      </Button>

      {/* <Button onClick={() => console.log(userAnswer)} variant="ghost">
        Show user answer
      </Button> */}
      {error && <p className="text-red-500 ">Error: {error.message}</p>}
    </div>
  );
};

export default RecordAnswerSection;
