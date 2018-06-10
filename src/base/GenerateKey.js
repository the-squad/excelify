let counter = 0;
const generateKey = (prefix = '') => {
  counter += 1;
  return `${prefix}-${counter}`;
};

export default generateKey;
