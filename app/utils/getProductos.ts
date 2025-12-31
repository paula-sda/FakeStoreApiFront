
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
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
      },
    });

    if (!res.ok) {
      console.error("Error HTTP al obtener productos:", res.status);
      return []; // Devolver array vacío en lugar de lanzar error
    }

    const all = await res.json();
    return all;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return []; // Devolver array vacío en caso de error de red u otros
  }
}
