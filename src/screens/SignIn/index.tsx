import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "./services";
import { cn } from "@/utils";
import { router } from "expo-router";
import { DismissKeyboard } from "@/components/ui";
import { toast } from "@/components/common";

type SignInForm = {
  user: string;
  password: string;
};

export const SignInScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<SignInForm>();
  const { signIn, isPending } = useAuth();

  const onSubmit = async (data: SignInForm) => {
    try {
      await signIn({ user: data.user, password: data.password });
      router.replace("/");
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message);
      }

      toast.error("Erro ao entrar");
    }
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <DismissKeyboard>
      <View className="flex-1 justify-center items-center p-8 bg-tertiary">
        <Text className="text-4xl font-bold mb-10">VehicleX</Text>

        <View className="w-full justify-center items-center gap-4">
          <View className="w-full gap-2">
            <Controller
              control={control}
              rules={{ required: "Usuário é obrigatório" }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextInput
                  ref={ref}
                  className={cn(
                    "w-full h-12 pl-2 border border-gray-300 rounded-md",
                    {
                      "border-red-500": errors.user,
                    }
                  )}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Usuário"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    setFocus("password");
                  }}
                />
              )}
              name="user"
            />
            {errors.user && (
              <Text className={cn("text-red-500")}>{errors.user?.message}</Text>
            )}
          </View>

          <View className="w-full gap-2">
            <Controller
              control={control}
              rules={{ required: "Senha é obrigatória" }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextInput
                  ref={ref}
                  className={cn(
                    "w-full h-12 pl-2 border border-gray-300 rounded-md",
                    {
                      "border-red-500": errors.password,
                    }
                  )}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Senha"
                  secureTextEntry
                  returnKeyType="done"
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text className="text-red-500">{errors.password?.message}</Text>
            )}
          </View>

          <TouchableOpacity
            className={cn(
              "w-full h-12 justify-center items-center bg-blue-500 rounded-md",
              {
                "bg-gray-500": isPending || !isValid,
              }
            )}
            onPress={handleSubmit(onSubmit)}
            disabled={isPending || !isValid}
          >
            {isPending ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text className="text-white font-bold">Entrar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </DismissKeyboard>
  );
};
