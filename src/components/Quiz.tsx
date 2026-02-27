"use client";

import { useState } from "react";

const quizQuestions = [
  {
    question: "Which of these is the largest mammal on Earth?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Orca"],
    answer: "Blue Whale",
  },
  {
    question: "What is the primary diet of a Giant Panda?",
    options: ["Bamboo", "Fish", "Small rodents", "Insects"],
    answer: "Bamboo",
  },
  {
    question: "Which animal is known as the 'King of the Jungle'?",
    options: ["Tiger", "Lion", "Leopard", "Cheetah"],
    answer: "Lion",
  },
  {
    question: "What is a group of lions called?",
    options: ["Pack", "Herd", "Pride", "Flock"],
    answer: "Pride",
  },
  {
    question: "Which bird is known for its ability to mimic human speech?",
    options: ["Eagle", "Parrot", "Owl", "Penguin"],
    answer: "Parrot",
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option: string) => {
    if (option === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-green-100">
      {!showResult ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-green-800">Biology Quiz</h2>
            <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </div>
          <p className="text-xl text-gray-800 mb-8 font-medium">
            {quizQuestions[currentQuestion].question}
          </p>
          <div className="grid grid-cols-1 gap-4">
            {quizQuestions[currentQuestion].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-4 rounded-xl border-2 border-green-50 hover:border-green-500 hover:bg-green-50 transition-all text-gray-700 font-medium"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-green-800 mb-4">Quiz Completed!</h2>
          <p className="text-xl text-gray-600 mb-8">
            You scored <span className="text-green-600 font-bold">{score}</span> out of{" "}
            <span className="text-green-600 font-bold">{quizQuestions.length}</span>
          </p>
          <button
            onClick={resetQuiz}
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
