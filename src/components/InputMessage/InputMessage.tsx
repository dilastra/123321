import { Input } from "antd";
import { ChangeEventHandler } from "react";

interface InputMessageProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
}

export const InputMessage = ({ onChange, value }: InputMessageProps) => (
  <Input onChange={onChange} value={value} style={{ height: "70px" }} />
);
