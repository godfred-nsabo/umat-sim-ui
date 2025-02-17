import { Button } from "@/components/ui/button";

interface VoiceButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function VoiceButton({
  onClick,
  isActive = false,
  className = "",
  children,
}: VoiceButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={`
        flex items-center gap-2 
        rounded-full bg-black text-white 
        hover:bg-black/90 
        px-4 py-2
        transition-all
        ${isActive ? "bg-black/90" : ""}
        ${className}
      `}
    >
      <span className="text-sm font-medium">{children} </span>
    </Button>
  );
}
