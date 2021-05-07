export type PrimaryColors =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "dark"
  | "light"
  | "white"
  | string;

export type LightColors =
  | "light-primary"
  | "light-success"
  | "light-info"
  | "light-warning"
  | "light-danger"
  | "light-dark"
  | string;

export type TextColor =
  | "muted"
  | "gray-100"
  | "gray-200"
  | "gray-300"
  | "gray-400"
  | "gray-500"
  | "gray-600"
  | "gray-700"
  | "gray-800"
  | "gray-900";

export type ColorsVariant = PrimaryColors | LightColors;
export type ButtonVariant = ColorsVariant;
export type TextVariant = PrimaryColors | TextColor;
