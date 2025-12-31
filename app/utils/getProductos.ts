
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
    console.log("Iniciando fetch a fakestoreapi.com/products...");
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
      },
    });
    
    console.log(`Respuesta recibida. Status: ${res.status} ${res.statusText}`);

    if (!res.ok) {
      console.error("Error HTTP no 'ok' al obtener productos:", res.status);
      const errorBody = await res.text();
      console.error("Cuerpo de la respuesta de error:", errorBody);
      return [];
    }

    const responseBody = await res.text();
    console.log("Cuerpo de la respuesta (primeros 500 caracteres):", responseBody.substring(0, 500));

    if (!responseBody) {
        console.log("El cuerpo de la respuesta está vacío. Devolviendo array vacío.");
        return [];
    }
    
    const all = JSON.parse(responseBody);
    console.log(`Parseo JSON exitoso. Se encontraron ${all.length} productos.`);
    return all;

  } catch (error) {
    console.error("Error catastrófico en getProductos:", error);
    return [];
  }
}
