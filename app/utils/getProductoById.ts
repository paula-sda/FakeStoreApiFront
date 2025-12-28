export async function getProductoById(id: string) {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  
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
  