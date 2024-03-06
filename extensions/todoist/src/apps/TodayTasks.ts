import { ExtensionModule, InfoItem, ScriptItem } from '@rokii/api';
import { TodoistApi, Task } from '@doist/todoist-api-typescript';
import { completeTask } from '../services/taskServices';

let todayTasks: Task[] = [];

const loadingItem = new InfoItem({ title: 'Searching today tasks...', id: 'loading' });

const taskToItem = (task: Task, api: TodoistApi): ScriptItem => {
  return new ScriptItem({
    id: task.id,
    title: task.content,
    subtitle: task.due?.date,
    run: async () => {
      completeTask(api, task);
    }
  });
};

const TodayTasks: ExtensionModule['run'] = async (ctx) => {
  const { display, hide, settings, term } = ctx;

  const token = settings.token;

  const apiClient = new TodoistApi(token);

  display([loadingItem]);

  // When we empty the search term, we update the todayTasks
  if (term === '') {
    todayTasks = await apiClient.getTasks({ filter: 'today' });
  }

  hide('loading');

  const items = todayTasks.map((task) => taskToItem(task, apiClient));
  display(items);
};

export default TodayTasks;
