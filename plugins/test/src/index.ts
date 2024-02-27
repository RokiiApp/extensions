import { BooleanSetting, ExtensionModule, ScriptItem } from '@rokii/api';

const item = new ScriptItem({
  title: 'Test Plugin',
  subtitle: 'Test Plugin Subtitle',
  run: () => {
    console.log('Test Extension selected');
  }
});

const initialize: ExtensionModule['initialize'] = (...args) => {
  console.groupCollapsed('[TestPlugin]');
  console.log('[TestPlugin] The initializeAsync function has been called with this args', { args });
};

const initializeAsync: ExtensionModule['initializeAsync'] = async (...args) => {
  console.log('[TestPlugin] The initializeAsync function has been called with this args', { args });
  console.log('[TestPlugin] Now calling the callback');

  const [callbackFn] = args;

  callbackFn({ message: 'test message' });
};

const onMessage: ExtensionModule['onMessage'] = (...args) => {
  console.log('[TestPlugin] The onMessage function has been called with this args', { args });
  console.groupEnd();
};

const settings: ExtensionModule['settings'] = {
  test: BooleanSetting({
    id: 'Test',
    label: 'Test',
    description: 'Test Description',
    defaultValue: true
  })
};

const TestPlugin: ExtensionModule = {
  icon: '',
  name: 'Test Plugin',
  run: ({ display }) => display([item]),
  initialize,
  initializeAsync,
  onMessage,
  settings
};

export default TestPlugin;
