import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export function Quiz({ scores, data }) {

    // data from JSON file
    const questions = data.questions;

    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedValue, setSelectedValue] = useState(null);
    const [isLastQuestion, setIsLastQuestion] = useState(false);

    const navigate = useNavigate();

    function handleChange(e) {
        setSelectedValue(e.target.value);
    }

    function handleScoring(e) {
        const value = parseInt(selectedValue);
        const keys = Object.keys(questions[questionIndex].options);
        let trait = "";

        if (value < 0) {
            trait = keys[0];
        } else if (value > 0) {
            trait = keys[1];
        }

        if (trait) {
            scores[trait] += Math.abs(value);
        }
    }

    function handleNextQuestion(e) {
        e.preventDefault();
        handleScoring(e);
        // TODO: fix last question scoring

        if (questionIndex < questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
        }

        if (questionIndex === questions.length - 2) {
            setIsLastQuestion(true);
        } 
    }

    function handleSubmit(e) {
        e.preventDefault();
        navigate('/results');
    }

    console.log(scores);

    return (
        <form className="quizContainer">
            <fieldset>
                <legend className='pb-5'><strong>Question {questionIndex + 1}:</strong> {questions[questionIndex].question}</legend>
                
                <div className='pb-4 pt-5 px-5 mx-5 d-flex justify-content-center'>
                    <input type="range" id="slider" name="slider" min="-2" max="2" className="w-100" onChange={handleChange}/>
                </div>

                <label htmlFor="slider" className='mx-3 pb-5 d-flex justify-content-between'>
                    <p>{Object.values(questions[questionIndex].options)[0]}</p>
                    <p>{Object.values(questions[questionIndex].options)[1]}</p>
                </label>

                <button onClick={isLastQuestion ? handleSubmit : handleNextQuestion} className="d-block m-auto mt-5 px-5 btn btn-primary nextButton">
                    {isLastQuestion ? "Submit" : "Next Question"}
                </button>
            </fieldset>
        </form>
    )
}