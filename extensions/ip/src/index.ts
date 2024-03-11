import { ExtensionModule, InfoItem, ScriptItem } from '@rokii/api';
import { getIp } from 'getIp';

const noInternetItem = new InfoItem({
  title: 'No IP Address Found',
  subtitle: 'You are offline'
});

const run: ExtensionModule['run'] = async ({ display, actions }) => {
  if (navigator.onLine === false) {
    return display([noInternetItem]);
  }

  const ip = await getIp();

  const ipItem = new ScriptItem({
    title: 'Your IP',
    subtitle: ip,
    run: async () => {
      actions.copyToClipboard(ip);
    }
  });

  display([ipItem]);
};

const IpExtension: ExtensionModule = {
  name: 'Ip',
  run,
  icon: ''
};

export default IpExtension;
