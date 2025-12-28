export interface Producto {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// Total de productos disponibles
export async function getProductos(): Promise<Producto[]> {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Error al obtener total de productos");

  const all = await res.json();
  return all;
}
