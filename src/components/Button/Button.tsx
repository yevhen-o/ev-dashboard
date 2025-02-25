import classNames from "classnames";
import { ForwardRefRenderFunction, PropsWithChildren, forwardRef } from "react";
import "./Button.scss";

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  title?: string;
  isPrimary?: boolean;
  isRounded?: boolean;
  isTransparent?: boolean;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};

export const Button: ForwardRefRenderFunction<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
> = (
  {
    id,
    type,
    title,
    onClick,
    children,
    disabled,
    className,
    isPrimary,
    isRounded,
    isTransparent,
    ariaLabel,
    ...restProps
  },
  ref
) => {
  return (
    <button
      ref={ref}
      {...restProps}
      id={id}
      type={type}
      title={title}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classNames(
        "button",
        { "button--rounded": isRounded },
        { "button--transparent": isTransparent },
        { "button--primary": isPrimary },
        className
      )}
    >
      {children}
    </button>
  );
};

export default forwardRef(Button);
