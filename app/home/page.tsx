import { getProductos, Producto } from "../utils/getProductos";
import CardProducto from "../components/CardProducto";

// 🔴 ESTA LÍNEA ES LA CLAVE
export const dynamic = "force-dynamic";

export default async function Home() {
  let productos: Producto[] = [];

  try {
    productos = await getProductos();
  } catch (error) {
    console.error("Error cargando productos:", error);
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Lista de Productos
      </h1>

      {productos.length === 0 ? (
        <p className="text-center text-gray-500">
          No se pudieron cargar los productos
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {productos.map((producto: Producto) => (
            <CardProducto key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </main>
  );
}
