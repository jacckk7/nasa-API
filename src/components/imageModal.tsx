type ImageModalProps = {
  imageUrl: string;
  onClose: () => void;
};

export default function ImageModal({ imageUrl, onClose }: ImageModalProps) {
  return (
    <div
      className="fixed insert-0 z-50 bg-black/80 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="max-w-6xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={imageUrl} alt="Mars image" className="rounded-xl max-h-[90vh]" />
      </div>
    </div>
  );
}
