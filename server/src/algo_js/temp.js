const normalize = (numbers) => {
  const maxNumber = Math.max(...numbers);
  const mimNumber = Math.min(...numbers);
  if (maxNumber === mimNumber) {
    return numbers.map(() => 1);
  }
  const normalized = numbers.map(
    (number) => (number - mimNumber) / (maxNumber - mimNumber)
  );
  return normalized;
};
