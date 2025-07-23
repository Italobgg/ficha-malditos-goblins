import { useEffect, useState } from "react";
import FichaForm from "./FichaForm/FichaForm";
import FichasGoblinsList from "./FichasGoblinsList/FichasGoblinsList";
import type { FichaGoblin } from "../types/FichaGoblin"; 

const fichaInicial: FichaGoblin = {
  id: Date.now(), // Garante um ID único ao iniciar
  nome: "",
  ocupacao: "",
  descritor: "",
  caracteristica: "",
  nivel: 1,
  combate: 0,
  habilidade: 0,
  nocao: 0,
  equipamentos: "",
  vitalidade: 1,
  ferimentos: "",
};

export default function FichasGoblinsManager() {
  const [fichas, setFichas] = useState<FichaGoblin[]>([]);
  const [fichaAtual, setFichaAtual] = useState<FichaGoblin>(fichaInicial);
  const [editando, setEditando] = useState(false);

  // Carrega do localStorage
  useEffect(() => {
    const dadosSalvos = localStorage.getItem("fichasGoblin");
    if (dadosSalvos) {
      setFichas(JSON.parse(dadosSalvos));
    }
  }, []);

  // Salva no localStorage sempre que fichas mudar
  useEffect(() => {
    localStorage.setItem("fichasGoblin", JSON.stringify(fichas));
  }, [fichas]);

  // Manipulador de mudança de dados do formulário
  const handleChange = (novaFicha: FichaGoblin) => {
    setFichaAtual(novaFicha);
  };

  const handleCriarOuAtualizar = () => {
    if (editando) {
      setFichas((prev) =>
        prev.map((f) => (f.id === fichaAtual.id ? fichaAtual : f))
      );
    } else {
      setFichas((prev) => [...prev, { ...fichaAtual, id: Date.now() }]);
    }

    setFichaAtual({ ...fichaInicial, id: Date.now() });
    setEditando(false);
  };

  const handleEditar = (id: number) => {
    const ficha = fichas.find((f) => f.id === id);
    if (ficha) {
      setFichaAtual(ficha);
      setEditando(true);
    }
  };

  const handleExcluir = (id: number) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir esta ficha?");
    if (confirmar) {
      setFichas((prev) => prev.filter((f) => f.id !== id));
      if (fichaAtual.id === id) {
        setFichaAtual({ ...fichaInicial, id: Date.now() });
        setEditando(false);
      }
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <FichaForm
        ficha={fichaAtual}
        onChange={handleChange}
        onSubmit={handleCriarOuAtualizar}
        editando={editando}
      />
      <FichasGoblinsList
        fichas={fichas}
        onEditar={handleEditar}
        onExcluir={handleExcluir}
      />
    </div>
  );
}
