import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 });
  }
}
