"use client";

import React, { useEffect, useState } from "react";
import { UserAnswer } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { db } from "../../../../../utils/db";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../../@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { useRouter } from "next/navigation";

const Feedback = ({ params: paramsPromise }) => {
  const [params, setParams] = React.useState(null);
  const [feedbackList, setFeedbackList] = useState([]);
  const [rating, setRating] = useState(0); 
  const router = useRouter();

  useEffect(() => {
    // Unwrap params promise
    paramsPromise.then((resolvedParams) => {
      setParams(resolvedParams);
    });
  }, [paramsPromise]);

  useEffect(() => {
    if (params) {
      GetFeedback();
    }
  }, [params]);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);

    // Calculate the overall rating based on each question's rating out of 5
    if (result.length > 0) {
      const totalRating = result.reduce((sum, item) => sum + item.rating, 0);
      const maxRating = result.length * 5; // Each question is rated out of 5
      const averageRating = (totalRating / maxRating) / 10; // Scale the rating to be out of 10
      setRating(averageRating);
    } else {
      setRating(0);
    }
  };

  return (
    <div className="p-10">
      {feedbackList?.length === 0 ? (
        <h2 className="font-bold text-xl text-red-700">No Interview Feedback Record Found</h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-600">Congratulations!! 🎉🎉🎉</h2>
          <h2 className="font-bold text-2xl">⭐Here is your interview feedback⭐</h2>
          <h2 className="text-blue-700 text-lg my-3">
            Your overall interview rating: <strong>{rating.toFixed(1)}/10</strong>
          </h2>

          <h2 className="text-sm text-orange-700 font-semibold">
            Find below interview question with correct answer, your answer, and feedback for improvement.
          </h2>

          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-10 w-full">
                  {item.question} <ChevronsUpDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-red-600 p-2 border rounded-lg">
                      <strong>Rating:</strong> {item.rating}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-red-900">
                      <strong>Your Answer: </strong>{item.userAns}
                    </h2>

                    <h2 className="p-2 border rounded-lg bg-green-50 text-green-900">
                      <strong>Correct Answer: </strong>{item.correctAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-blue-900">
                      <strong>Feedback: </strong>{item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}
      <Button onClick={() => router.replace('/dashboard')} variant="outline" className="hover:bg-blue-500 bg-orange-400">
        Go Home
      </Button>
    </div>
  );
};

export default Feedback;
