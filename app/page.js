"use client";

import { FaWhatsapp, FaFacebook, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Header from "./dashboard/_components/Header";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleFeedbackSubmit = () => {
    if (name && feedback) {
      alert("Thank you for your feedback!");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <>
      {/* Header Component */}
      <Header />

      <div className="font-sans">
        {/* Header Section */}
        <div className="flex flex-wrap items-center justify-between px-8 py-12 bg-gray-200 shadow-lg">
          {/* Left Side: Text */}
          <div className="flex-1 p-6">
            <h1 className="text-xl font-bold mb-4 text-orange-400">
              Welcome to the AI MOCK Interview
            </h1>
            <h2>
              <b>Ace Every Interview with Confidence</b><br />
              Transform your skills into success with expert-led mock interviews and personalized feedback.<br />
              Call-to-Action<br />
              Start Your Mock Interview Today!
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Join us on a journey to discover innovative solutions and thoughtful insights.
              Prepare to explore your potential with an engaging experience that drives results.
            </p>
            <Button onClick={() => router.replace('/dashboard')} variant="outline" className="hover:bg-blue-500 bg-orange-400">Start</Button>
          </div>

          {/* Right Side: Image */}
          <div className="flex-1 text-center">
            <img
              src="https://img.freepik.com/premium-photo/robothuman-interaction-office-setting-digital-art-future-human-resource-management_1392904-692.jpg?ga=GA1.1.796549110.1733927212&semt=ais_hybrid"
              alt="Robot-Human Interaction"
              className="w-full max-w-md rounded-lg"
            />
          </div>
        </div>

        {/* About Us Section */}
        <div className="flex flex-wrap items-center px-8 py-12 bg-white">
          {/* Left Side: Image */}
          <div className="flex-1 text-center mb-6 md:mb-0">
            <img
              src="https://img.freepik.com/free-vector/chatbot-messenger-isometric-concept_1284-69074.jpg?ga=GA1.1.796549110.1733927212&semt=ais_hybrid"
              alt="Chatbot Interaction"
              className="w-full max-w-md rounded-lg"
            />
          </div>

          {/* Right Side: About Text */}
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold mb-4 text-orange-400">About Us</h2>
            <h1><b>Your Journey to Interview Success Starts Here</b></h1><br />
            <p className="text-lg text-gray-700">
              We understand that interviews can be daunting. That’s why we’ve created an online platform designed to mimic real-world interview scenarios. Whether you’re preparing for your dream job, a university admission, or a crucial business pitch, our tailored mock interviews and constructive feedback will help you shine.
              We specialize in creating engaging, efficient, and intelligent solutions tailored
              to your unique needs. Our mission is to provide exceptional services and tools that
              empower you to achieve your goals effortlessly.
            </p>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="flex flex-wrap items-center px-8 py-12 bg-gray-100">
          {/* Left Side: Feedback Form */}
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold mb-4 text-orange-400">We Value Your Feedback</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="feedback" className="block text-lg font-semibold mb-2">Your Feedback</label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your feedback"
                  rows="4"
                />
              </div>
              <Button
                type="button"
                onClick={handleFeedbackSubmit}
                variant="outline"
                className="hover:bg-blue-500 bg-orange-400"
              >
                Submit Feedback
              </Button>
            </form>
          </div>

          {/* Right Side: Image */}
          <div className="flex-1 text-center">
            <img
              src="https://img.freepik.com/free-vector/realistic-3d-feedback-concept_23-2148961127.jpg?ga=GA1.1.796549110.1733927212&semt=ais_hybrid"
              alt="Feedback Concept"
              className="w-full max-w-md rounded-lg"
            />
          </div>
        </div>

        {/* Footer Section */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto text-center">
            <div className="flex justify-center space-x-6 mb-6 text-2xl">
              <a
                href="https://wa.me/"
                target="_blank"
                className="text-green-400 hover:text-green-500"
                title="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://facebook.com/"
                target="_blank"
                className="text-blue-600 hover:text-blue-700"
                title="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.linkedin.com/in/siya-pondkule-310167292/"
                target="_blank"
                className="text-blue-500 hover:text-blue-600"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:siyapondkule5@gmail.com"
                target="_blank"
                className="text-red-500 hover:text-red-600"
                title="Gmail"
              >
                <FaEnvelope />
              </a>
            </div>
            <p className="text-sm">&copy; 2024 Siya Pondkule. Web Developer.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
