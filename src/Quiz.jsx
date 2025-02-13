import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export function Quiz({ scores, setScores, data }) {

    const [pageNum, setPageNum] = useState(1);
    const [questionStart, setQuestionStart] = useState(0);
    const [selectedValues, setSelectedValues] = useState(new Array(5).fill(0));

    const questions = data.questions;
    const currentQuestions = questions.slice(questionStart, questionStart + 5);

    const navigate = useNavigate();

    // scroll back to top when refreshing
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth'});
    }, []);

    function handleChange(e, index) {
        const newValues = [...selectedValues];
        newValues[index] = parseInt(e.target.value);
        setSelectedValues(newValues);
    }

    function handleScoring() {

        const updatedScores = { ...scores }; 

        currentQuestions.forEach((question, index) => {
            const value = selectedValues[index];
            const keys = Object.keys(question.options);
            let trait = "";

            if (value < 0) {
                trait = keys[0]; 
            } else if (value > 0) {
                trait = keys[1]; 
            }

            if (trait) {
                updatedScores[trait] += Math.abs(value); 
            }
        });
        setScores(updatedScores);
        setSelectedValues(new Array(5).fill(0));
    }

    function handleNext(e) {
        e.preventDefault();
        handleScoring();
        console.log(pageNum);

        if (pageNum < 4) {
            setQuestionStart(questionStart + 5)
            setPageNum(pageNum + 1);
            window.scrollTo({ top: 0, behavior: 'smooth'});
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleScoring();

        // only navigates after all states update (handle scoring for last question)
        setTimeout(() => {
            navigate('/results');
        }, 0)
        
    }

    const isLastPage = pageNum === 4;

    return (
        <div>
            <form className="mb-5 quizContainer">
                <fieldset>

                    <QuestionSection currentQuestions={currentQuestions} questionStart={questionStart} selectedValues={selectedValues} handleChange={handleChange}/>

                    <button onClick={isLastPage ? handleSubmit : handleNext} className="d-block m-auto mt-5 px-5 nextButton">
                        {isLastPage ? "Submit" : "Next"}
                    </button>
                </fieldset>
            </form>

            <h4 className="text-center mb-5">Page {pageNum} of 4</h4>

        </div>
    )
}


function QuestionSection({ currentQuestions, questionStart, selectedValues, handleChange }) {
    return (
        <>
            {currentQuestions.map((question, index) => (
                <div key={index}>
                    <legend>
                        <strong>Question {questionStart + index + 1}:</strong> {question.question}
                    </legend>
                    
                    <div className='pb-5 pt-5 px-5 mx-5 d-flex justify-content-center align-items-center gap-5'>

                        {[-2, -1, 0, 1, 2].map((value, idx) => (
                            <label key={idx} htmlFor={`choice-${questionStart + index}-${value}`}>
                                <input
                                    type="radio"
                                    id={`choice-${questionStart + index}-${value}`}
                                    name={`choices-${questionStart + index}`}
                                    value={value}
                                    checked={selectedValues[index] === value}
                                    onChange={(e) => handleChange(e, index)}
                                />
                                <span className={`mx-4 checkmark ${
                                    value === 0 ? "checkmarkCenter" 
                                    : (value === -1 || value === 1) ? "checkmarkMiddle" 
                                    : "checkmarkOuter"
                                }`}></span>
                            </label>
                        ))}

                    </div>

                    <div className='mb-5 d-flex justify-content-between'>
                        <h4>{Object.values(question.options)[0]}</h4>
                        <h4>{Object.values(question.options)[1]}</h4>
                    </div>
                    <hr className="mb-5"></hr>
                </div>
            ))}
        </>
    );
}

