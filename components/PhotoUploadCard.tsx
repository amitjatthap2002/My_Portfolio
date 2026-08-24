"use client";

interface PhotoUploadCardProps {
  label?: string;
  description?: string;
  initialSrc?: string | null;
  alt?: string;
  previewClassName?: string;
  className?: string;
}

export default function PhotoUploadCard({
  initialSrc,
  alt = "Portfolio preview",
  previewClassName = "h-40 w-full object-cover",
  className = "",
}: PhotoUploadCardProps) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/60 ${className}`}>
      {initialSrc ? (
        <img src={initialSrc} alt={alt} className={`w-full object-cover ${previewClassName}`} />
      ) : (
        <div className="flex h-40 w-full items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-zinc-500">
          <p className="text-xs uppercase tracking-[0.25em]">No photo</p>
        </div>
      )}
    </div>
  );
}
