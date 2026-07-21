export interface NwbAlertConfig {
  id: string;
  message: string;
  icon?: string;
  color?: 'is-primary' | 'is-success' | 'is-danger' | 'is-warning' | 'is-info' | 'is-dark' | 'is-link' | string;
  position?: 'is-left' | 'is-right' | 'is-top' | 'is-bottom' | string;
  duration?: number;
  extraClasses?: string;
}
