import { Modal } from 'antd';

export const InfoModal = (type, title, content) => {
  const { warning } = Modal;
  return warning({
    title,
    content
  });
};
