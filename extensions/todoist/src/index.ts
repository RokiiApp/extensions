import { ExtensionModule, AppItem, ScriptItem, InfoItem } from '@rokii/api';
// import { TodoistApi } from '@doist/todoist-api-typescript';
import { createTask } from './services';
import icon from './icons/icon.png';
import { settings } from './settings';
import TodayTasks from './apps/TodayTasks';

if (!Notification.permission) Notification.requestPermission();

const APP_NAMES = {
  today: 'tds_today',
  view: 'tds_view'
};

const todayAppLauncherFabric = (command: string) => new AppItem({
  title: 'View Today Tasks',
  icon,
  keyword: [`tds ${command}`],
  appName: APP_NAMES.today
});

const viewAppLauncherFabric = (command: string) => new AppItem({
  title: 'View X Day Tasks',
  icon,
  keyword: [`tds ${command}`],
  appName: APP_NAMES.view
});

const noTokenFound = new InfoItem({ title: 'No token found' });

const run: ExtensionModule['run'] = async (ctx) => {
  const { display, settings, term } = ctx;
  const token = settings.token;

  if (!token) return display([noTokenFound]);

  const createTaskItem = new ScriptItem({
    title: 'New Task',
    icon,
    keyword: [`tds ${settings.newTaskCommand}`],
    run: () => createTask(token, { text: term })
  });

  const todayAppLauncher = todayAppLauncherFabric(settings.todayTaskCommand);
  const viewAppLauncher = viewAppLauncherFabric(settings.xDayTaskCommand);

  display([todayAppLauncher, viewAppLauncher, createTaskItem]);
};

const TodoistExtension: ExtensionModule = {
  name: 'Todoist',
  icon,
  run,
  apps: {
    [APP_NAMES.today]: TodayTasks
    // [APP_NAMES.view]: null
  },
  settings
};

export default TodoistExtension;
