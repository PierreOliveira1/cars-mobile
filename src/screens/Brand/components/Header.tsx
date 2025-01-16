import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView, View } from "react-native";

export function Header({ brandName }: { brandName: string }) {
  return (
    <View className="w-full bg-primary">
      <SafeAreaView className="w-full relative">
        <View className="w-full relative">
          <TouchableOpacity
            className="absolute left-4 top-4"
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>

          <View className="w-full items-center p-4">
            <Text className="text-lg font-bold text-tertiary">{brandName}</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
