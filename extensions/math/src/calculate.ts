export const calculate = async (term: string) => {
  try {
    // eslint-disable-next-line no-eval
    const result = eval(term);

    if (typeof result === 'number') {
      return result;
    }
    return null;
  } catch {
    return null;
  }
};
