const tiskIntervals = (maxValue: number, step: number): number[] => {
  const intrvs: number[] = [];

  for (let tick = 0; tick <= maxValue; tick += step) {
    intrvs.push(tick);
  }

  return intrvs;
}

export { tiskIntervals };