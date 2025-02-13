import { useNavigate } from 'react-router-dom';

export function Results({ scores, data }) {

    const results = data.results;
    let type = "";

    if (scores.E > scores.I) { type += "E"; } else { type += "I";}
    if (scores.S > scores.N) { type += "S"; } else { type += "N";}
    if (scores.T > scores.F) { type += "T"; } else { type += "F";}
    if (scores.J > scores.P) { type += "J"; } else { type += "P";}

    const name = results[type].name;

    const description = results[type].description.map((item, index) => {
        return (
            <p key={index} >{item}</p> 
        )
    });

    const characteristics = results[type].characteristics.map((item, index) => {
        return (
            <li key={index}>{item}</li> 
        )
    });

    const strengths = results[type].strengths.map((item, index) => {
        return (
            <li key={index}>{item}</li> 
        )
    });

    const weaknesses = results[type].weaknesses.map((item, index) => {
        return (
            <li key={index}>{item}</li> 
        )
    });

    const cognitive = Object.entries(results[type].cognitive).map(([label, desc], index) => {

        const descriptionParagraphs = desc.map((para, idx) => {
            return (
                <p key={idx}>{para}</p>
            )
        })

        return (
            <div key={index}>
                <h3>{label}</h3>
                {descriptionParagraphs}
            </div>
        )
    });

    const navigate = useNavigate();

    function handleBackButton(e) {
        navigate('/')
    }

    return (
        <div className="quizContainer mb-5">
            <h1 className='resultTitle'><strong>{type} - {name}</strong></h1>

            {description}

            <h2><strong>Key Characteristics of {type}</strong></h2>
            <ul>
                {characteristics}
            </ul>

            <div className="d-flex mt-5">
                <div className="border p-3">
                    <h3>Strengths:</h3>
                    <ul>
                        {strengths}
                    </ul>
                </div>

                <div className="border p-3">
                    <h3>Weaknesses:</h3>
                    <ul>
                        {weaknesses}
                    </ul>
                </div>
            </div>

            <h2><strong>{type} Cognitive Functions</strong></h2>
            {cognitive}

            <h2><strong>Personal Relationships</strong></h2>
            {results[type].relationships}

            <h2><strong>Career</strong></h2>
            {results[type].career}

            <button onClick={handleBackButton} className="d-block m-auto mt-5 px-5">Go back to quiz</button>

        </div>
    )
}