import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { useBrands } from "./services";
import { FlashList } from "@shopify/flash-list";
import { Header } from "./components";
import { Card } from "@/components/ui";
import { router } from "expo-router";
import { Loading } from "@/components/common";

export function HomeScreen() {
  const { brands, isPending, isError } = useBrands();

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" className="bg-primary" />
      <Header />

      <View className="flex-1 bg-tertiary">
        <View className="px-5 mt-5 pb-2">
          <Text className="text-2xl font-bold text-primary">Marcas</Text>
        </View>

        {isError && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-lg font-bold text-primary">
              Erro ao carregar marcas
            </Text>
          </View>
        )}

        {isPending ? (
          <Loading />
        ) : (
          <SafeAreaView className="flex-1">
            <FlashList
              data={brands}
              renderItem={({ item }) => (
                <Card
                  title={item.nome}
                  onPress={() => {
                    router.push(`/(app)/${item.codigo}?brandName=${item.nome}`);
                  }}
                />
              )}
              ItemSeparatorComponent={() => <View className="my-2" />}
              contentContainerStyle={{
                paddingVertical: 20,
                paddingHorizontal: 10,
              }}
              keyExtractor={(item) => item.codigo}
              estimatedItemSize={50}
            />
          </SafeAreaView>
        )}
      </View>
    </View>
  );
}
