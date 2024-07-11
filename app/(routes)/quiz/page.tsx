"use client";

import React, { useEffect, useState } from 'react';
import Quiz from '@/components/quiz';
import { useUser } from '@clerk/nextjs';


const QuizPage: React.FC = () => {
  const [hasTakenQuiz, setHasTakenQuiz] = useState<boolean>(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      // Check if the user has previously taken the quiz
      const quizStatus = localStorage.getItem('hasTakenQuiz');
      setHasTakenQuiz(quizStatus === 'true');
    } else {
      // If the user is not authenticated, reset the quiz status
      localStorage.removeItem('hasTakenQuiz');
      setHasTakenQuiz(false);
    }
  }, [user]);

  const handleQuizComplete = () => {
    // Set quiz status to true when the quiz is completed
    localStorage.setItem('hasTakenQuiz', 'true');
    setHasTakenQuiz(true);
  };

  return (
    <div className="min-h-screen pb-16 bg-gradient-to-r from-[#1B1919] to-[#090909] flex flex-col items-center justify-center">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-center mb-10 pb-4">
          {hasTakenQuiz ? "Resubmit Your Quiz Results" : "Tell us a little bit about yourself!"}
        </h1>
        <Quiz onQuizComplete={handleQuizComplete} />
      </div>
    </div>
  );
};

export default QuizPage;