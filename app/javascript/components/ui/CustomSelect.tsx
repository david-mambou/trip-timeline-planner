import { Select, SelectProps } from "@chakra-ui/react";

export default function CustomSelect({ ...rest }: SelectProps) {
  return <Select backgroundColor="#fafafa" {...rest} />;
}
