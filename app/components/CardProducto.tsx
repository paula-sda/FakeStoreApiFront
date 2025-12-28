import Link from "next/link";
import Image from "next/image";
import { Producto } from "../utils/getProductos";

// Colores por categoría
const categoriaColores: Record<string, string> = {
  "men's clothing": "bg-blue-100 text-blue-700 border-blue-300",
  "women's clothing": "bg-pink-100 text-pink-700 border-pink-300",
  "electronics": "bg-green-100 text-green-700 border-green-300",
  "jewelery": "bg-yellow-100 text-yellow-700 border-yellow-300",
};

export default function CardProducto({ producto }: { producto: Producto }) {
  const colorCategoria =
    categoriaColores[producto.category] ||
    "bg-gray-100 text-gray-700 border-gray-300";

  return (
    <Link href={`/producto/${producto.id}`} className="group w-full max-w-[260px]">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center text-center hover:-translate-y-1 transform h-[400px]">
        {/* Imagen */}
        <div className="relative w-40 h-40 mb-4 flex-shrink-0">
          <Image
            src={producto.image || "/placeholder.png"}
            alt={producto.title}
            fill
            className="object-contain rounded-lg group-hover:scale-105 transition-transform"
          />
        </div>

        {/* Título */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 h-[50px]">
          {producto.title}
        </h2>

        {/* Categoría con color dinámico */}
        <span
          className={`inline-block px-3 py-1 mb-3 text-sm font-medium border rounded-full ${colorCategoria}`}
        >
          {producto.category}
        </span>

        {/* Precio */}
        <div className="mt-auto">
          <p className="text-blue-600 font-bold text-lg">{producto.price.toFixed(2)} €</p>
        </div>
      </div>
    </Link>
  );
}
