import CardProducto from "../components/CardProducto";
import { getProductos, Producto } from "../utils/getProductos";

export default async function Home() {
  let productos: Producto[] = [];
  let error = null;

  try {
    productos = await getProductos();
  } catch (err) {
    console.error(err);
    error = "No se pudieron cargar los productos";
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Lista de Productos</h1>

      {error ? (
        <p className="text-center text-gray-500">{error}</p>
      ) : productos.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos disponibles</p>
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
