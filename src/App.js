import {useState,useEffect} from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages =[
  {"src":"/img/food1.png", mached:false},
  {"src":"/img/food2.png", mached:false},
  {"src":"/img/food3.png", mached:false},
  {"src":"/img/food4.png", mached:false},
  {"src":"/img/food5.png", mached:false},
  {"src":"/img/food6.png", mached:false}
]

function App() {
  const [cards,setCards] = useState([])
  const [turns,setTurns] = useState(0)
  const [choiceOne,setChoiceOne] = useState(null)
  const [choiceTwo,setChoiceTwo] = useState(null)
  const [disabled,setdisabled] = useState(false)

  // ページが開かれたときに shuffleCards を呼び出す
  useEffect(() => {
    shuffleCards(); 
  }, []); 

  

// カードをシャッフル
const shuffleCards =()=>{
  const shuffleCards =[...cardImages,...cardImages]
    .sort(()=> Math.random()-0.5)
    .map((card)=>({...card, id:Math.random()}))

  setChoiceOne(null)
  setChoiceTwo(null)
  setCards(shuffleCards)
  setTurns(0)
}




const handleChoice =(card) =>{
  if (!choiceOne) {
    setChoiceOne(card);
  } else {
    setChoiceTwo(card);
  }
}


//
useEffect(()=>{
  if (choiceOne && choiceTwo){
    setdisabled(true)
    if(choiceOne.src === choiceTwo.src){
      setCards(prevCards=>{
        return prevCards.map(card =>{
          if (card.src === choiceOne.src){
            return {...card,matched :true}
          }else{
            return card
          }
        })
      })
      resetTurn()
    }else{
      setTimeout(() => resetTurn(),1000)
    }
  }
},[choiceOne,choiceTwo])

console.log(cards)


  const resetTurn =()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setdisabled(false)
  }

  return (
    <div className="App">     
      <h1>めしてろ</h1>
      <div className="nav">
      <button onClick={shuffleCards}>はじめる</button>
      <p>ターン: {turns}</p>
      </div>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            />
        ))}
      </div>
      
    </div>
  );
}

export default App;
