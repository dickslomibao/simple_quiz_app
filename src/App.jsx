import { useState, useEffect } from 'react'
import './App.css'
import QuestionComponents from './components/question_component';
import ButtonComponents from './components/button_component';
import axios from "axios";



function App() {

  let [index, setIndex] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [isAnswer, setIsAnswer] = useState(false);
  let [questions_list, setData] = useState(null);
  let choices = [];
  const [isCorrect, setIsCorrect] = useState(false);

  const nextButton = (event) => {
    if(event.target.value == "More"){
      location.reload();
      return;
    }
    setIndex(++index);
    generateOne();
    setIsAnswer(false);
  }

  const checkAnswer = (event) => {
    if (event.target.value === questions_list[index]['correctAnswer']) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setIsAnswer(true);
  }

  function generateOne() {
    choices.push(questions_list[index]['correctAnswer']);
    questions_list[index]['incorrectAnswers'].forEach(element => {
      choices.push(element);
    });
    shuffle(choices);
  }
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  useEffect(() => {
    axios.get("https://the-trivia-api.com/v2/questions?categories=science").then((response) => {
      setData(response.data);
      setLoading(false);
    });
  }, []);

  if (questions_list !== null) {
    generateOne();
  }
  let listOfChoices = choices.map(item => <ButtonComponents key={item} label={item} onClick={checkAnswer} />);

  return (
    isLoading ? <h3>Loading...</h3> :
      <>
        <div className='question-container'>
          <QuestionComponents question={questions_list[index]['question']['text']} />
          {
            isAnswer ?
              isCorrect ?
                <>
                  <h2 className='correct'> Correct </h2>
                  <ButtonComponents label={'Next'} onClick={nextButton} />
                </>
                :
                <>
                  <h2 className='wrong'> Wrong </h2>
                  <h3 className='correct-answer'>Answer: {questions_list[index]['correctAnswer']}</h3>
                  <ButtonComponents label={index === questions_list.length - 1 ? 'More' : 'Next' } onClick={nextButton} />
                </>
              : listOfChoices
          }
        </div>
        <p className='author'>Created By: Dick Lomibao</p>
      </>
  );
}

export default App
