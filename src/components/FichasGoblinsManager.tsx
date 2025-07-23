import { useState, useEffect } from "react";
import type { FichaGoblin } from "../types/FichaGoblin";
import FichaForm from "./FichaForm/FichaForm";
import FichasGoblinsList from "./FichasGoblinsList/FichasGoblinsList";

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

export default function FichasGoblinsManager() {
  const [fichas, setFichas] = useState<FichaGoblin[]>([]);
  const [fichaAtual, setFichaAtual] = useState<FichaGoblin>(fichaInicial);
  const [editando, setEditando] = useState<number | null>(null);

  useEffect(() => {
    const armazenadas = localStorage.getItem("fichas");
    if (armazenadas) setFichas(JSON.parse(armazenadas));
  }, []);

  useEffect(() => {
    localStorage.setItem("fichas", JSON.stringify(fichas));
  }, [fichas]);

  useEffect(() => {
    const armazenadas = localStorage.getItem("fichas");
    if (armazenadas) {
      setFichas(JSON.parse(armazenadas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fichas", JSON.stringify(fichas));
  }, [fichas]);

  const handleSubmit = () => {
    if (editando !== null) {
      const novas = [...fichas];
      novas[editando] = fichaAtual;
      setFichas(novas);
      setEditando(null);
    } else {
      setFichas([...fichas, fichaAtual]);
    }
    setFichaAtual(fichaInicial);
  };

  const handleEditar = (index: number) => {
    setFichaAtual(fichas[index]);
    setEditando(index);
  };

  const handleExcluir = (index: number) => {
    if (confirm("Deseja excluir esta ficha?")) {
      setFichas(fichas.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <FichaForm
        ficha={fichaAtual}
        onChange={setFichaAtual}
        onSubmit={handleSubmit}
        editando={editando !== null}
      />
      <FichasGoblinsList
        fichas={fichas}
        onEditar={handleEditar}
        onExcluir={handleExcluir}
      />
    </div>
  );
}
