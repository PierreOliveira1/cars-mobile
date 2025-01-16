import { ActivityIndicator, Text, View } from "react-native";
import { useModels } from "./services";
import { FlashList } from "@shopify/flash-list";
import { Frown } from "lucide-react-native";
import { Card } from "@/components/ui";
import { Header } from "./components";
import { Loading } from "@/components/common";

type Brand = {
  id: string;
  name: string;
};

export function BrandScreen(brand: Brand) {
  const { models, isPending, isError, isSuccess } = useModels(brand.id);

  return (
    <View className="flex-1 bg-tertiary">
      <Header brandName={brand.name} />

      <View className="px-5 mt-5 pb-2">
        <Text className="text-2xl font-bold text-primary">Modelos</Text>
      </View>

      {isPending && <Loading />}

      {isError && (
        <View className="flex-1 items-center mt-[45%]">
          <Frown className="text-primary" size={90} />
          <Text className="text-lg font-bold text-primary mt-4">
            Erro ao carregar modelos
          </Text>
        </View>
      )}

      {isSuccess && (
        <FlashList
          data={models}
          renderItem={({ item }) => <Card title={item.name} />}
          ItemSeparatorComponent={() => <View className="my-2" />}
          contentContainerStyle={{
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}
          keyExtractor={(item) => item.id}
          estimatedItemSize={50}
        />
      )}
    </View>
  );
}
