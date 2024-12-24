"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../../../utils/db";
import { MockInterview } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";

const Interview = ({ params: paramsPromise }) => {
  const [params, setParams] = useState(null);
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await paramsPromise;
      setParams(resolvedParams);
    };

    resolveParams();
  }, [paramsPromise]);

  useEffect(() => {
    if (params?.interviewId) {
      GetInterviewDetails();
    }
  }, [params]);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  if (!params) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="my-10 px-5 py-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl shadow-lg">
      <h2 className="font-extrabold text-3xl text-orange-500 mb-6">🚀Let's get started🚀</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col p-6 rounded-lg border border-white bg-white shadow-md">
            {interviewData ? (
              <>
                <h2 className="text-xl text-gray-700">
                  <strong>Job Role/Job Position: </strong>
                  {interviewData.jobPosition}
                </h2>
                <h2 className="text-lg text-gray-600">
                  <strong>Job Description/Tech stack: </strong>
                  {interviewData.jobDesc}
                </h2>
                <h2 className="text-lg text-gray-600">
                  <strong>Year of Experience: </strong>
                  {interviewData.jobExperience}
                </h2>
              </>
            ) : (
              <p className="text-gray-500">Loading job details...</p>
            )}
          </div>

          <div className="p-6 border rounded-lg bg-yellow-100 shadow-lg">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb className="text-xl" />
              <strong> Information </strong>
            </h2>
            <h2 className="mt-3 text-lg text-yellow-600">
              To begin your interview, please enable your webcam and
              microphone. This will allow us to create an engaging and
              interactive experience for you. Click the button below to get
              started!
            </h2>
          </div>
        </div>

        <div className="flex justify-center items-center">
          {webCamEnabled ? (
            <div className="relative">
              <Webcam
                onUserMedia={() => console.log("Webcam enabled")}
                mirrored={true}
                videoConstraints={{
                  width: 300,
                  height: 300,
                }}
                style={{
                  height: 300,
                  width: 300,
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                }}
              />
            </div>
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border shadow-md" />
              <Button
                 className="hover:bg-blue-500 bg-orange-400 transition-all duration-300 ease-in-out text-white "
                variant="outline"
                onClick={() => setWebCamEnabled(true)}
              >
                Enable webcam and microphone
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button
            variant="outline"
            className="hover:bg-blue-500 bg-orange-400 transition-all duration-300 ease-in-out text-white "
          >
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
