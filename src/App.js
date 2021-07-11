import React, { useState } from "react";
import shuffle from "shuffle-array";
import './App.css';
import BingoItemList from './BingoItemList.json';
import Header from "./components/Header";
import BingoReward from "./components/BingoReward";
import { Typography, Card, CardContent,Box, Grid} from '@material-ui/core';
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
  (data, value, index) => ({ ...data, [index]: value }),
  {}
);

export default function App() {
  const [state, setState] = useState({ checked: {} });
  const isWon = checked => {
    const range = [0, 1, 2, 3, 4];
    return (
      undefined !==
        range.find(row => range.every(column => checked[row * 5 + column])) ||
      undefined !==
        range.find(column => range.every(row => checked[row * 5 + column])) ||
      range.every(index => checked[index * 5 + index]) ||
      range.every(index => checked[index * 5 + 4 - index])
    );
  };
  const toggle = id =>
    setState(state => {
      const checked = { ...state.checked, [id]: !state.checked[id] };
      const won = isWon(checked);
      return {
        ...state,
        checked,
        won
      };
    });

  return (
    <div className="App">
<Header/>
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
        
      {state.won ? <BingoReward /> : null}
    </div>
  );
} 