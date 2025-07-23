import type { FichaGoblin } from "../../types/FichaGoblin";

type Props = {
  ficha: FichaGoblin;
  onEditar: () => void;
  onExcluir: () => void;
};

export default function FichaGoblinCard({ ficha, onEditar, onExcluir }: Props) {
  return (
    <div className="bg-zinc-900 border border-lime-700 rounded-xl p-5 shadow-lg text-lime-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-20 h-20 bg-lime-800 opacity-10 rounded-br-full -z-10" />
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-lime-800 opacity-10 rounded-tl-full -z-10" />

      <div className="flex justify-between items-baseline mb-4 pb-2 border-b border-lime-600">
        <h4 className="text-2xl sm:text-3xl font-extrabold text-lime-300 leading-tight">
          {ficha.nome}
        </h4>
        <span className="text-xl font-bold text-lime-400 bg-zinc-700 px-3 py-1 rounded-full border border-lime-600 ml-4">
          Nv. {ficha.nivel}
        </span>
      </div>

      <div className="space-y-4">
        <h5 className="text-lg font-bold text-lime-400">Dados Principais</h5>
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-4 text-sm sm:text-base">
          <div>
            <dt className="font-semibold text-lime-200">Ocupação:</dt>
            <dd className="text-lime-100 ml-2">{ficha.ocupacao}</dd>
          </div>
          <div>
            <dt className="font-semibold text-lime-200">Descritor:</dt>
            <dd className="text-lime-100 ml-2">{ficha.descritor}</dd>
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <dt className="font-semibold text-lime-200">Característica:</dt>
            <dd className="text-lime-100 ml-2">{ficha.caracteristica}</dd>
          </div>
        </dl>
      </div>

      <hr className="border-lime-700 my-5" />

      <div className="space-y-4">
        <h5 className="text-lg font-bold text-lime-400">Atributos e Nível</h5>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 gap-x-4 mb-4 text-sm sm:text-base">
          {[
            { name: "Combate", value: ficha.combate },
            { name: "Habilidade", value: ficha.habilidade },
            { name: "Noção", value: ficha.nocao },
            { name: "Vitalidade", value: ficha.vitalidade },
          ].map((attr) => (
            <div key={attr.name} className="flex flex-col items-center">
              <span className="font-semibold text-lime-200 mb-1">{attr.name}:</span>
              <div className="flex gap-1">
                {Array.from({ length: attr.value }).map((_, i) => (
                  <span
                    key={i}
                    className="w-3 h-3 bg-lime-500 rounded-full border border-lime-700 shadow-sm"
                  />
                ))}
                {Array.from({ length: 3 - attr.value }).map((_, i) => (
                  <span
                    key={i}
                    className="w-3 h-3 bg-zinc-700 rounded-full border border-zinc-600 shadow-inner"
                  />
                ))}
              </div>
              <span className="text-lime-100 mt-1 font-bold">{attr.value}</span>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-lime-700 my-5" />

      <div className="space-y-4">
        <h5 className="text-lg font-bold text-lime-400">Equipamentos e Ferimentos</h5>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm sm:text-base">
          {ficha.ferimentos && (
            <div>
              <dt className="font-semibold text-red-400">Ferimentos:</dt>
              <dd className="text-red-300 ml-2 break-words">{ficha.ferimentos}</dd>
            </div>
          )}
          {ficha.equipamentos && (
            <div>
              <dt className="font-semibold text-lime-200">Equipamentos:</dt>
              <dd className="text-lime-100 ml-2 break-words">{ficha.equipamentos}</dd>
            </div>
          )}
          {!ficha.ferimentos && !ficha.equipamentos && (
            <p className="text-sm text-lime-200 col-span-full italic ml-2">
              Nenhum detalhe adicional.
            </p>
          )}
        </dl>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={onEditar}
          className="bg-yellow-500 hover:bg-yellow-600 text-zinc-900 font-bold px-4 py-2 rounded-md transition duration-200 ease-in-out transform hover:scale-105 shadow-md text-sm sm:text-base"
        >
          Editar
        </button>
        <button
          onClick={onExcluir}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md transition duration-200 ease-in-out transform hover:scale-105 shadow-md text-sm sm:text-base"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
