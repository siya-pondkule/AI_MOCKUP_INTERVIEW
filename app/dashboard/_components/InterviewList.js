"use client";

import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { db } from '../../../utils/db';
import { MockInterview } from '../../../utils/schema';
import { desc, eq } from 'drizzle-orm';
import Interview from '../interview/[interviewId]/page';
import { index } from 'drizzle-orm/mysql-core';
import InterviewItemCard from './InterviewItemCard';

const InterviewList = () => {

    const {user}=useUser();
    const [InterviewList,setInterviewList]=useState([]);

    useEffect(()=>{
        user&&GetInterviewList();
    },[user])

    const GetInterviewList=async()=>{
        const result=await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.createBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id));

        console.log(result);
        setInterviewList(result);
    }
  return (
    <div>
      <h2 className='text-xl text-blue-700 font-bold'>Previous Mock Interview⏪</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
        {InterviewList&&InterviewList.map((Interview,index)=>(
            <InterviewItemCard
            interview={Interview}
            key={index}/>
        ))}
      </div>
    </div>
  )
}

export default InterviewList
