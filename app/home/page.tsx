"use client";

import { useEffect, useState } from "react";
import CardProducto from "../components/CardProducto";

export interface Producto {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function HomePage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const res = await fetch("/api/productos");
        const data = await res.json();

        if ("error" in data) {
          setError(data.error);
        } else {
          setProductos(data);
        }
      } catch (err) {
        setError("Error cargando productos");
      } finally {
        setLoading(false);
      }
    }

    fetchProductos();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Cargando productos…</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Lista de Productos</h1>

      {productos.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos disponibles</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {productos.map((producto) => (
            <CardProducto key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </main>
  );
}
