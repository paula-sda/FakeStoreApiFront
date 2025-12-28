import { NextResponse } from "next/server";

export interface Producto {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export async function GET() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) {
      return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 });
    }
    const data: Producto[] = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 });
  }
}
