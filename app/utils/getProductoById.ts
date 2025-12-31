export async function getProductoById(id: string) {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        cache: 'no-store',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
        },
      });
  
      // Si la respuesta no es correcta, lanzamos un error manejable
      if (!res.ok) {
        console.error("Error HTTP al obtener producto:", res.status);
        return null;
      }
  
      // Intentamos parsear el JSON
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error al obtener producto:", error);
      return null;
    }
  }
  