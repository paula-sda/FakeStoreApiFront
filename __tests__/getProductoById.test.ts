import { getProductoById } from '../app/utils/getProductoById';

// Mock global de fetch
global.fetch = jest.fn();
const mockFetch = global.fetch as jest.Mock;

describe('getProductoById', () => {
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

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProduct,
    } as Response);

    const product = await getProductoById('1');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://fakestoreapi.com/products/1',
      expect.any(Object)
    );

    expect(product).toEqual(mockProduct);
  });

  it('debe devolver null si la petición a la API falla (ej: 404)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const product = await getProductoById('999');

    expect(product).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
