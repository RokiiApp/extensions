import { ExtensionModule, InfoItem, ScriptItem } from '@rokii/api';
import { getIp } from './getIp';

const noInternetItem = new InfoItem({
  title: 'No IP Address Found',
  subtitle: 'You are offline'
});

let ip = '';

const run: ExtensionModule['run'] = async ({ display, actions }) => {
  if (navigator.onLine === false) {
    return display([noInternetItem]);
  }

  const ipItem = new ScriptItem({
    title: 'IP:',
    subtitle: ip,
    run: async () => {
      actions.copyToClipboard(ip);
    }
  });

  display([ipItem]);
};

const IpExtension: ExtensionModule = {
  name: 'Ip',
  initializeAsync: async (send) => {
    const ip = await getIp();
    send(ip);
  },
  onMessage (dataIp) {
    ip = dataIp as string;
  },
  run,
  icon: ''
};

export default IpExtension;
