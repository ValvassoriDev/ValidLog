//@ts-nocheck
import { Button } from "@material-tailwind/react";
import { MouseEventHandler } from "react";

type CustomButtonProps = {
  title: string;
  onClick?: MouseEventHandler;
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  style?: string;
}

export const CustomButton = ({ title, onClick, variant = 'primary', disabled = false, style = '' }: CustomButtonProps) => {

  const styles = {
    primary: "bg-primary font-bold font-extrabold text-primary-foreground disable:bg-gray-200",
    secondary: "bg-background font-bold font-extrabold text-green-800 disable:bg-gray-200",
  };

  return (
    <Button
      onClick={onClick}
      variant="filled"
      disabled={disabled}
      className={`inline-block rounded-2xl ${styles[variant]} disable:bg-gray-200 ${style ? style : ''}`}
      placeholder={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
    >
      <span className="cursor-pointer py-1.5 text-xl">
        {title}
      </span>
    </Button>
  );
};
