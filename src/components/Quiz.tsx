"use client";

import { useState } from "react";

const quizQuestions = [
  { question: "Which of these is the largest mammal on Earth?", answer: "Blue Whale" },
  { question: "What is the primary diet of a Giant Panda?", answer: "Bamboo" },
  { question: "Which animal is known as the 'King of the Jungle'?", answer: "Lion" },
  { question: "What is a group of lions called?", answer: "Pride" },
  { question: "Which bird is known for its ability to mimic human speech?", answer: "Parrot" },
  { question: "What is the fastest land animal?", answer: "Cheetah" },
  { question: "What is a baby kangaroo called?", answer: "Joey" },
  { question: "Which animal has the longest neck?", answer: "Giraffe" },
  { question: "What is the only mammal that can truly fly?", answer: "Bat" },
  { question: "What is a male honey bee called?", answer: "Drone" },
  { question: "How many hearts does an octopus have?", answer: "3" },
  { question: "What is the name of the large white bear that lives in the Arctic?", answer: "Polar Bear" },
  { question: "What is the largest land animal?", answer: "Elephant" },
  { question: "Which animal is the tallest in the world?", answer: "Giraffe" },
  { question: "What do you call animals that have scales and are cold-blooded?", answer: "Reptiles" },
  { question: "Which flightless bird is famous for living in Antarctica?", answer: "Penguin" },
  { question: "Which animal has a hard shell and moves very slowly?", answer: "Turtle" },
  { question: "Which big cat has black stripes on its orange fur?", answer: "Tiger" },
  { question: "Which insect is famous for making honey?", answer: "Bee" },
  { question: "What do you call an animal that can live both in water and on land?", answer: "Amphibian" },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    const correct = userAnswer.toLowerCase().trim() === quizQuestions[currentQuestion].answer.toLowerCase().trim();
    
    if (correct) {
      setScore(score + 1);
      setFeedback({ isCorrect: true, message: "Correct!" });
    } else {
      setFeedback({ isCorrect: false, message: `Incorrect. The correct answer was: ${quizQuestions[currentQuestion].answer}` });
    }

    setTimeout(() => {
      setFeedback(null);
      setUserAnswer("");
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizQuestions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setUserAnswer("");
    setFeedback(null);
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
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={!!feedback}
              placeholder="Type your answer here..."
              className="w-full p-4 rounded-xl border-2 border-green-100 focus:border-green-500 focus:outline-none transition-all text-gray-700 font-medium"
              autoFocus
            />
            <button
              type="submit"
              disabled={!!feedback || !userAnswer.trim()}
              className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl transition-all shadow-md"
            >
              Submit Answer
            </button>
          </form>

          {feedback && (
            <div className={`mt-6 p-4 rounded-xl text-center font-bold ${feedback.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {feedback.message}
            </div>
          )}
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
