import {
  Animated,
  ActivityIndicator,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { memo, useEffect, useRef } from "react";

import {
  useToaster,
  Toast,
  toast as handleToast,
} from "react-hot-toast/headless";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CircleX, CircleCheck } from "lucide-react-native";

type PropsToastComponent = {
  toast: Toast;
  updateHeight: (value: number) => void;
  offset: number;
};

function ToastComponent({ toast, updateHeight, offset }: PropsToastComponent) {
  const posAnim = useRef(new Animated.Value(-80)).current;
  const insets = useSafeAreaInsets();

  const icons = {
    success: <CircleCheck size={20} color="green" />,
    error: <CircleX size={20} color="red" />,
    loading: (
      <ActivityIndicator animating size="small" className="text-primary" />
    ),
    custom: "",
    blank: "",
  };

  useEffect(() => {
    Animated.parallel([
      Animated.spring(posAnim, {
        toValue: toast.visible ? offset + (insets.top ?? 0) + 5 : -150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [posAnim, toast.visible, offset]);

  const color =
    toast.type === "success"
      ? "green5"
      : toast.type === "error"
      ? "red5"
      : "primary";

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: toast.visible ? 999999 : undefined,
        alignItems: "center",
        transform: [
          {
            translateY: posAnim,
          },
        ],
      }}
    >
      <View
        className="bg-tertiary max-w-[80%] rounded-md flex-row items-center gap-2 p-2 shadow-md shadow-slate-400"
        onLayout={(event) => updateHeight(event.nativeEvent.layout.height)}
        key={toast.id}
      >
        <Text className="text-primary">{icons[toast.type]}</Text>
        <Text className="text-primary">{`${toast.message as string}`}</Text>
      </View>
    </Animated.View>
  );
}

const ToastComponentMemo = memo(ToastComponent);

export function Toaster() {
  const { toasts, handlers } = useToaster();

  return (
    <View className="absolute left-0 right-0 top-0 z-999999">
      <SafeAreaView className="flex-1">
        {toasts.map((toast) => (
          <ToastComponentMemo
            key={toast.id}
            toast={toast}
            updateHeight={(height) => handlers.updateHeight(toast.id, height)}
            offset={handlers.calculateOffset(toast, {
              reverseOrder: false,
            })}
          />
        ))}
      </SafeAreaView>
    </View>
  );
}

export const toast = handleToast;
