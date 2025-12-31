"use client";

import { useEffect, useState } from "react";
import ProductImage from "@/app/components/ProductImage";
import ProductInfo from "@/app/components/ProductInfo";

// Define la estructura del objeto producto
interface Producto {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function ProductoPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProducto = async () => {
        try {
          const response = await fetch(`https://fakestoreapi.com/products/${id}`);
          if (!response.ok) {
            throw new Error(`Error HTTP al obtener producto ${id}: ${response.status}`);
          }
          const data = await response.json();
          setProducto(data);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Ocurrió un error desconocido");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchProducto();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <h1 className="text-3xl font-bold text-gray-800">Cargando...</h1>
        <p className="text-gray-600 mt-2 text-center max-w-md">
          Estamos preparando los detalles del producto.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <h1 className="text-3xl font-bold text-red-600">Error al cargar el producto</h1>
        <p className="text-gray-600 mt-2 text-center max-w-md">
          {error}
        </p>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <h1 className="text-3xl font-bold text-red-600">Producto no encontrado</h1>
        <p className="text-gray-600 mt-2 text-center max-w-md">
          Parece que este producto no existe o no se pudo cargar.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-start pt-12">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-8">
        <ProductImage src={producto.image} alt={producto.title} />
        <ProductInfo
          title={producto.title}
          description={producto.description}
          price={producto.price}
        />
      </div>
    </div>
  );
}