import { ExtensionModule, InfoItem, ScriptItem, App } from '@rokii/api';
import { TodoistApi, Task } from '@doist/todoist-api-typescript';
import { completeTask, getTaskHour } from '../services/taskServices';
import lang from '../lang';

let todayTasks: Task[] = [];

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

const TodayTasksRun: ExtensionModule['run'] = async (ctx) => {
  const { display, hide, settings, term } = ctx;

  const { showOverdue, token } = settings;

  const apiClient = new TodoistApi(token);

  display([loadingItem]);

  // When we empty the search term, we update the todayTasks
  if (term === '') {
    const filter = showOverdue ? '(today | overdue)' : 'today';
    todayTasks = await apiClient.getTasks({ filter });
  }

  hide('loading');

  const items = todayTasks.map((task) => taskToItem(task, apiClient));
  display(items);
};

export const TodayTasks: App = {
  id: 'TodayTasks',
  run: TodayTasksRun
};
