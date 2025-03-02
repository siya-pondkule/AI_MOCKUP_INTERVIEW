"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../../../../utils/db";
import { MockInterview } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import QuestionSection from './_components/QuestionsSection'
import RecordAnswerSection from './_components/RecordAnswerSection'
import { Button } from "../../../../../components/ui/button";
import Link from "next/link";

const StartInterView = () => {
    const params = useParams();
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);
     

    useEffect(() => {
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        if (params?.interviewId) {
            const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
            const jsonMockResp = JSON.parse(result[0].jsonMockResp);
            console.log(jsonMockResp);
            setMockInterviewQuestion(jsonMockResp);
            setInterviewData(result[0]);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                
                <QuestionSection mockInterviewQuestion={mockInterviewQuestion}
                activeQuestionIndex={activeQuestionIndex}
                />

                <RecordAnswerSection
                 mockInterviewQuestion={mockInterviewQuestion}
                 activeQuestionIndex={activeQuestionIndex}
                 interviewData={interviewData}
                />
            </div>

            <div className="flex justify-end gap-6">
               {activeQuestionIndex>0 && <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)} variant="outline" className="hover:bg-blue-500 bg-orange-400">Previous Question</Button>}

               {activeQuestionIndex!=mockInterviewQuestion?.length-1&& <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)} variant="outline" className="hover:bg-blue-500 bg-orange-400">Next Question</Button>}

               {activeQuestionIndex==mockInterviewQuestion?.length-1 && 
               <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>

               <Button  variant="outline" className="hover:bg-blue-500 bg-orange-400">End Interview</Button>

               </Link>}
               
            </div>
        </div>
    );
};

export default StartInterView;
