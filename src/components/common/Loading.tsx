import { ActivityIndicator, View } from "react-native";

export function Loading() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator className="text-primary" size="large" />
    </View>
  );
}
