import { Text, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  onPress?: () => void;
};

export function Card({ title, onPress }: Props) {
  return (
    <TouchableOpacity
      className="w-full rounded-md flex-row items-center justify-between p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)] bg-tertiary"
      onPress={onPress}
    >
      <Text className="text-lg font-bold">{title}</Text>
    </TouchableOpacity>
  );
}
