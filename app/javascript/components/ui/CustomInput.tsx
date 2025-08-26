import { Input, InputProps } from "@chakra-ui/react";

export default function CustomInput({ ...rest }: InputProps) {
  return <Input backgroundColor="#fafafa" {...rest} />;
}
