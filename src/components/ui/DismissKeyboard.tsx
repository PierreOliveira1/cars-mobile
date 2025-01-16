import { ReactNode } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

type Props = {
  children: ReactNode;
};

export function DismissKeyboard({ children }: Props) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>{children}</>
    </TouchableWithoutFeedback>
  );
}
