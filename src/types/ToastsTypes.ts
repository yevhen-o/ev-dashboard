export type ToastMessage =
  | {
      title: string;
      description: string;
    }
  | string;

export type ToastType = {
  message: ToastMessage;
  id: string;
  isSuccess?: boolean;
  isWarning?: boolean;
  isError?: boolean;
  isPersistent?: boolean;
};
