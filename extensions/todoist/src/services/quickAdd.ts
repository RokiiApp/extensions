import { fetch } from "@tauri-apps/plugin-http";

export const quickAdd = async (text: string, token: string) => {
  const res = await fetch('https://api.todoist.com/sync/v9/quick/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ text })
  });
  return (res.ok ? null : Promise.reject(res));
};
