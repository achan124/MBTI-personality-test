import { useNavigate } from 'react-router-dom';

export function Intro() {
    const navigate = useNavigate();

    function handleStartButton(e) {
        navigate('/quiz');
    }


    return (
        <div className="quizContainer mt-5">
            <h1>Welcome to the MBTI Personality Test!</h1>
            <div>
                <p>This quiz is designed to help you discover your personality type based on the Myers-Briggs Type Indicator (MBTI). The MBTI is a popular psychological tool that categorizes people into 16 different personality types based on their preferences in four key areas:</p>
                <ul>
                    <li><strong>Introversion (I) vs. Extraversion (E): </strong>Do you recharge by spending time alone or with others?</li>
                    <li><strong>Sensing (S) vs. Intuition (N): </strong>Do you focus on the present facts and details or look at the big picture and possibilities?</li>
                    <li><strong>Thinking (T) vs. Feeling (F): </strong>Do you make decisions based on logic and objectivity or prioritize emotions and values?</li>
                    <li><strong>Judging (J) vs. Perceiving (P): </strong>Do you prefer structure and planning or flexibility and spontaneity?</li>
                </ul>
                <p>Note: While the MBTI is extremely popular, it has also been the source of considerable criticism due in part to its poor validity and reliability.2 If you do take the MBTI, use caution when considering the meaning of your results.</p>
                <p>Answer each question honestly based on your natural preferences. There are no right or wrong answers—this quiz is about understanding your unique personality! Once you've completed it, you’ll discover which of the 16 personality types best fits you.</p>
                <button onClick={handleStartButton} className="d-block m-auto mt-5 px-5 btn btn-primary">Start</button>
            </div>
        </div>
    )
}