import React from 'react';
import { render, screen } from '@testing-library/react';
import CardProducto from '../app/components/CardProducto';
import { Producto } from '../app/utils/getProductos';

// Mock del componente Link de Next.js para que no falle en el entorno de Jest
jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock del componente Image de Next.js
jest.mock('next/image', () => {
  // eslint-disable-next-line @next/next/no-img-element, react/display-name
  return ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />;
});

describe('CardProducto', () => {
  const mockProducto: Producto = {
    id: 1,
    title: 'Camiseta de prueba',
    price: 25.99,
    description: 'Una camiseta de algodón suave y cómoda.',
    category: 'ropa',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  };

  it('debe renderizar la información del producto correctamente', () => {
    render(<CardProducto producto={mockProducto} />);

    // Verifica que el título del producto está en el documento
    const titleElement = screen.getByText(mockProducto.title);
    expect(titleElement).toBeInTheDocument();

    // Verifica que el precio del producto está formateado y presente
    const priceElement = screen.getByText(`${mockProducto.price.toFixed(2)} €`);
    expect(priceElement).toBeInTheDocument();

    // Verifica que la imagen se muestra con el alt text correcto
    const imageElement = screen.getByAltText(mockProducto.title);
    expect(imageElement).toBeInTheDocument();
    // Y que tiene el src correcto
    expect(imageElement).toHaveAttribute('src', mockProducto.image);
  });

  it('el componente debe ser un enlace a la página del producto', () => {
    render(<CardProducto producto={mockProducto} />);

    // El componente entero está envuelto en un Link, por lo que buscamos el enlace
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/producto/${mockProducto.id}`);
  });
});
