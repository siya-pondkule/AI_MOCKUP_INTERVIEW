import React from 'react'
import { Button } from '../../../components/ui/button'
import { useRouter } from 'next/navigation'

const InterviewItemCard = ({interview}) => {

const router = useRouter();

const onStart=()=>{
    router.push('dashboard/interview/'+interview?.mockId)
}

const onFeedbackPress=()=>{
    router.push('dashboard/interview/'+interview.mockId+"/feedback")
}

  return (
    <div className='border shadow-sm rounded-lg p-3'>
      <h2 className='font-bold text-orange-600 text-xl'>{interview?.jobPosition}</h2>
      <h2 className='text-sm text-gray-800'>{interview?.jobExperience} Years of Experience</h2>
      <h2 className='text-sm text-gray-500'>Created At: {interview.createAt}</h2>

      <div className='flex justify-between mt-2 gap-5'>
        <Button size="sm" variant="outline" className="hover: bg-gray-400 w-full" onClick={onFeedbackPress}
        >Feedback</Button>

        <Button size="sm" variant="outline" className="hover:bg-blue-500 bg-orange-400 w-full" onClick={onStart}>Start</Button>
      </div>

    </div>
  )
}

export default InterviewItemCard
