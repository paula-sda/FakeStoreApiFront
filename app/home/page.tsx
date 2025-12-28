'use client';

import { useEffect, useState } from "react";
import { getProductos, Producto } from "../utils/getProductos";
import CardProducto from "../components/CardProducto";

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarProductos() {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (err) {
        setError("No se pudieron cargar los productos");
        console.error(err);
      }
    }

    cargarProductos();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Lista de Productos
      </h1>

      {error && (
        <p className="text-center text-red-600 font-semibold">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productos.map((producto) => (
          <CardProducto key={producto.id} producto={producto} />
        ))}
      </div>
    </main>
  );
}
