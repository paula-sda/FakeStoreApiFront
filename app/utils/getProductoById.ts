import { Producto } from './getProductos';

// Obtener un solo producto por su ID
export async function getProductoById(id: string): Promise<Producto | null> {
  try {
    console.log(`Iniciando fetch en servidor para producto ${id}...`);
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
      },
    });

    if (!res.ok) {
      console.error(`Error HTTP al obtener producto ${id}:`, res.status);
      return null;
    }

    const producto = await res.json();
    return producto;

  } catch (error) {
    console.error(`Error catastrófico en getProductoById para el id ${id}:`, error);
    return null;
  }
}
