import { useState } from 'react';

let counter = 0;

/**
 * Returns a unique, auto-incremented string for use in label IDs.
 */
export const useLabelId = () => {
  const [labelId] = useState(() => counter++);
  return `id-${labelId}`;
};
