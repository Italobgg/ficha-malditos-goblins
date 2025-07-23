/* import { useState, useEffect } from "react";

type FichaGoblin = {
  nome: string;
  ocupacao: string;
  descritor: string;
  caracteristica: string;
  nivel: number;
  combate: number;
  habilidade: number;
  nocao: number;
  equipamentos: string;
  vitalidade: number;
  ferimentos: string;
};

export default function FichaForm() {
  const fichaInicial: FichaGoblin = {
    nome: "",
    ocupacao: "",
    descritor: "",
    caracteristica: "",
    nivel: 1,
    combate: 0,
    habilidade: 0,
    nocao: 0,
    equipamentos: "",
    vitalidade: 3,
    ferimentos: "",
  };

  const [ficha, setFicha] = useState<FichaGoblin>(fichaInicial);
  const [fichas, setFichas] = useState<FichaGoblin[]>([]);
  const [editando, setEditando] = useState<number | null>(null);

  // Carregar fichas do localStorage ao iniciar
  useEffect(() => {
    const armazenadas = localStorage.getItem("fichas");
    if (armazenadas) setFichas(JSON.parse(armazenadas));
  }, []);

  // Salvar fichas no localStorage sempre que mudarem
  useEffect(() => {
    localStorage.setItem("fichas", JSON.stringify(fichas));
  }, [fichas]);

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
    setFicha({
      ...ficha,
      [name]: camposNumericos.includes(name) ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editando !== null) {
      const novas = [...fichas];
      novas[editando] = ficha;
      setFichas(novas);
      setEditando(null);
    } else {
      setFichas([...fichas, ficha]);
    }
    setFicha(fichaInicial);
  };

  const handleEditar = (index: number) => {
    setFicha(fichas[index]);
    setEditando(index);
  };

  const handleExcluir = (index: number) => {
    const confirmacao = confirm("Tem certeza que deseja excluir esta ficha?");
    if (!confirmacao) return;
    const novas = fichas.filter((_, i) => i !== index);
    setFichas(novas);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-4"
      >
        <h2 className="text-3xl font-bold text-green-700 text-center mb-4">
          {editando !== null ? "Editar Ficha" : "Criar Ficha de Maldito Goblin"}
        </h2>

        {[
          { label: "Nome", name: "nome" },
          { label: "Ocupação", name: "ocupacao" },
          { label: "Descritor", name: "descritor" },
          { label: "Característica", name: "caracteristica" },
        ].map((campo) => (
          <label key={campo.name} className="block">
            <span className="text-sm font-semibold">{campo.label}:</span>
            <input
              name={campo.name}
              value={(ficha as any)[campo.name]}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
        ))}

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
          {editando !== null ? "Atualizar Ficha" : "Criar Ficha"}
        </button>
      </form>

      {fichas.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Fichas Criadas</h3>
          {fichas.map((f, i) => (
            <div
              key={i}
              className="bg-gray-100 border border-gray-300 rounded-lg p-4 flex justify-between items-start"
            >
              <div>
                <h4 className="font-bold text-lg">{f.nome}</h4>
                <p className="text-sm">{f.ocupacao} - {f.descritor}</p>
                <p className="text-sm">Nível: {f.nivel}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditar(i)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleExcluir(i)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} */