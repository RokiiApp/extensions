const MATH_REGEXP = /^[\d\s-+/*%,.()]+$/;

export const isMathExpression = (term: string): boolean => {
  return term.match(MATH_REGEXP) !== null;
};
