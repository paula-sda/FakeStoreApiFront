interface Props {
    title: string;
    description: string;
    price: number;
  }
  
  export default function ProductInfo({ title, description, price }: Props) {
    return (
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
  
          <p className="text-gray-700 leading-relaxed">
            {description}
          </p>
        </div>
  
        <div className="mt-6">
          <p className="text-3xl font-semibold text-violet-600">
            {price} €
          </p>
  
          <button className="mt-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-xl transition">
            Añadir al carrito
          </button>
        </div>
      </div>
    );
  }
  