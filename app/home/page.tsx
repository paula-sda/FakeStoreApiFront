import CardProducto from "../components/CardProducto";
import { getProductos } from "../utils/getProductos";

// Esta página ahora se renderiza en el SERVIDOR
export default async function Home() {
  // Llamamos a la función directamente. Next.js se encarga del resto.
  const productos = await getProductos();

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Lista de Productos</h1>

      {/* 
        Si la API falla o no devuelve productos, el array estará vacío.
        Mostramos un mensaje amigable en ese caso.
      */}
      {productos.length === 0 ? (
        <p className="text-center text-gray-500">
          No se pudieron cargar los productos o no hay disponibles en este momento.
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
