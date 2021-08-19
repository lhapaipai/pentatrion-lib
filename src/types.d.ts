declare module "mini-notifier" {
  export function notify(
    message: string,
    options?: {
      time?: number;
      style?: "success" | "error";
      target?: HTMLElement | null;
    }
  ): void;

  export function confirm(
    message: string,
    options?: {
      okText?: string;
      cancelText?: string;
      okHandler?: () => void;
      cancelHandler?: () => void;
      target?: HTMLElement | null;
    }
  ): void;

  export function prompt(
    message: string,
    options?: {
      okText?: string;
      okHandler?: (data: string) => void;
      inputType?: HTMLInputElement["type"];
      placeholder?: string;
      target?: HTMLElement | null;
    }
  ): void;
}
