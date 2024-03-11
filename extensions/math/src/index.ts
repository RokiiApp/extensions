import { ExtensionModule, ScriptItem } from '@rokii/api';
import { calculate } from './calculate';
import { isMathExpression } from './isMathExpression';

const run: ExtensionModule['run'] = async (ctx) => {
  const { term, display, actions } = ctx;

  if (!isMathExpression(term)) return;

  const calculateTerm = term.replace(/,/g, '.');

  const result = await calculate(calculateTerm);

  // Strict comparison to avoid filtering 0 or other falsy values
  if (result === null) return;

  if (Number.isNaN(result)) {
    const indeterminateItem = new ScriptItem({
      order: -Infinity,
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
    order: -Infinity,
    title: term + ' = ' + stringResult,
    run: () => {
      actions.copyToClipboard(stringResult);
    }
  });

  display([resultItem]);
};

const MathExtension: ExtensionModule = {
  name: 'Math',
  run,
  icon: ''
};

export default MathExtension;
