let counter = 0;

export const getKey = (): string => {
  return String(counter++);
};
