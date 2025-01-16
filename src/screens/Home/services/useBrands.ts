import { useQuery } from "@tanstack/react-query";

type Brand = {
  codigo: string;
  nome: string;
};

export function useBrands() {
  async function fetchBrands() {
    const response = await fetch(
      "https://parallelum.com.br/fipe/api/v1/carros/marcas"
    );

    if (!response.ok) {
      throw new Error("An error occurred");
    }

    const data = (await response.json()) as Brand[];

    return data;
  }

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  return { brands: data, isPending, isError, error };
}
