import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
} from "@base-ui/react";

interface ButtonProps extends BaseButtonProps {
  label: string;
}

function Button({ label, ...props }: ButtonProps) {
  return <BaseButton {...props}>{label}</BaseButton>;
}

export default Button;
