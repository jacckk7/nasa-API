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
    throw new Error("Error fetching NASA data");
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
    throw new Error("Error fetching near-Earth asteroids");
  }

  return response.json();
}

export async function getAsteroidById(id: string) {
  const response = await fetch(
    `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${api_key}`,
  );

  if (!response.ok) {
    throw new Error("Error fetching asteroid details");
  }

  return response.json();
}

export async function getMarsPhotos(rover: string, page: number) {
  const query = new URLSearchParams({
    api_key: api_key,
    sol: "1000",
    // page: page.toString(),
  });

  const response = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?${query.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Error fetching Mars photos");
  }

  return response.json();
}
