import { PluginModule } from '@rokii/types';

export const name: PluginModule['name'] = 'Test Plugin';
export const keywords: PluginModule['keywords'] = ['test'];

export const fn: PluginModule['fn'] = ({ term, display }) => {
  display({
    title: 'Test Plugin',
    subtitle: term,
    icon: 'https://avatars.githubusercontent.com/u/0',
    getPreview: () => <div>Example Plugin Preview</div>,
    onSelect: () => {
      console.log('Plugin selected with term: ', term);
    }
  });
};

export const initialize: PluginModule['initialize'] = (...args) => {
  console.groupCollapsed('[TestPlugin]');
  console.log('[TestPlugin] The initializeAsync function has been called with this args', { args });
};

export const initializeAsync: PluginModule['initializeAsync'] = (...args) => {
  console.log('[TestPlugin] The initializeAsync function has been called with this args', { args });
  console.log('[TestPlugin] Now calling the callback');

  const [callbackFn] = args;

  callbackFn({ message: 'test message' });
};

export const onMessage: PluginModule['onMessage'] = (...args) => {
  console.log('[TestPlugin] The onMessage function has been called with this args', { args });
  console.groupEnd();
};

export const settings: PluginModule['settings'] = {
  test: { type: 'bool', defaultValue: true }

};
