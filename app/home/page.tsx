'use client';

import { useEffect, useState } from 'react';
import CardProducto from "../components/CardProducto";
import { Producto } from "../utils/getProductos";

async function fetchProductos(): Promise<Producto[]> {
  try {
    // Esta llamada ahora se hace desde el navegador del cliente
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) {
      console.error("Error al obtener los productos desde el cliente:", res.status);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error("Error en el fetch del cliente:", error);
    return [];
  }
}

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProductos().then(data => {
      if (data.length > 0) {
        setProductos(data);
      } else {
        setError("No se pudieron cargar los productos o no hay disponibles.");
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="text-center py-10">Cargando productos...</p>;
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Lista de Productos</h1>

      {productos.length === 0 ? (
        <p className="text-center text-gray-500">
          {error ? error : "No hay productos disponibles en este momento."}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {productos.map(p => (
            <CardProducto key={p.id} producto={p} />
          ))}
        </div>
      )}
    </main>
  );
}
