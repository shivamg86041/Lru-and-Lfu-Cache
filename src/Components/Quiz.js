import React, { useState } from 'react';
import './Quiz.css';

const Quiz = ({ onSubmit }) => {
    const questions = [
        {
            question: "What does LRU stand for?",
            options: ["Least Recently Used", "Least Recently Updated", "Least Recently Unused"],
            answer: "Least Recently Used"
        },
        {
            question: "What does LFU stand for?",
            options: ["Least Frequently Used", "Least Frequently Updated", "Least Frequently Unused"],
            answer: "Least Frequently Used"
        },
        // Add more questions here
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [showResults, setShowResults] = useState(false);

    const handleOptionClick = (option) => {
        const isCorrect = option === questions[currentQuestionIndex].answer;
        setFeedback(isCorrect ? 'Correct!' : 'Wrong answer. Try again!');
        setSelectedAnswers([...selectedAnswers, { question: questions[currentQuestionIndex].question, answer: option, isCorrect }]);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setFeedback('');
        } else {
            setShowResults(true);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setFeedback('');
        }
    };

    const calculateScore = () => {
        const correctAnswers = selectedAnswers.filter(answer => answer.isCorrect).length;
        return correctAnswers;
    };

    return (
        <div className="quiz-container">
            {!showResults ? (
                <>
                    <div className="quiz-question">
                        <h2>Question {currentQuestionIndex + 1}</h2>
                        <p>{questions[currentQuestionIndex].question}</p>
                        <div className="quiz-options">
                            {questions[currentQuestionIndex].options.map((option, index) => (
                                <button
                                    key={index}
                                    className="quiz-option"
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        <div className="quiz-navigation">
                            <button
                                className="quiz-navigation-button"
                                onClick={handleBack}
                                disabled={currentQuestionIndex === 0}
                            >
                                Back
                            </button>
                            <button
                                className="quiz-navigation-button"
                                onClick={handleNext}
                            >
                                {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                            </button>
                        </div>
                        {feedback && <div className="quiz-feedback">{feedback}</div>}
                    </div>
                </>
            ) : (
                <div className="quiz-results">
                    <h2>Quiz Results</h2>
                    <p>You scored {calculateScore()} out of {questions.length}.</p>
                    <button className="quiz-submit-button" onClick={() => onSubmit(selectedAnswers)}>
                        Submit Answers
                    </button>
                </div>
            )}
        </div>
    );
};

export default Quiz;
