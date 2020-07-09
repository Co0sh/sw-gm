import React, { useState, FC } from 'react';
import {
  Button,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup,
  Box,
  Input,
} from '@material-ui/core';
import './App.css';
import { throwDice, DiceThrowResult, suggestRolls } from '../logic/rolls';
import { Rolls } from './Rolls';

const App: FC = () => {
  const [result, setResult] = useState<DiceThrowResult | null>(null);
  const [acing, setAcing] = useState(true);
  const [wildDie, setWildDie] = useState(true);
  const [wildDieType, setWildDieType] = useState(6);
  const [dieType, setDieType] = useState(4);
  const [rollAmount, setRollAmount] = useState(1);

  const handleRoll = () => {
    setResult(
      throwDice(dieType, rollAmount, { acing, wildDie: wildDie ? 6 : null }),
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        {result ? (
          <Box>
            <Box display="flex">
              <Rolls title="Rolls" rolls={result.mainRolls} />
              {result.wildRoll && (
                <>
                  <Rolls title="Wild Roll" rolls={[result.wildRoll]} />
                  <Rolls
                    title="Suggested Final Rolls"
                    rolls={suggestRolls(result.mainRolls, result.wildRoll)}
                  />
                </>
              )}
            </Box>
            {result.isCriticalFail && (
              <Typography variant="h5">Critical fail!</Typography>
            )}
          </Box>
        ) : (
          <Typography>Roll first</Typography>
        )}
        <Button variant="contained" onClick={handleRoll}>
          Roll
        </Button>
        <FormGroup>
          <FormControlLabel
            control={
              <Input
                type="number"
                value={dieType}
                onChange={(e) => setDieType(Number(e.target.value))}
              />
            }
            label="Die Type"
          />
          <FormControlLabel
            control={
              <Input
                type="number"
                value={rollAmount}
                onChange={(e) => setRollAmount(Number(e.target.value))}
              />
            }
            label="Roll Amount"
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
          {wildDie && (
            <FormControlLabel
              control={
                <Input
                  type="number"
                  value={wildDieType}
                  onChange={(e) => setWildDieType(Number(e.target.value))}
                />
              }
              label="Wild Die Type"
            />
          )}
        </FormGroup>
      </header>
    </div>
  );
};

export default App;
