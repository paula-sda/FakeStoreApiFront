"use client";
import { useEffect, useState } from "react";
import { Producto } from "../utils/getProductos";
import CardProducto from "../components/CardProducto";

type ApiResponse = Producto[] | { error: string };

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/productos")
      .then(res => res.json())
      .then((data: ApiResponse) => {
        if ("error" in data) {
          setError(data.error);
        } else {
          setProductos(data);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Lista de Productos</h1>

      {loading ? (
        <p className="text-center text-gray-500">Cargando productos...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : productos.length === 0 ? (
        <p className="text-center text-gray-500">No se encontraron productos</p>
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
