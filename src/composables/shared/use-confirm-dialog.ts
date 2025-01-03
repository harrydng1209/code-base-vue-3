import { ElMessageBox } from 'element-plus';

interface IOptions {
  cancelButtonText?: string;
  confirmButtonText?: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
}

const useConfirmDialog = () => {
  const { t } = useI18n();

  const showConfirm = async (options: IOptions) => {
    const {
      cancelButtonText = t('button.cancel'),
      confirmButtonText = t('button.ok'),
      message,
      onCancel,
      onConfirm,
      title
    } = options || {};

    ElMessageBox.confirm(message, title, {
      cancelButtonText,
      center: true,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      confirmButtonText,
      showClose: false
    })
      .then(() => onConfirm())
      .catch(() => onCancel());
  };

  return { showConfirm };
};

export default useConfirmDialog;
