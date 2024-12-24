import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';

const QuestionsSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, your browser does not support the text-to-speech feature');
    }
  };

  console.log(activeQuestionIndex); 

  return mockInterviewQuestion && (
    <div className="p-5 border rounded-lg my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion.map((question, index) => (
          <h2
            className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
              activeQuestionIndex === index ? 'bg-blue-500 text-black' : ''
            }`}
            key={index}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>
      <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>

      <Volume2 className='cursor-pointer' onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)} />

      <div className='border rounded-lg p-5 bg-blue-300 mt-20'>
        <h2 className='flex gap-2 items-center text-primary'>
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className='text-sm text-blue-800 my-2'>
          Welcome and thank you for joining this interactive interview! Today’s interview is designed to simulate a real-world scenario and provide a platform to showcase your skills. Take your time to understand each question, and feel free to ask for clarifications if needed. Remember, this is a learning experience, so focus on demonstrating your thought process as much as finding the correct answers. Let’s begin!
        </h2>
      </div>
    </div>
  );
};

export default QuestionsSection;
