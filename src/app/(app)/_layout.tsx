import { useUser } from "@/hooks";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  const { user } = useUser();

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
