const api_key = process.env.BUN_PUBLIC_NASA_API_KEY || "DEMO_KEY";

type GetApodParams = {
  date?: string;
};

export async function getApod(params?: GetApodParams) {
  const query = new URLSearchParams({
    api_key: api_key,
    ...(params?.date && { date: params.date }),
  })

  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?${query.toString()}`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar dados da NASA");
  }

  return response.json();
}
