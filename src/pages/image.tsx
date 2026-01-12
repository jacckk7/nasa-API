import { useEffect, useState } from "react";
import { getApod } from "../services/nasaApi";
import { formatDate } from "@/utils/formatDate";

type ApodResponse = {
  title: string;
  explanation: string;
  url: string;
  media_type: "image" | "video";
  date: string;
};

export default function Image() {
  const [data, setData] = useState<ApodResponse | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, seterror] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getApod()
      .then(setData)
      .catch((err) => seterror(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = async () => {
    if (!selectedDate) return;

    try {
      setLoading(true);
      seterror(null);
      const result = await getApod({ date: selectedDate });
      setData(result);
    } catch (err: any) {
      seterror(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text-primary p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Astronomy Picture of the Day
        </h1>

        <div className="flex gap-3 mb-6">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="
              bg-bg-secondary
              border border-border
              rounded-lg
              px-4 py-2
              text-text-primary
              focus:outline-none
              focus:ring-2 focus:ring-primary
            "
          />
          <button
            onClick={handleSearch}
            disabled={!selectedDate || loading}
            className="
              bg-primary
              hover:bg-primary-hover
              hover:cursor-pointer
              disabled:opacity-50
              px-4 py-2
              rounded-lg
              transition
            "
          >
            Search
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {data && !loading && (
          <div className="bg-bg-secondary border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-2">{data?.title}</h2>
            <p className="text-text-secondary mb-4">{formatDate(data.date)}</p>

            {data?.media_type === "image" ? (
              <img 
                src={data.url}
                alt={data.title}
                className="rounded-lg mb-4 max-h-125 mx-auto"
              />
            ) : (
              <iframe
                src={data?.url}
                className="w-full h-96 rounded-lg mb-4"
                allowFullScreen
              />
            )}

            <p className="text-text-secondary text-justify">{data?.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}