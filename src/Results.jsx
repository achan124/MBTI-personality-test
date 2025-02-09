
export function Results({ scores, data }) {

    const results = data.results;
    // let type = "";

    // if (scores.E > scores.I) { type += "E"; } else { type += "I";}
    // if (scores.S > scores.N) { type += "S"; } else { type += "N";}
    // if (scores.T > scores.F) { type += "T"; } else { type += "F";}
    // if (scores.J > scores.P) { type += "J"; } else { type += "P";}

    let type = "ISTJ";

    const name = results[type].name;

    const description = results[type].description.map((item, index) => {
        return (
            <p key={index}>{item}</p> 
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

    return (
        <div className="quizContainer">
            <h1>{type} - {name}</h1>

            {description}

            <h2>Key Characteristics of {type}</h2>
            <ul>
                {characteristics}
            </ul>

            <h3>Strengths:</h3>
            <ul>
                {strengths}
            </ul>

            <h3>Weaknesses:</h3>
            <ul>
                {weaknesses}
            </ul>
        </div>
    )
}