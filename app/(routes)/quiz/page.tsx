import React from 'react';
import Quiz from '@/components/quiz';

const QuizPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1B1919] to-[#090909] flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-center mb-10 pb-4">Tell us a little bit about yourself!</h1>
      <Quiz />
    </div>
  );
};

export default QuizPage;
