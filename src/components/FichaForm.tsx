import { useState } from "react";

type FichaGoblin = {
  nome: string;
  caracteristica: string;
  ocupacao: string;
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
    const numericFields = ["nivel", "combate", "habilidade", "nocao", "vitalidade"];
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
    <form onSubmit={handleSubmit} className="ficha-form">
      <h2>Ficha de Maldito Goblin</h2>

      <label>
        Nome:
        <input
          name="nome"
          value={ficha.nome}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Característica:
        <input
          name="caracteristica"
          value={ficha.caracteristica}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Ocupação:
        <input
          name="ocupacao"
          value={ficha.ocupacao}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Nível:
        <input
          name="nivel"
          type="number"
          value={ficha.nivel}
          onChange={handleChange}
          min={1}
        />
      </label>

      <h4>Atributos</h4>

      <label>
        Combate:
        <input
          name="combate"
          type="number"
          value={ficha.combate}
          onChange={handleChange}
          min={0}
          max={3}
        />
      </label>

      <label>
        Habilidade:
        <input
          name="habilidade"
          type="number"
          value={ficha.habilidade}
          onChange={handleChange}
          min={0}
          max={3}
        />
      </label>

      <label>
        Noção:
        <input
          name="nocao"
          type="number"
          value={ficha.nocao}
          onChange={handleChange}
          min={0}
          max={3}
        />
      </label>

      <h4>Equipamentos</h4>

      <label>
        Lista de Equipamentos:
        <textarea
          name="equipamentos"
          value={ficha.equipamentos}
          onChange={handleChange}
        />
      </label>

      <h4>Outros</h4>

      <label>
        Vitalidade:
        <input
          name="vitalidade"
          type="number"
          value={ficha.vitalidade}
          onChange={handleChange}
          min={1}
          max={3}
        />
      </label>

      <label>
        Ferimentos:
        <input
          name="ferimentos"
          value={ficha.ferimentos}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Criar Ficha</button>
    </form>
  );
}