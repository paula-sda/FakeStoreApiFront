'use client'; // Clave: Volvemos a un Componente de Cliente

import { useState, useEffect } from "react";
import CardProducto from "../components/CardProducto";
import { Producto } from "../utils/getProductos";

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // La petición se hace desde el NAVEGADOR del usuario, evitando el bloqueo
    fetch('https://fakestoreapi.com/products')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setProductos(data);
      })
      .catch(e => {
        console.error("Error al obtener productos desde el cliente:", e);
        setError("No se pudieron cargar los productos. Intenta recargar la página.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // El array vacío asegura que esto se ejecuta solo una vez

  if (loading) {
    return <p className="text-center py-10">Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Lista de Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productos.map(p => (
          <CardProducto key={p.id} producto={p} />
        ))}
      </div>
    </main>
  );
}
