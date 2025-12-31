
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
    console.log("Iniciando fetch a fakestoreapi.com/products con User-Agent reforzado...");
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
      },
    });
    
    console.log(`Respuesta recibida. Status: ${res.status} ${res.statusText}`);

    if (!res.ok) {
      console.error("Error HTTP no 'ok' al obtener productos:", res.status);
      return [];
    }

    const all = await res.json();
    console.log(`Parseo JSON exitoso. Se encontraron ${all.length} productos.`);
    return all;

  } catch (error) {
    console.error("Error catastrófico en getProductos:", error);
    return [];
  }
}
