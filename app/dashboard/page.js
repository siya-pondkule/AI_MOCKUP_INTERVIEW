import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

const Dashboard = () => {
  return (
    <div className="p-10 flex flex-col md:flex-row">
      <div className="md:w-2/3">
        <h2 className="font-bold text-2xl text-orange-500">Welcome</h2>
        <h2 className="text-gray-800 font-serif font-bold">Create and start your AI Mockup Interview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 my-5">
          <AddNewInterview />
        </div>
        {/* Previous interviews */}
        <InterviewList />
      </div>

      {/* Image on the right side */}
      <div className="md:w-1/3 mt-5 md:mt-0">
        <img 
          src="https://img.freepik.com/premium-vector/businessman-mask-discussing-with-robot-meeting-chat-bubble-communication-artificial-intelligence_48369-38661.jpg?ga=GA1.1.796549110.1733927212&semt=ais_hybrid" 
          alt="AI Mockup Interview"
          className="w-auto h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  )
}

export default Dashboard
