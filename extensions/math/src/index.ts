import { ExtensionModule, ScriptItem } from '@rokii/api';

const MATH_REGEXP = /^[\d\s-+/*%,.()]+$/;

const run: ExtensionModule['run'] = async (ctx) => {
  const { term, display, actions } = ctx;
  const match = term.match(MATH_REGEXP);

  if (!match) return;

  try {
    const calculateTerm = term.replace(/,/g, '.');

    // eslint-disable-next-line no-eval
    const result = eval(calculateTerm);

    if (typeof result !== 'number') return;

    if (Number.isNaN(result)) {
      const indeterminateItem = new ScriptItem({
        title: term + ' = indeterminate',
        run: () => {
          actions.copyToClipboard('indeterminate');
        }
      });
        // When user tries to devide 0 by 0
      display([indeterminateItem]);
      return;
    }
    const stringResult = result.toLocaleString();

    const resultItem = new ScriptItem({
      title: term + ' = ' + stringResult,
      run: () => {
        actions.copyToClipboard(stringResult);
      }
    });

    display([resultItem]);
  } catch (err) {
    // Do nothing when eval failed
  }
};

const MathExtension: ExtensionModule = {
  name: 'Math',
  run,
  icon: ''
};

export default MathExtension;
