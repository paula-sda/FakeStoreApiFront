import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

export default function ProductImage({ src, alt }: Props) {
  return (
    <div className="relative w-full md:w-1/2 h-80 bg-gray-50 rounded-xl p-4">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
      />
    </div>
  );
}
