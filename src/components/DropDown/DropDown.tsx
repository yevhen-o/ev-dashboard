import classNames from "classnames";
import { useRef, useState } from "react";

import { Button } from "../Button";
import type { ButtonProps } from "../Button/Button";
import { useOutsideClick } from "src/hooks/useOutsideClick";
import { Checkbox, CheckboxChecked } from "src/components/Icons";
import "./DropDown.scss";

interface DropDownProps extends ButtonProps {
  children: React.ReactNode;
  className?: string;
  options: {
    label: string;
    value: string;
    onClick: () => void;
    disabled?: boolean;
    checked?: boolean;
  }[];
}

export const DropDown: React.FC<DropDownProps> = ({
  children,
  options,
  className,
  ...restProps
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useOutsideClick(menuRef, handleToggleOpen, isOpen);

  return (
    <div ref={menuRef} className="dropdown__wrapper">
      <Button
        onClick={handleToggleOpen}
        className={classNames("drop-down-menu-button", className)}
        {...restProps}
      >
        {children}
      </Button>
      {isOpen && (
        <div role="menu" className={classNames("dropdown__menu", className)}>
          {options.map(
            ({ label, onClick, value, disabled, checked }, index) => {
              return (
                <button
                  key={`${label}__${value}__${index}`}
                  onClick={onClick}
                  disabled={disabled}
                >
                  {checked ? <CheckboxChecked /> : <Checkbox />}
                  {label}
                </button>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};
