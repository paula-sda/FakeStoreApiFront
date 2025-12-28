
import { getProductoById } from '../app/utils/getProductoById';

// Hacemos un mock global de la función fetch
global.fetch = jest.fn();

const mockFetch = global.fetch as jest.Mock;

describe('getProductoById', () => {
  // Limpiamos los mocks después de cada test para evitar interferencias
  afterEach(() => {
    mockFetch.mockClear();
  });

  it('debe devolver los datos del producto si la petición es exitosa', async () => {
    const mockProduct = {
      id: '1',
      title: 'Producto de prueba',
      price: 100,
      description: 'Descripción de prueba',
      category: 'Categoría de prueba',
      image: '/test-image.jpg',
    };

    // Simulamos una respuesta exitosa de la API
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProduct,
    } as Response);

    const product = await getProductoById('1');

    // Verificamos que se llamó a fetch con la URL correcta
    expect(mockFetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/1');
    // Verificamos que la función devuelve el producto esperado
    expect(product).toEqual(mockProduct);
  });

  it('debe devolver null si la petición a la API falla (ej: 404)', async () => {
    // Simulamos una respuesta de error de la API
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    // Ocultamos el console.error para no ensuciar la salida del test
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const product = await getProductoById('999'); // Un ID que no existe

    // Verificamos que la función devuelve null
    expect(product).toBeNull();
    // Verificamos que se registró un error en la consola
    expect(consoleErrorSpy).toHaveBeenCalled();

    // Restauramos console.error a su comportamiento original
    consoleErrorSpy.mockRestore();
  });
});
