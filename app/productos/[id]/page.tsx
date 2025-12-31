'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Producto } from '../../utils/getProductos'; // Reutilizamos la interfaz

async function fetchProductoById(id: string): Promise<Producto | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) {
      console.error(`Error al obtener producto ${id}:`, res.status);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error(`Error en el fetch del producto ${id}:`, error);
    return null;
  }
}

export default function ProductoDetallePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchProductoById(id).then(data => {
        if (data) {
          setProducto(data);
        } else {
          setError("No se pudo encontrar el producto.");
        }
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
    return <p className="text-center text-gray-500 py-10">Producto no disponible.</p>;
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex">
        <div className="md:w-1/2">
          <Image
            src={producto.image}
            alt={producto.title}
            width={500}
            height={500}
            className="w-full h-full object-cover"
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
