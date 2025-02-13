
// import { Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import data from './data.json'
import { Intro } from './Intro.jsx'
import { Quiz } from './Quiz.jsx'
import { Results } from './Results.jsx'

function App() {

  const [scores, setScores] = useState({"E": 0, "I": 0, "S": 0, "N": 0, "T": 0, "F": 0, "J": 0, "P": 0});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />}/>
        <Route path="/quiz" element={<Quiz scores={scores} setScores={setScores} data={data}/>}/>
        <Route path="/results" element={<Results scores={scores} data={data}/>}/>
      </Routes>
    </BrowserRouter>

  )
}
export default App
