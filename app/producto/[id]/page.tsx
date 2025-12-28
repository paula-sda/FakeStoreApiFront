import { getProductoById } from "@/app/utils/getProductoById";
import ProductImage from "@/app/components/ProductImage";
import ProductInfo from "@/app/components/ProductInfo";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default async function ProductoPage({ params }: { params: { id: string } }) {
  const { id } = await params; // <-- mantenemos await como en tu código original
  const producto = await getProductoById(id);

  if (!producto) {
    return (
      <>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
          <h1 className="text-3xl font-bold text-red-600">Producto no encontrado</h1>
          <p className="text-gray-600 mt-2 text-center max-w-md">
            Parece que este producto no existe o no se pudo cargar.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-start pt-12">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-8">
          <ProductImage src={producto.image} alt={producto.title} />
          <ProductInfo
            title={producto.title}
            description={producto.description}
            price={producto.price}
          />
        </div>
      </div>
    </>
  );
}
