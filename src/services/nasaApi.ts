const api_key = process.env.BUN_PUBLIC_NASA_API_KEY || "DEMO_KEY";

type GetApodParams = {
  date?: string;
};

type GetNeoParams = {
  startDate: string;
  endDate: string;
};

export async function getApod(params?: GetApodParams) {
  const query = new URLSearchParams({
    api_key: api_key,
    ...(params?.date && { date: params.date }),
  });

  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?${query.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar dados da NASA");
  }

  return response.json();
}

export async function getNearEarthObjects({
  startDate,
  endDate,
}: GetNeoParams) {
  const query = new URLSearchParams({
    api_key: api_key,
    start_date: startDate,
    end_date: endDate,
  });

  const response = await fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?${query.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar asteroides próximos da Terra");
  }

  return response.json();
}

export async function getAsteroidById(id: string) {
  const response = await fetch(
    `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${api_key}`,
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar detalhes do asteroide");
  }

  return response.json();
}
