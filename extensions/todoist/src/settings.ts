import { BooleanSetting, StringSetting } from '@rokii/api';
import lang from './lang';
const strings = lang.settings;

// ----------------- Plugin settings --------------------- //

export const settings = {
  token: StringSetting({
    id: 'token',
    label: 'Token',
    defaultValue: '',
    description: strings.descriptionToken
  }),

  newTaskCommand: StringSetting({
    id: 'newTaskCommand',
    label: 'New Task Command',
    defaultValue: 'new',
    description: strings.descriptionNewCommand
  }),

  todayTaskCommand: StringSetting({
    id: 'todayTaskCommand',
    label: 'Today Tasks Command',
    defaultValue: 'today',
    description: strings.descriptionTodayCommand
  }),

  xDayTaskCommand: StringSetting({
    id: 'xDayTaskCommand',
    label: 'View X Day Tasks Command',
    defaultValue: 'view',
    description: strings.descriptionViewCommand
  }),

  showOverdue: BooleanSetting({
    id: 'showOverdue',
    label: 'Show Overdue',
    defaultValue: false,
    description: strings.descriptionOverdue
  })
};
// ----------------- END Plugin settings --------------------- //
