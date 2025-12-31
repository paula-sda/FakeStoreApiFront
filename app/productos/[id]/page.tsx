'use client'; // Clave: Convertimos la página de detalle en un Componente de Cliente

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Producto } from '../../utils/getProductos';

export default function ProductoDetallePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      // La petición se hace desde el NAVEGADOR del usuario, evitando el bloqueo
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          setProducto(data);
        })
        .catch(e => {
          console.error(`Error al obtener el producto ${id} desde el cliente:`, e);
          setError("No se pudo encontrar el producto.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <p className="text-center py-10">Cargando detalle del producto...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  if (!producto) {
    return <p className="text-center text-gray-500 py-10">Producto no encontrado.</p>;
  }

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
