import { useUser } from "@/hooks";
import { useMutation } from "@tanstack/react-query";

type SignRequest = {
  user: string;
  password: string;
};

type SignResponse =
  | {
      error: false;
      user: {
        id: number;
        name: string;
        token: string;
      };
    }
  | {
      error: true;
      message: string;
    };

export function useAuth() {
  const { setUser } = useUser();

  async function signIn(request: SignRequest): Promise<SignResponse> {
    const response = await fetch("https://test-api-y04b.onrender.com/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: request.user,
        password: request.password,
      }),
    });

    if (response.status >= 200 && response.status < 300) {
      const data = (await response.json()) as SignResponse;

      if (data.error) {
        throw new Error(data.message);
      }

      setUser(data.user);

      return data;
    }

    throw new Error("Erro ao entrar");
  }

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: signIn,
  });

  return { signIn: mutateAsync, isPending, isSuccess, isError };
}
