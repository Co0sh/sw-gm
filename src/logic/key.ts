let counter = 0;

export const getKey = <T extends String>(): T => {
  return String(counter++) as any;
};
