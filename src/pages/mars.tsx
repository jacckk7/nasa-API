import ImageModal from "@/components/imageModal";
import { getMarsPhotos } from "@/services/nasaApi";
import { useEffect, useState } from "react";

const ROVERS = ["curiosity", "opportunity", "spirit", "perserverance"] as const;

type MarsPhoto = {
  id: number;
  img_src: string;
  earth_date: string;
  camera: {
    full_name: string;
  };
};

export default function Mars() {
  const [rover, setRover] = useState<(typeof ROVERS)[number]>("curiosity");
  const [page, setPage] = useState<number>(1);
  const [photos, setPhotos] = useState<MarsPhoto[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getMarsPhotos(rover, page)
      .then((data) => setPhotos(data.photos))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [rover, page]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mars images 🪐</h1>

      <div className="flex gap-3 mb-6 flex-wrap">
        {ROVERS.map((r) => (
          <button
            key={r}
            onClick={() => {
              setRover(r);
              setPage(1);
            }}
            className={`
              px-4 py-2 rounded-lg capitalize transition
              ${
                rover === r
                  ? "bg-primary text-white"
                  : "bg-bg-secondary border border-border text-text-secondary hover:text-text-primary cursor-pointer"
              }  
            `}
          >
            {r}
          </button>
        ))}
      </div>

      {loading && <p>Loading images...</p>}
      {error && <p className="text-error">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-bg-secondary border border-border rounded-xl overflow-hidden cursor-pointer hover:bg-bg-elevated transition"
            onClick={() => setSelectedImage(photo.img_src)}
          >
            <img
              src={photo.img_src}
              alt="Mars image"
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <p className="font-medium mb-1">{photo.camera.full_name}</p>

              <p className="text-text-secondary text-sm">
                {new Intl.DateTimeFormat("pt-BR").format(
                  new Date(photo.earth_date),
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded-lg bg-bg-secondary border border-border cursor-pointer disabled:opacity-50 disabled:cursor-default"
        >
          Previous
        </button>

        <span className="flex items-center text-text-secondary">
          Page {page}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded-lg bg-bg-secondary border border-border cursor-pointer"
        >
          Next
        </button>
      </div>

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
