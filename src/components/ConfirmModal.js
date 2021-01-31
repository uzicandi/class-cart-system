import { Modal } from 'antd';

export const ConfirmModal = (title, onOk, onCancel, content) => {
  const { confirm } = Modal;
  return confirm({
    title,
    content,
    onOk,
    onCancel,
    okButtonProps: { type: 'danger' }
  });
};
