import { ArrowLeft, Plus, Users } from "lucide-react";
import { Button } from "../../components/shared";

export function CompareView({ onBack }) {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-8 lg:px-8 lg:pb-8">
      <button
        onClick={onBack}
        className="mb-6 grid h-10 w-10 place-items-center rounded-full text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/[.07]"
        aria-label="Volver al calendario"
      >
        <ArrowLeft size={20} />
      </button>
      <h1 className="text-3xl font-semibold tracking-[-0.04em]">Comparar</h1>
      <p className="mt-2 text-slate-500">
        Encuentra coincidencias con tus amistades.
      </p>
      <div className="mt-10 flex min-h-[360px] flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-white px-6 text-center dark:border-white/15 dark:bg-[#14171A]">
        <div className="grid h-14 w-14 place-items-center rounded-[18px] bg-blue-50 text-[#176BFF] dark:bg-blue-950/50">
          <Users size={25} />
        </div>
        <h2 className="mt-5 text-lg font-semibold">
          Todavía no has añadido a ninguna amistad.
        </h2>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-500">
          Cuando conectes con alguien, podrás ver aquí vuestros días y
          actividades coincidentes.
        </p>
        <Button className="mt-6">
          <Plus size={17} />
          Añadir amistad
        </Button>
      </div>
    </div>
  );
}
