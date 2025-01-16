import { LogOut } from "lucide-react-native";
import { Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import { useUser } from "@/hooks";
import { router } from "expo-router";

export function Header() {
  const { user, setUser } = useUser();

  return (
    <View className="w-full flex-row items-center justify-between bg-primary">
      <SafeAreaView className="w-full">
        <View className="w-full flex-row justify-between items-center p-4">
          <Text className="text-lg font-bold text-tertiary">
            Olá, {user?.name}
          </Text>

          <TouchableOpacity
            onPress={() => {
              setUser(null);
              router.replace("/sign-in");
            }}
          >
            <LogOut size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
