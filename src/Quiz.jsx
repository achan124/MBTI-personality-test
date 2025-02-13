import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export function Quiz({ scores, data }) {

    // data from JSON file
    const questions = data.questions;

    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedValue, setSelectedValue] = useState(null);
    const [isLastQuestion, setIsLastQuestion] = useState(false);
    const [percentage, setPercentage] = useState(0);

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
        setPercentage(percentage + 5);
        handleScoring(e);

        if (questionIndex < questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
        }

        if (questionIndex === questions.length - 2) {
            setIsLastQuestion(true);
        } 
        console.log(scores);
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleScoring(e);

        // only navigates after all states update (handle scoring for last question)
        setTimeout(() => {
            navigate('/results');
        }, 0)
        
    }

    return (
        <div>
            <form className="quizContainer">
                <fieldset>


                    <legend className='pb-5'><strong>Question {questionIndex + 1}:</strong> {questions[questionIndex].question}</legend>
                    
                    <div className='pb-5 pt-5 px-5 mx-5 d-flex justify-content-center align-items-center gap-5'>
                        <label htmlFor="minustwo">
                            <input type="radio" id="minustwo" name="choices" value="-2" onChange={handleChange}/>
                            <span className="mx-4 checkmarkOuter checkmark"></span>
                        </label>

                        <label htmlFor="minusone">
                            <input type="radio" id="minusone" name="choices" value="-1" onChange={handleChange}/>
                            <span className="mx-4 checkmarkMiddle checkmark"></span>
                        </label>


                        <label htmlFor="neutral">
                            <input type="radio" id="neutral" name="choices" value="0" onChange={handleChange}/>
                            <span className="mx-4 checkmarkCenter checkmark"></span>
                        </label>

                        <label htmlFor="plusone">
                            <input type="radio" id="plusone" name="choices" value="1" onChange={handleChange}/>
                            <span className="mx-4 checkmarkMiddle checkmark"></span>
                        </label>

                        <label htmlFor="plustwo">
                            <input type="radio" id="plustwo" name="choices" value="2" onChange={handleChange}/>
                            <span className="mx-4 checkmarkOuter checkmark"></span>
                        </label>
                    </div>

                    <div className='mx-3 pb-5 d-flex justify-content-between'>
                        <h4>{Object.values(questions[questionIndex].options)[0]}</h4>
                        <h4>{Object.values(questions[questionIndex].options)[1]}</h4>
                    </div>



                    <button onClick={isLastQuestion ? handleSubmit : handleNextQuestion} className="d-block m-auto mt-5 px-5 nextButton">
                        {isLastQuestion ? "Submit" : "Next"}
                    </button>
                </fieldset>
            </form>
            <div className="progressBar">
                <div className="progress" style={{width: `${percentage}%`}}></div>
            </div>
            <p className="text-center">{percentage}% completed</p>
        </div>
    )
}

