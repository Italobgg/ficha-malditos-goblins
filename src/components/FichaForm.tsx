import { useState } from "react";

type FichaGoblin = {
  nome: string;
  caracteristica: string;
  ocupacao: string;
  descritor: string;
  nivel: number;
  combate: number;
  habilidade: number;
  nocao: number;
  equipamentos: string;
  vitalidade: number;
  ferimentos: string;
};

export default function FichaForm() {
  const [ficha, setFicha] = useState<FichaGoblin>({
    nome: "",
    caracteristica: "",
    ocupacao: "",
    descritor: "",
    nivel: 1,
    combate: 0,
    habilidade: 0,
    nocao: 0,
    equipamentos: "",
    vitalidade: 3,
    ferimentos: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const numericFields = [
      "nivel",
      "combate",
      "habilidade",
      "nocao",
      "vitalidade",
    ];
    setFicha({
      ...ficha,
      [name]: numericFields.includes(name) ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Ficha criada:", ficha);
    alert("Ficha de Goblin criada com sucesso!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4"
    >
      <h2 className="text-3xl font-bold text-green-700 text-center mb-4">
        Ficha de Maldito Goblin
      </h2>

      <label className="block">
        <span className="text-sm font-semibold">Nome:</span>
        <input
          name="nome"
          value={ficha.nome}
          onChange={handleChange}
          required
          className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold">Característica:</span>
        <input
          name="caracteristica"
          value={ficha.caracteristica}
          onChange={handleChange}
          required
          className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold">Ocupação:</span>
        <input
          name="ocupacao"
          value={ficha.ocupacao}
          onChange={handleChange}
          required
          className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold">Nível:</span>
        <input
          name="nivel"
          type="number"
          value={ficha.nivel}
          onChange={handleChange}
          min={1}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md"
        />
      </label>

      <div>
        <h4 className="text-lg font-bold text-gray-700">Atributos</h4>
        <div className="grid grid-cols-3 gap-4 mt-2">
          {["combate", "habilidade", "nocao"].map((campo) => (
            <label key={campo} className="block">
              <span className="capitalize text-sm">{campo}:</span>
              <input
                name={campo}
                type="number"
                value={(ficha as any)[campo]}
                onChange={handleChange}
                min={0}
                max={3}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </label>
          ))}
        </div>
      </div>

      <label className="block">
        <span className="text-sm font-semibold">Equipamentos:</span>
        <textarea
          name="equipamentos"
          value={ficha.equipamentos}
          onChange={handleChange}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold">Vitalidade:</span>
        <input
          name="vitalidade"
          type="number"
          value={ficha.vitalidade}
          onChange={handleChange}
          min={1}
          max={3}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold">Ferimentos:</span>
        <input
          name="ferimentos"
          value={ficha.ferimentos}
          onChange={handleChange}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-all"
      >
        Criar Ficha
      </button>
    </form>
  );
}
