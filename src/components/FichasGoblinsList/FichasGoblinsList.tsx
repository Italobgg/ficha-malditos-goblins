import type { FichaGoblin } from "../../types/FichaGoblin";
import FichaGoblinCard from "./FichaGoblinCard";

type Props = {
  fichas: FichaGoblin[];
  onEditar: (index: number) => void;
  onExcluir: (index: number) => void;
};

export default function FichasGoblinsList({ fichas, onEditar, onExcluir }: Props) {
  if (fichas.length === 0) {
    return (
      <p className="text-center text-lime-300 mt-6 text-sm italic">
        Nenhuma ficha criada ainda...
      </p>
    );
  }

  return (
    <section className="mt-6">
      <h3 className="text-xl font-bold text-lime-400 mb-4 text-center sm:text-left">
        Fichas Criadas
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fichas.map((ficha, index) => (
          <FichaGoblinCard
            key={ficha.id ?? index}
            ficha={ficha}
            onEditar={() => onEditar(index)}
            onExcluir={() => onExcluir(index)}
          />
        ))}
      </div>
    </section>
  );
}