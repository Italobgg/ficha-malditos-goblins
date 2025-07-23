import type { FichaGoblin } from "../../types/FichaGoblin";

type Props = {
  ficha: FichaGoblin;
  onChange: (ficha: FichaGoblin) => void;
  onSubmit: () => void;
  editando: boolean;
};

export default function FichaForm({
  ficha,
  onChange,
  onSubmit,
  editando,
}: Props) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const camposNumericos = [
      "nivel",
      "combate",
      "habilidade",
      "nocao",
      "vitalidade",
    ];

    onChange({
      ...ficha,
      [name]: camposNumericos.includes(name) ? Number(value) : value,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="bg-zinc-900 shadow-xl rounded-2xl p-5 space-y-5 border border-lime-700 text-lime-300 mx-auto max-w-lg"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-lime-400 mb-4">
        {editando ? "Editar Ficha" : "Criar Ficha de Maldito Goblin"}
      </h2>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-lime-400">Dados Principais</h3>

        <label className="block">
          <span className="text-sm font-semibold text-lime-200 block mb-1">
            NOME:
          </span>
          <input
            name="nome"
            value={ficha.nome}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-lime-100 placeholder-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent"
          />
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-4">
          <label className="block">
            <span className="text-sm font-semibold text-lime-200 block mb-1">
              OCUPAÇÃO:
            </span>
            <input
              name="ocupacao"
              value={ficha.ocupacao}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-lime-100 placeholder-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-lime-200 block mb-1">
              DESCRITOR:
            </span>
            <input
              name="descritor"
              value={ficha.descritor}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-lime-100 placeholder-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent"
            />
          </label>
          <label className="block sm:col-span-2 lg:col-span-1">
            <span className="text-sm font-semibold text-lime-200 block mb-1">
              CARACTERÍSTICA:
            </span>
            <input
              name="caracteristica"
              value={ficha.caracteristica}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-lime-100 placeholder-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent"
            />
          </label>
        </div>
      </div>

      <hr className="border-lime-700 my-5" />

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-lime-400">Atributos e Nível</h3>

        <label className="block">
          <span className="text-sm font-semibold text-lime-200 block mb-1">
            NÍVEL:
          </span>
          <input
            name="nivel"
            type="number"
            value={ficha.nivel}
            onChange={handleChange}
            min={1}
            className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-lime-100 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent"
          />
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 gap-x-4">
          {["combate", "habilidade", "nocao", "vitalidade"].map((campo) => (
            <label key={campo} className="block">
              <span className="capitalize text-sm font-semibold text-lime-200 block mb-1">
                {campo === "nocao" ? "Noção" : campo}:
              </span>
              <input
                name={campo}
                type="number"
                value={(ficha as any)[campo]}
                onChange={handleChange}
                min={campo === "vitalidade" || campo === "nivel" ? 1 : 0}
                max={4}
                className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-lime-100 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent"
              />
            </label>
          ))}
        </div>
      </div>

      <hr className="border-lime-700 my-5" />

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-lime-400">
          Equipamentos e Ferimentos
        </h3>

        <label className="block">
          <span className="text-sm font-semibold text-lime-200 block mb-1">
            EQUIPAMENTOS:
          </span>
          <textarea
            name="equipamentos"
            value={ficha.equipamentos}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-lime-100 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-lime-200 block mb-1">
            FERIMENTOS:
          </span>
          <input
            name="ferimentos"
            value={ficha.ferimentos}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-lime-100 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent"
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 shadow-lg mt-6"
      >
        {editando ? "Atualizar Ficha" : "Criar Ficha"}
      </button>
    </form>
  );
}
