export default function Footer() {
  return (
    <footer className="mt-16 bg-gray-100 border-t border-purple-100">
      <div className="max-w-6xl mx-auto px-6 py-6 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-purple-600">FakeStore</span> — Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
