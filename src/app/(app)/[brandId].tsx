import { BrandScreen } from "@/screens/Brand";
import { useLocalSearchParams } from "expo-router";

export default function Brand() {
  const { brandId, brandName } = useLocalSearchParams<{
    brandId: string;
    brandName?: string;
  }>();

  return <BrandScreen id={brandId} name={brandName ?? ""} />;
}
