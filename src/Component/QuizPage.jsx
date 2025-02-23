import React, { useState, useEffect } from 'react';
import '../CSS/QuizPage.css';

const QuizPage = () => {
    const [questions, setQuestions] = useState([
        {
            question: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Madrid'],
            correctAnswer: 0
        },
        {
            question: 'What is 2 + 2?',
            options: ['3', '4', '5', '6'],
            correctAnswer: 1
        },
        {
            question: 'Which planet is known as the Red Planet?',
            options: ['Earth', 'Venus', 'Mars', 'Jupiter'],
            correctAnswer: 2
        },
        {
            question: 'Who wrote "Romeo and Juliet"?',
            options: ['William Shakespeare', 'Jane Austen', 'Mark Twain', 'Charles Dickens'],
            correctAnswer: 0
        },
        {
            question: 'What is the boiling point of water?',
            options: ['90°C', '100°C', '110°C', '120°C'],
            correctAnswer: 1
        }
    ]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [timer, setTimer] = useState(600); // 10 minutes in seconds
    const [paused, setPaused] = useState(false);
    const [marks, setMarks] = useState(0);
    const [quizSubmitted, setQuizSubmitted] = useState(false);

    useEffect(() => {
        const countdown = setInterval(() => {
            if (!paused) {
                setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
            }
        }, 1000);

        return () => clearInterval(countdown);
    }, [paused]);

    useEffect(() => {
        if (timer === 0) {
            handleSubmitQuiz();
        }
    }, [timer]);

    const handleOptionChange = (index, value) => {
        const newUserAnswers = [...userAnswers];
        newUserAnswers[currentQuestionIndex] = value;
        setUserAnswers(newUserAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            handleSubmitQuiz();
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmitQuiz = () => {
        // Calculate marks
        let score = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === questions[index].correctAnswer) {
                score += 1;
            }
        });
        setMarks(score);
        setQuizSubmitted(true);

        // Handle quiz submission logic here
        console.log('Quiz submitted', userAnswers);
        alert(`Quiz submitted! You scored ${score} out of ${questions.length}`);
    };

    const handlePause = () => {
        setPaused(!paused);
    };

    const handleFeedback = () => {
        // Handle feedback functionality
        alert('Please provide your feedback!');
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="quiz-page">
            <nav className="navbar">
                <div className="navbar-title">Quiz Page</div>
                <div className="timer">Time left: {Math.floor(timer / 60)}:{timer % 60}</div>
                <button className="pause-button" onClick={handlePause}>{paused ? 'Resume' : 'Pause'}</button>
                <button className="feedback-button" onClick={handleFeedback}>Feedback</button>
            </nav>
            <div className="marks">Marks: 1{marks}</div>
            <div className="quiz-container">
                {quizSubmitted ? (
                    <div className="result">You scored {marks} out of {questions.length}</div>
                ) : currentQuestion ? (
                    <div>
                        <div className="question-container">
                            <h3>{currentQuestion.question}</h3>
                        </div>
                        <div className="options-container">
                            {currentQuestion.options.map((option, index) => (
                                <div key={index}>
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestionIndex}`}
                                        value={index}
                                        checked={userAnswers[currentQuestionIndex] === index}
                                        onChange={() => handleOptionChange(currentQuestionIndex, index)}
                                    />
                                    <label>{option}</label>
                                </div>
                            ))}
                        </div>
                        <button className="next-button" onClick={handlePreviousQuestion}>Previous</button>
                        <button className="next-button" onClick={handleNextQuestion}>Next</button>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
};

export default QuizPage;
