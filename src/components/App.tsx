import React, { useState, FC } from 'react';
import {
  Button,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup,
  CssBaseline,
} from '@material-ui/core';
import './App.css';
import { throwDice, DiceThrowResult } from '../logic/rolls';
import { Die } from '../logic/die';
import { DiePicker } from './DiePicker';
import { NumberPicker } from './NumberPicker';
import DiceRollResults from './DiceRollResults';

const App: FC = () => {
  const [result, setResult] = useState<DiceThrowResult | null>(null);
  const [acing, setAcing] = useState(true);
  const [wildDie, setWildDie] = useState(true);
  const [canFail, setCanFail] = useState(true);
  const [wildDieType, setWildDieType] = useState<Die>(6);
  const [dieType, setDieType] = useState<Die>(4);
  const [rollAmount, setRollAmount] = useState(1);

  const handleRoll = () => {
    setResult(
      throwDice(dieType, rollAmount, {
        acing,
        wildDie: wildDie ? wildDieType : null,
        canFail,
      }),
    );
  };

  return (
    <div className="App">
      <CssBaseline />
      <header className="App-header">
        {result ? (
          <DiceRollResults results={result} />
        ) : (
          <Typography>Roll first</Typography>
        )}
        <Button variant="contained" onClick={handleRoll}>
          Roll
        </Button>
        <FormGroup>
          <DiePicker title="Die Type" die={dieType} setDie={setDieType} />
          <NumberPicker
            title="Roll Amount"
            number={rollAmount}
            setNumber={setRollAmount}
          />
          <FormControlLabel
            control={
              <Switch
                checked={acing}
                onChange={(e) => setAcing(e.target.checked)}
              />
            }
            label="Ace"
          />
          <FormControlLabel
            control={
              <Switch
                checked={wildDie}
                onChange={(e) => setWildDie(e.target.checked)}
              />
            }
            label="Wild Die"
          />
          <FormControlLabel
            control={
              <Switch
                checked={canFail}
                onChange={(e) => setCanFail(e.target.checked)}
              />
            }
            label="Can Fail"
          />
          {wildDie && (
            <DiePicker
              title="Wild Die Type"
              die={wildDieType}
              setDie={setWildDieType}
            />
          )}
        </FormGroup>
      </header>
    </div>
  );
};

export default App;
