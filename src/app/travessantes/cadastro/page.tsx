export default function CadastroPescadorPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Cadastro de Pescador</h1>
      <p className="mt-2 text-gray-700">
        Preencha os dados abaixo para realizar o cadastro profissional.
      </p>

      <form className="mt-6 space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Nome completo"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Documento (CPF ou RG)"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-900 text-white px-4 py-2 rounded"
        >
          Cadastrar
        </button>
      </form>
    </main>
  )
}
