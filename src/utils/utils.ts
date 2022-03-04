import { message } from 'antd';

/**
 * menu Highlight key
 * @param pathname string
 */
export const queryKeysByPath = (
  pathname: string,
): { openKey: string; selectKey: string } => {
  const reg = /(^\/*)|(\/*$)/g; // 匹配字符串首尾斜杠
  const path = pathname.replace(reg, '');
  const routes = path.split('/');
  return { openKey: routes[0], selectKey: routes[1] || routes[0] };
};

// 检测请求是否成功
export const isResOk = (res: any) => {
  if (res && res.code !== 0) {
    let error = res.msg || '请求失败';
    message.error(error);
  }
  return res && res.code === 0;
};

// 将分钟转换成 HH:MM:SS 格式  60 => 01:00:00
export const duration2Time = (duration: number) => {
  const hh = String(parseInt(String(duration / 60))).padStart(2, '0');
  const mm = String(duration % 60).padStart(2, '0');
  const ss = '00';
  return `${hh}:${mm}:${ss}`;
};
