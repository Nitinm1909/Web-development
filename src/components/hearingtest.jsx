import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./hearingtest.css";
import chair from './assets/chair.png';
import headphone from './assets/headphone.png';
import volumeLow from './assets/volumelow.png';

const frequencies = [125, 250, 500, 750, 1000, 1500, 2000, 3000, 4000, 6000, 8000];

const HearingTest = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState("questions");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [currentFrequency, setCurrentFrequency] = useState(0);
    const [testResults, setTestResults] = useState([]);
    const [animating, setAnimating] = useState(false);
    const [resultCaption, setResultCaption] = useState("");
    const [iconsAnimated, setIconsAnimated] = useState(false);

    const questions = [
        "Do you have difficulty understanding speech in noisy environments?",
        "Do you often ask people to repeat themselves?",
        "Do you experience ringing or buzzing in your ears?",
        "Do you have trouble hearing high-pitched sounds?"
    ];

    // Handle animations when the question changes
    useEffect(() => {
        setAnimating(true);
        setTimeout(() => {
            setAnimating(false);
        }, 600);
    }, [currentQuestion]);

    // Handle animation for icons when the test starts
    useEffect(() => {
        if (step === "start-test") {
            setTimeout(() => { // Add a delay here
                setIconsAnimated(true);
            }, 100); // 300ms delay
        } else {
            setIconsAnimated(false);
        }
    }, [step]);

    // Handle answer selection and move to next question or start test
    const handleAnswer = (answer) => {
        setAnimating(true);
        setTimeout(() => {
            setAnswers([...answers, answer]);
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setStep("start-test");
            }
        }, 500);
    };

    // Start the test
    const handleStartTest = () => {
        setStep("test");
        playFrequency(frequencies[currentFrequency]);
    };

    // Play the sound for the current frequency
    const playFrequency = (freq) => {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
        oscillator.connect(audioCtx.destination);
        oscillator.start();
        setTimeout(() => {
            oscillator.stop();
        }, 2000);
    };

    // Handle the response to whether the user heard the sound or not
    const handleHearingResponse = (heard) => {
        const newResults = [...testResults, { freq: frequencies[currentFrequency], heard }];
        setTestResults(newResults);
        if (currentFrequency < frequencies.length - 1) {
            setCurrentFrequency(currentFrequency + 1);
            playFrequency(frequencies[currentFrequency + 1]);
        } else {
            calculateResults(newResults);
            setStep("results");
        }
    };

    // Calculate the test results based on how many frequencies were heard
    const calculateResults = (results) => {
        const heardFrequencies = results.filter(result => result.heard).length;
        if (heardFrequencies === frequencies.length) {
            setResultCaption("Your hearing ability is excellent!");
        } else if (heardFrequencies >= frequencies.length * 0.7) {
            setResultCaption("Your hearing is good, but you may have mild hearing loss.");
        } else if (heardFrequencies >= frequencies.length * 0.4) {
            setResultCaption("Mild hearing loss detected. Consider consulting a specialist.");
        } else {
            setResultCaption("You may have significant hearing loss. A professional consultation is recommended.");
        }
    };

    return (
        <div className="hearing-test-container">
            <div className="waves"></div>
            <div className="test-box">
                {step === "questions" && (
                    <div className={`question-container ${animating ? "fade-out" : "glide-in"}`}>
                        <h2>Basic Hearing Check</h2>
                        <p>{questions[currentQuestion]}</p>
                        <div className="btn-container">
                            <button onClick={() => handleAnswer("Yes")} className="btn">Yes</button>
                            <button onClick={() => handleAnswer("No")} className="btn">No</button>
                        </div>
                    </div>
                )}

                {step === "start-test" && (
                    <div className="start-test-container">
                        <div className="icon-instructions">
                            <div className="icon-instruction">
                                <img src={chair} alt="Chair" className={`icon ${iconsAnimated ? 'animate-icon' : ''}`} />
                                <p className="caption">Sit in a quiet place</p>
                            </div>
                            <div className="icon-instruction">
                                <img src={headphone} alt="Headphone" className={`icon ${iconsAnimated ? 'animate-icon' : ''}`} />
                                <p className="caption">Wear headphones</p>
                            </div>
                            <div className="icon-instruction">
                                <img src={volumeLow} alt="Volume Low" className={`icon ${iconsAnimated ? 'animate-icon' : ''}`} />
                                <p className="caption">Set volume to medium</p>
                            </div>
                        </div>
                        <h2>Can we start the test?</h2>
                        <button className="start-btn" onClick={handleStartTest}>Start Test</button>
                    </div>
                )}

                {step === "test" && (
                    <>
                        <h2>Hearing Test</h2>
                        <p className="frequency-text">Testing Frequency: <b>{frequencies[currentFrequency]} Hz</b></p>
                        <p>Can you hear this sound?</p>
                        <div className="btn-container">
                            <button onClick={() => handleHearingResponse(true)} className="btn">Yes</button>
                            <button onClick={() => handleHearingResponse(false)} className="btn">No</button>
                        </div>
                    </>
                )}

                {step === "results" && (
                    <>
                        <h2>Test Results</h2>
                        <p className="result-caption">{resultCaption}</p>
                        <div className="btn-container">
                            <button className="start-btn" onClick={() => window.location.reload()}>
                                Retake Test
                            </button>
                            <button className="start-btn" onClick={() => navigate("/")}>
                                Back
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default HearingTest;
