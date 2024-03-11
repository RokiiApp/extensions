import { App, ExtensionModule, InfoItem, ScriptItem } from '@rokii/api';
import { TodoistApi, Task } from '@doist/todoist-api-typescript';
import { completeTask, getTaskHour } from '../services/taskServices';
import lang from '../lang';

const loadingItem = new InfoItem({ title: lang.gettingTasksMessage, id: 'loading' });

const taskToItem = (task: Task, api: TodoistApi): ScriptItem => {
  return new ScriptItem({
    id: task.id,
    title: task.content,
    subtitle: getTaskHour(task),
    run: async () => {
      completeTask(api, task);
    }
  });
};

const ViewTasksRun: ExtensionModule['run'] = async (ctx) => {
  const { display, hide, settings, term } = ctx;

  const { token } = settings;

  const apiClient = new TodoistApi(token);

  display([loadingItem]);

  const tasks = await apiClient.getTasks({ filter: term });

  hide('loading');
  const items = tasks.map((task) => taskToItem(task, apiClient));
  display(items);
};

export const ViewTasks: App = {
  id: 'ViewTasks',
  run: ViewTasksRun
};
