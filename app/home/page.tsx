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

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/productos")
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.error(data.error);
          setProductos([]);
        } else {
          setProductos(data);
        }
      })
      .catch(err => {
        console.error(err);
        setProductos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Lista de Productos</h1>

      {loading ? (
        <p className="text-center text-gray-500">Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p className="text-center text-gray-500">No se pudieron cargar los productos</p>
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
