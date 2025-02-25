export type Notification = {
  win: string;
  message: string;
  from?: string;
  to?: string;
  isWarning?: boolean;
  isCritical?: boolean;
};
