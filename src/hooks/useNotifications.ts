import { useSnackbar } from 'notistack';
import type { OptionsObject } from 'notistack';
import { useTranslations } from './useTranslations';
import type { TranslationKey } from '@/utils/translations';

type NotificationVariant = 'default' | 'error' | 'success' | 'warning' | 'info';

export const useNotifications = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslations();

  const showNotification = (message: string, variant: NotificationVariant = 'default') => {
    const options: OptionsObject = {
      variant,
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    };
    enqueueSnackbar(message, options);
  };

  const showError = (key: keyof typeof translations.errors) => {
    showNotification(t(`errors.${key}` as const), 'error');
  };

  const showSuccess = (key: keyof typeof translations.success) => {
    showNotification(t(`success.${key}` as const), 'success');
  };

  return {
    showNotification,
    showError,
    showSuccess,
  };
}; 