import TextArea from "antd/es/input/TextArea";
import { ChangeEventHandler } from "react";

interface InputMessageProps {
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  value: string;
}

export const InputMessage = ({ onChange, value }: InputMessageProps) => (
  <TextArea
    style={{ resize: "none", height: 70 }}
    onChange={onChange}
    value={value}
  />
);
