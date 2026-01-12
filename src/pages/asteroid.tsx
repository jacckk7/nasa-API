import { getAsteroidById } from "@/services/nasaApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type AsteroidDetails = {
  name: string;
  nasa_jpl_url: string;
  is_potentially_hazardous_asteroid: boolean;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  close_approach_data: {
    close_approach_date: string;
    miss_distance: {
      kilometers: string;
    };
    relative_velocity: {
      kilometers_per_hour: string;
    };
    orbiting_body: string;
  }[];
};

export default function Asteroid() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [data, setData] = useState<AsteroidDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getAsteroidById(id)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-error">{error}</p>;
  if (!data) return null;

  const diameter = data.estimated_diameter.kilometers;
  const approach = data.close_approach_data[0];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-primary hover:underline cursor-pointer mb-4"
      >
        ← Voltar
      </button>

      <div className="bg-bg-secondary border border-border rounded-xl p-6">
        <h1>{data.name}</h1>

        <p className="mb-4">
          Status:{" "}
          {data.is_potentially_hazardous_asteroid ? (
            <span className="text-error font-medium">
              Potentially dangerous
            </span>
          ) : (
            <span className="text-success font-medium">Safe</span>
          )}
        </p>

        <div className="grid gap-2 mb-4 text-text-secondary">
          <p>
            Estimated diameter:{" "}
            <strong>
              {diameter.estimated_diameter_min.toFixed(2)} -{" "}
              {diameter.estimated_diameter_max.toFixed(2)} km
            </strong>
          </p>

          <p>
            Minimum distance from Earth:{" "}
            <strong>
              {Number(approach?.miss_distance.kilometers).toLocaleString(
                "pt-BR",
              )}{" "}
              km
            </strong>
          </p>

          <p>
            Relative velocity:{" "}
            <strong>
              {Number(
                approach?.relative_velocity.kilometers_per_hour,
              ).toLocaleString("pt-BR")}{" "}
              km/h
            </strong>
          </p>

          <p>
            Orbited body: <strong>{approach?.orbiting_body}</strong>
          </p>
        </div>

        <a
          href={data.nasa_jpl_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline cursor-pointer"
        >
          View on NASA website ↗
        </a>
      </div>
    </div>
  );
}
