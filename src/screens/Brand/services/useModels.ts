import { useQuery } from "@tanstack/react-query";

type Model = {
  codigo: string;
  nome: string;
};

type ModelsResponse = {
  modelos: Model[];
};

export function useModels(codigo: string) {
  async function getModels(codigo: string): Promise<ModelsResponse> {
    const response = await fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigo}/modelos`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch models");
    }

    const data = (await response.json()) as ModelsResponse;

    return data;
  }

  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ["models", codigo],
    queryFn: () => getModels(codigo),
  });

  return {
    models: data?.modelos?.map((model) => ({
      id: model.codigo,
      name: model.nome,
    })),
    isPending,
    isError,
    isSuccess,
  };
}
