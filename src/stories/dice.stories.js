import React from 'react';
import { DiceMultiThrower } from '../components/DiceMultiThrower';

const DiceStories = {
  title: 'Dice',
};

export default DiceStories;

export const Basic = () => (
  <div style={{ width: 400, padding: 16 }}>
    <DiceMultiThrower />
  </div>
);
