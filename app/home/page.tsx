import CardProducto from "../components/CardProducto";
import { getProductos, Producto } from "../utils/getProductos";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let productos: Producto[] = [];
  let error = null;

  try {
    productos = await getProductos();
  } catch (err) {
    // El error ya se maneja y loggea dentro de getProductos
    // por lo que no es necesario un log adicional aquí.
    error = "Error al cargar los productos. Por favor, intente más tarde.";
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
