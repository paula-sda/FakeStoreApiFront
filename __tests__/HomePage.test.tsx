import { render, screen } from "@testing-library/react";
import HomePage from "../app/home/page"; // Ajusta según tu estructura
import React from "react";

// Mock de getProductos
jest.mock("../app/utils/getProductos", () => ({
  getProductos: jest.fn().mockResolvedValue([
    { id: "1", title: "Producto 1", price: 10, image: "/img1.png" },
    { id: "2", title: "Producto 2", price: 20, image: "/img2.png" },
  ]),
}));

describe("HomePage", () => {
  it("muestra los productos correctamente", async () => {
    const home = await HomePage();
    render(home);

    // findByText ya devuelve una promesa, así que usamos await
    expect(await screen.findByText("Producto 1")).toBeInTheDocument();
    expect(await screen.findByText("Producto 2")).toBeInTheDocument();
  });
});
