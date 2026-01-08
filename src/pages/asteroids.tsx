import { useEffect, useState } from "react";
import { getNearEarthObjects } from "../services/nasaApi";

type Asteroid = {
  id: string;
  name: string;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: {
    close_approach_date: string;
    miss_distance: {
      kilometers: string;
    };
    relative_velocity: {
      kilometers_per_hour:string;
    };
  }[];
};

export default function Asteroids() {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    if (!today) return;

    setLoading(true);
    getNearEarthObjects({
      startDate: today,
      endDate: today,
    })
      .then((data) => {
        const objects = data.near_earth_objects[today];
        setAsteroids(objects);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Asteroids Near Earth ☄️
      </h1>

      {loading && <p>Carregando dados...</p>}
      {error && <p className="text-error">{error}</p>}

      <div className="grid gap-4">
        {asteroids.map((asteroid) => {
          const approach = asteroid.close_approach_data[0];

          return (
            <div 
              key={asteroid.id}
              className="bg-bg-secondary border border-border rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">
                  {asteroid.name}
                </h2>

                {asteroid.is_potentially_hazardous_asteroid ? (
                  <span className="text-error font-medium">
                    Potencialmente perigoso
                  </span>
                ) : (
                  <span className="text-success font-medium">
                    Seguro
                  </span>
                )}
              </div>

              <p className="text-text-secondary">
                Distância da Terra:{" "}
                <strong>
                  {Number(
                    approach?.miss_distance.kilometers
                  ).toLocaleString("pt-BR")} km
                </strong>
              </p>

              <p className="text-text-secondary">
                Velocidade:{" "}
                <strong>
                  {Number(
                    approach?.relative_velocity.kilometers_per_hour
                  ).toLocaleString("pt-BR")} km/h
                </strong>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
