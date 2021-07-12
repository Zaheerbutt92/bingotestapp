import React, { useState } from "react";
import shuffle from "shuffle-array";
import './App.css';
import BingoItemList from './BingoItemList.json';
import Header from "./components/Header";
import BingoReward from "./components/BingoReward";
import { Typography, Card, CardContent,Box} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const BingoItem = styled(Card)({
  display: "flex",
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  width: "100%",
  height: "100%",
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  color: 'white'
})

const CompletedItem = styled(Card)({
  display: "flex",
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  width: "100%",
  height: "100%",
  background: 'linear-gradient(45deg, #1e824c 30%, #4ecdc4 90%)',
  color: 'white'
})

function Item({ id, children, onToggle, isSet }) {
  if (isSet) {
    return (
      <Box>
      <CompletedItem onClick={onToggle}>
        <CardContent>
          <Typography variant="button" gutterBottom>
            {children}
          </Typography>
        </CardContent>
      </CompletedItem>
      </Box>
    );
  } else {
    return (
      <Box>
      <BingoItem onClick={onToggle}>
        <CardContent>
          <Typography variant="button" gutterBottom>
            {children}
          </Typography>
        </CardContent>
      </BingoItem>
      </Box>
    );
  }
}


const data = shuffle(BingoItemList).reduce(
  (data, value, index) => ({ ...data, [index]: value }),{}
);

export default function App() {
  const [state, setState] = useState({ checked: {} });
  const [alreadyWon, setAlreadyWon] = useState({ wonBefore:[]});

  function isWon(checked){
    const range = [0, 1, 2, 3, 4];
    var newWon= false;
    
    if(range.find(row => range.every(column => checked[row * 5 + column]))>=0)
    {
      var rowNo =  'row_'+range.find(row => range.every(column => checked[row * 5 + column]));
      if(alreadyWon.wonBefore.includes(rowNo)){
        setAlreadyWon(alreadyWon => {
          const wonBefore = [ ...alreadyWon.wonBefore].filter(a=>a.includes(rowNo));
          return {
            ...alreadyWon,
            wonBefore
          };
        });
        newWon =false;
      }
      else{
        setAlreadyWon(alreadyWon => {
          const wonBefore = [ ...alreadyWon.wonBefore, rowNo];
          return {
            ...alreadyWon,
            wonBefore
          };
        });
        newWon =true;
      }
    }
    else{
      setAlreadyWon(alreadyWon => {
        const wonBefore = [ ...alreadyWon.wonBefore].filter(a=>a.includes('column'));
        return {
          ...alreadyWon,
          wonBefore
        };
      });
    }

    if(range.find(column => range.every(row => checked[row * 5 + column]))>=0){
      var colNo = 'column_'+range.find(row => range.every(column => checked[row * 5 + column]));
      if(alreadyWon.wonBefore.includes(colNo)){
        newWon =false;
      }
      else{
        setAlreadyWon(alreadyWon => {
          const wonBefore = [...alreadyWon.wonBefore, colNo];
          return {
            ...alreadyWon,
            wonBefore
          };
        })
        newWon =true;
      }
    }
    else{

      setAlreadyWon(alreadyWon => {
        const wonBefore = [ ...alreadyWon.wonBefore ].filter(a => a.includes('row'));
        return {
          ...alreadyWon,
          wonBefore
        };
      });
    }
    

    console.log('row_'+range.find(row => range.every(column => checked[row * 5 + column])))
    // console.log('column_'+range.find(column => range.every(row => checked[row * 5 + column])))
    // console.log('leftDiagnol_'+range.every(index => checked[index * 5 + index]))
    // console.log('rightDiagnol_'+range.every(index => checked[index * 5 + 4 - index]))
    console.log(alreadyWon)
    // return (
    //   undefined !==
    //     range.find(row => range.every(column => checked[row * 5 + column])) ||
    //   undefined !==
    //     range.find(column => range.every(row => checked[row * 5 + column])) ||
    //   range.every(index => checked[index * 5 + index]) ||
    //   range.every(index => checked[index * 5 + 4 - index])
    // );

    return newWon;
  };
  
  function toggle(id){
    setState(state => {
      const checked = { ...state.checked, [id]: !state.checked[id] };
      const won = isWon(checked);
      return {
        ...state,
        checked,
        won
      };
    });
  }

  function setCallbackValue(val){
    setState(state => {
      const checked = { ...state.checked };
      const won = val;
      return {
        ...state,
        checked,
        won
      };
    })
  }

  return (
    <div className="App">
      <Header />
      {Object.keys(data).map((id) => (
        <Item
          key={id}
          id={id}
          isSet={!!state.checked[id]}
          onToggle={() => toggle(id)}
        >
          <Typography id="aa" variant="p" justify="center" alignItems="center">
            {data[id]}
          </Typography>
        </Item>
      ))}
      {state.won ? <BingoReward callback={setCallbackValue} /> : null}
    </div>
  );
} 