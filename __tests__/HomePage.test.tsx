import { render, screen } from "@testing-library/react";
import Home from "../app/home/page";

describe("Home", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        { id: 1, title: "Producto 1", price: 10, image: "/img1.png" },
        { id: 2, title: "Producto 2", price: 20, image: "/img2.png" },
      ],
    } as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("muestra los productos después de cargarlos", async () => {
    render(<Home />);

    // primero aparece el loading
    expect(screen.getByText("Cargando productos...")).toBeInTheDocument();

    // luego aparecen los productos
    expect(await screen.findByText("Producto 1")).toBeInTheDocument();
    expect(await screen.findByText("Producto 2")).toBeInTheDocument();
  });
});
