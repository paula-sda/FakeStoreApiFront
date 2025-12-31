import Image from 'next/image';
import { getProductoById } from '../../utils/getProductoById';

// Esta es ahora una página renderizada en el SERVIDOR
export default async function ProductoDetallePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const producto = await getProductoById(id);

  // Si el producto no se encuentra (la API devuelve null)
  if (!producto) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
        <p className="text-gray-500">No se pudo encontrar el producto con el ID especificado.</p>
      </div>
    );
  }

  // Si encontramos el producto, lo mostramos
  return (
    <div className="container mx-auto px-6 py-10">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex">
        <div className="relative md:w-1/2 h-96">
          <Image
            src={producto.image}
            alt={producto.title}
            fill
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority // Prioridad para la imagen principal de la página
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">{producto.title}</h1>
          <p className="text-gray-600 mb-2 capitalize">{producto.category}</p>
          <p className="text-2xl font-semibold text-blue-600 mb-6">${producto.price.toFixed(2)}</p>
          <p className="text-gray-800 leading-relaxed">{producto.description}</p>
        </div>
      </div>
    </div>
  );
}
