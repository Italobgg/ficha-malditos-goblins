import type { FichaGoblin } from "../../types/FichaGoblin";
import FichaGoblinCard from "./FichaGoblinCard";

type Props = {
  fichas: FichaGoblin[];
  onEditar: (id: number) => void;
  onExcluir: (id: number) => void;
};

export default function FichasGoblinsList({ fichas, onEditar, onExcluir }: Props) {
  return (
    <div className="space-y-3 mt-6">
      <h3 className="text-xl font-semibold text-lime-200">Fichas Criadas</h3>
      {fichas.map((ficha) => (
        <FichaGoblinCard
          key={ficha.id}
          ficha={ficha}
          onEditar={() => onEditar(ficha.id)}
          onExcluir={() => onExcluir(ficha.id)}
        />
      ))}
    </div>
  );
}
