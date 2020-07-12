import React from 'react';
import { DiceMultiThrower } from '../components/DiceMultiThrower';

export default {
  title: 'Dice',
};

export const Basic = () => (
  <div style={{ width: 400, padding: 16 }}>
    <DiceMultiThrower />
  </div>
);
