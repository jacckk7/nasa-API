type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function Button({
  label,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
          py-3
          rounded-xl
          font-medium
          transition
          ${
            disabled
              ? "bg-bg-elevated border border-border text-text-muted cursor-not-allowed"
              : "bg-primary hover:bg-primary-hover hover:cursor-pointer text-white"
          }
        `}
    >
      {label}
    </button>
  );
}
