"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../@/components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "../../../utils/schema";
import { db } from "../../../utils/db";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation"; // Correct import for App Router

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyA7o8cPAMYecsV_xCt9wkIzUw2yn7HtjkU");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const AddNewInterview = () => {
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const dialogContentRef = useRef(null); // Ref for DialogContent

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const InputPrompt = `Job position: ${jobPosition}, Job description: ${jobDescription}, years of experience: ${jobExperience}. Based on this information, give me 5 interview questions with answers in JSON format.`;

    try {
      const result = await model.generateContent(InputPrompt);
      const MockJsonResp = result.response.text().replace("```json", "").replace("```", "");
      const parsedResponse = JSON.parse(MockJsonResp);

      if (parsedResponse) {
        const resp = await db.insert(MockInterview).values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition,
          jobDesc: jobDescription,
          jobExperience,
          createBy: user?.primaryEmailAddress?.emailAddress,
          createAt: moment().format("DD-MM-YYYY"),
        }).returning({ mockId: MockInterview.mockId });

        if (resp) {
          router.push(`/dashboard/interview/${resp[0]?.mockId}`);
        }
      }
    } catch (error) {
      console.error("Error generating AI content:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dialogContentRef.current) {
      dialogContentRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [dialogContentRef]); // Runs when dialogContentRef is set

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
          >
            <h2 className="font-bold text-lg text-center">+ Add New 📝</h2>
          </div>
        </DialogTrigger>

        <DialogContent
  ref={dialogContentRef}
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
>
  <div className="relative bg-white p-4 rounded-lg shadow-xl max-w-2xl w-full mx-auto border-2 border-gray-300 max-h-[80vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle className="text-2xl font-bold text-left text-gray-900">
        Tell us more about your Interview 💼🧑‍💻🏢👔
      </DialogTitle>
    </DialogHeader>
    <form onSubmit={onSubmit} className="space-y-5 w-full">
      <div className="space-y-3">
        <div>
          <strong className="text-gray-800">
            Add details about your job description and years of experience 💼
          </strong>
        </div>
        <div className="my-3">
          <label className="block text-sm font-medium text-left text-gray-700">
            Job Role/Job Position 🧑‍💻
          </label>
          <input
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Ex. Full Stack Developer"
            required
            onChange={(event) => setJobPosition(event.target.value)}
            value={jobPosition}
          />
        </div>
        <div className="my-3">
          <label className="block text-sm font-medium text-left text-gray-700">
            Job Description/tech stack (In Short) 📚
          </label>
          <input
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Ex. React js, MySQL, Node.js...etc"
            required
            onChange={(event) => setJobDescription(event.target.value)}
            value={jobDescription}
          />
        </div>
        <div className="my-2">
          <label className="block text-sm font-medium text-left text-gray-700">
            Years of experience 🏆
          </label>
          <input
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Ex. 5"
            max="25"
            type="number"
            required
            onChange={(event) => setJobExperience(event.target.value)}
            value={jobExperience}
          />
        </div>
      </div>
      <div className="flex gap-5 justify-center font-bold">
        <Button className="hover:bg-blue-500 bg-orange-400" type="button" onClick={() => setLoading(false)}>
          Cancel
        </Button>
        <Button type="submit" className="hover:bg-blue-500 bg-orange-400" disabled={loading}>
          {loading ? (
            <>
              <LoaderCircle className="animate-spin" />
              Generating from AI
            </>
          ) : (
            "Start Interview"
          )}
        </Button>
      </div>
    </form>
  </div>
</DialogContent>

      </Dialog>
    </div>
  );
};

export default AddNewInterview;
