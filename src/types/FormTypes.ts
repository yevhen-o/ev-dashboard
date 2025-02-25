import { HTMLProps } from "react";

export type FilterValueType = Record<string, string>;

export type Value = string | number | boolean | null | undefined;

export type FormValueType = Record<string, Value>;

export type Option = { id?: string; value: string | number; label: string };

interface CommonFormElementProps {
  name: string;
  label?: string;
  errorMessage?: string;
  isTouched?: boolean;
  isDirty?: boolean;
  isErrorMessageHidden?: boolean;
}

export type InputProps = HTMLProps<HTMLInputElement> & CommonFormElementProps;

export type SelectProps = HTMLProps<HTMLSelectElement> &
  CommonFormElementProps & {
    options: Option[];
  };

export type FieldType = SelectProps | InputProps;
