import { FaExclamationTriangle } from 'react-icons/fa';

export default function ErrorComponent() {
  return (
    <div
      className="
        fixed inset-0
        flex flex-col items-center justify-center
        w-full min-h-screen
        bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 animate-gradient-move
        px-4 py-12
      "
    >
      <div className="flex items-center justify-center mb-6">
        <span className="inline-flex items-center justify-center rounded-full bg-red-100/80 p-6 shadow-lg">
          <FaExclamationTriangle
            size={48}
            className="text-red-500 animate-bounce"
          />
        </span>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-2 text-center drop-shadow">
        Ops! Algo deu errado.
      </h1>
      <p className="text-base md:text-lg text-gray-300 text-center max-w-md mb-4">
        Erro ao carregar os dados.<br />Por favor, tente novamente mais tarde.
      </p>
      <button
        className="mt-2 px-6 py-2 rounded-md bg-default text-white font-medium shadow hover:bg-default/90 transition"
        onClick={() => window.location.reload()}
      >
        Tentar novamente
      </button>
    </div>
  );
}
