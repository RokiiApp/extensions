import iconDefault from '../icons';

export default ({
  title = 'Rokii-Todoist',
  body = '',
  icon = iconDefault,
  isUpdate = false
} = {}) => {
  const noti = new Notification(title, { body, icon });
  if (isUpdate) {
    noti.onclick = function (event) {
      event.preventDefault(); // Previene al buscador de mover el foco a la pestaña del Notification
      window.open(
        'https://github.com/dubisdev/cerebro-todoist/releases',
        '_blank'
      );
    };
  }
};
