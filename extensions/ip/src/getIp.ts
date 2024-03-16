import { fetch } from '@tauri-apps/plugin-http';

const IP_API = 'https://api.ipify.org?format=json';

export const getIp = async () => {
  const ip = await fetch(IP_API).then((res) => res.json());

  return ip.ip as string;
};
