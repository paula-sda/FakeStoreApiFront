import { getProductos, Producto } from "../utils/getProductos";
import CardProducto from "../components/CardProducto";

export default async function Home() {
  const productos = await getProductos();

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Lista de Productos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productos.map((producto: Producto) => (
          <CardProducto key={producto.id} producto={producto} />
        ))}
      </div>
    </main>
  );
}
