import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CloudUpload,
  FileSpreadsheet,
  HelpCircle,
  LockKeyhole,
  Mail,
  MapPin,
  Moon,
  Pencil,
  Plane,
  Sun,
  UserRound,
} from "lucide-react";
import { getAirportCity, importSchedule } from "../importers";
import { Button, Input, LaPrograMark } from "../components/shared";
import { supabase } from "../lib/supabaseClient";
import { saveProfile, saveScheduleEvents } from "../lib/scheduleService";

export function Login({ onContinue, theme, setTheme }) {
  const [mode, setMode] = useState("signIn");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [authError, setAuthError] = useState("");
  const submit = async () => {
    setTouched(true);
    setAuthError("");
    if (!email || !password) return;
    setLoading(true);
    const { error } =
      mode === "signIn"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setAuthError(error.message);
      return;
    }
    onContinue();
  };
  const continueWithGoogle = () => {
    supabase.auth.signInWithOAuth({ provider: "google" });
  };
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F5F6F8] text-slate-950 dark:bg-[#090B10] dark:text-white">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <LaPrograMark />
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="grid h-11 w-11 place-items-center rounded-full text-slate-600 hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-300 dark:hover:bg-white/10"
          aria-label="Cambiar tema"
        >
          {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
        </button>
      </header>
      <main className="relative mx-auto grid min-h-[calc(100vh-82px)] max-w-6xl items-center px-5 pb-10 md:grid-cols-2 md:gap-16 md:px-8">
        <section className="hidden md:block">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Tu programación, más clara
          </div>
          <h1 className="max-w-lg text-5xl font-semibold leading-[1.02] tracking-[-0.05em]">
            Tu calendario laboral y el de tu gente, en un solo lugar.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            Importa tu programación, entiende cada actividad de un vistazo y
            encuentra coincidencias sin complicaciones.
          </p>
          <div
            className="mt-10 grid max-w-md grid-cols-7 gap-2 opacity-90"
            aria-hidden="true"
          >
            {[...Array(21)].map((_, i) => (
              <div
                key={i}
                className={`h-12 rounded-xl ${i === 9 || i === 10 ? "bg-emerald-400/80" : i === 4 || i === 16 ? "bg-violet-400/75" : "bg-white shadow-sm dark:bg-white/10"}`}
              />
            ))}
          </div>
        </section>
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto w-full max-w-[430px]"
        >
          <div className="mb-8 md:hidden">
            <h1 className="text-[34px] font-semibold leading-tight tracking-[-0.045em]">
              Bienvenido a<br />
              LaProgra.
            </h1>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Tu programación, siempre a mano.
            </p>
          </div>
          <div className="rounded-[26px] border border-black/[.06] bg-white/90 p-5 shadow-[0_18px_60px_rgba(20,23,28,.08)] backdrop-blur-xl dark:border-white/[.08] dark:bg-[#14171A]/90 md:p-7">
            <h2 className="text-2xl font-semibold tracking-[-0.035em]">
              {mode === "signIn" ? "Iniciar sesión" : "Crear cuenta"}
            </h2>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              Accede para consultar tu calendario.
            </p>
            <div className="mt-6 space-y-4">
              <Input
                label="Correo electrónico"
                icon={Mail}
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={touched && !email ? "Introduce tu correo" : ""}
              />
              <Input
                label="Contraseña"
                icon={LockKeyhole}
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={touched && !password ? "Introduce tu contraseña" : ""}
              />
              <div className="flex justify-end">
                <button className="text-sm font-semibold text-[#176BFF] hover:underline">
                  ¿Has olvidado tu contraseña?
                </button>
              </div>
              {authError && (
                <p className="text-sm font-medium text-red-600">{authError}</p>
              )}
              <Button onClick={submit} className="w-full">
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    {mode === "signIn" ? "Accediendo…" : "Creando cuenta…"}
                  </>
                ) : (
                  <>
                    Continuar <ArrowRight size={17} />
                  </>
                )}
              </Button>
            </div>
            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
              <span className="text-xs text-slate-400">o</span>
              <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
            </div>
            <Button variant="secondary" onClick={continueWithGoogle} className="w-full">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[13px] font-bold text-blue-600 shadow-sm">
                G
              </span>
              Continuar con Google
            </Button>
            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              {mode === "signIn" ? "¿Aún no tienes cuenta? " : "¿Ya tienes cuenta? "}
              <button
                onClick={() =>
                  setMode(mode === "signIn" ? "signUp" : "signIn")
                }
                className="font-semibold text-[#176BFF] hover:underline"
              >
                {mode === "signIn" ? "Crear cuenta" : "Iniciar sesión"}
              </button>
            </p>
          </div>
          <p className="mt-5 text-center text-xs leading-relaxed text-slate-400">
            Al continuar, aceptas las condiciones de uso y la política de
            privacidad.
          </p>
        </motion.section>
      </main>
    </div>
  );
}

function Stepper({ step }) {
  return (
    <div className="flex items-center gap-2" aria-label={`Paso ${step} de 3`}>
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className={`h-1.5 rounded-full transition-all ${n === step ? "w-8 bg-[#176BFF]" : n < step ? "w-4 bg-blue-300 dark:bg-blue-700" : "w-4 bg-slate-200 dark:bg-white/10"}`}
        />
      ))}
    </div>
  );
}

export function Onboarding({
  userId,
  onFinish,
  setProfile,
  setSchedule,
  setSchedulePeriod,
}) {
  const [step, setStep] = useState(1);
  const [airline, setAirline] = useState("Iberia");
  const [base, setBase] = useState("MAD");
  const [username, setUsername] = useState("");
  const [fileState, setFileState] = useState("idle");
  const [importError, setImportError] = useState("");
  const [importedCount, setImportedCount] = useState(0);
  const [importedPeriod, setImportedPeriod] = useState(null);
  const [parsedSchedule, setParsedSchedule] = useState(null);
  const fileRef = useRef(null);
  const processFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileState("loading");
    setImportError("");
    file
      .text()
      .then((text) => {
        const parsed = importSchedule(text, airline);
        setSchedule(parsed.events);
        setSchedulePeriod(parsed.period);
        setImportedPeriod(parsed.period);
        setImportedCount(Object.values(parsed.events).flat().length);
        setParsedSchedule(parsed.events);
        setTimeout(() => setFileState("success"), 1150);
      })
      .catch((error) => {
        console.error("No se pudo importar la programación", error);
        setImportError(
          error instanceof Error ? error.message : "No se pudo leer el archivo",
        );
        setFileState("idle");
      });
  };
  const next = async () => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    const profileData = {
      airline,
      base,
      baseCity: getAirportCity(base),
      username: username || "pedro",
    };
    setProfile(profileData);
    if (userId) {
      await saveProfile(userId, profileData);
      if (parsedSchedule) await saveScheduleEvents(userId, parsedSchedule);
    }
    onFinish();
  };
  return (
    <div className="min-h-screen bg-[#F5F6F8] text-slate-950 dark:bg-[#090B10] dark:text-white">
      <header className="mx-auto flex max-w-4xl items-center justify-between px-5 py-5 md:px-8">
        <LaPrograMark />
        <button className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
          <HelpCircle size={17} />
          <span className="hidden sm:inline">Ayuda</span>
        </button>
      </header>
      <main className="mx-auto flex max-w-2xl flex-col px-5 pb-12 pt-6 md:px-8 md:pt-14">
        <Stepper step={step} />
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.section
              key="step1"
              initial={{ opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              className="mt-9"
            >
              <p className="text-sm font-semibold text-[#176BFF]">
                Configura tu espacio
              </p>
              <h1 className="mt-2 text-[34px] font-semibold leading-tight tracking-[-0.045em] md:text-[42px]">
                Empecemos por lo básico.
              </h1>
              <p className="mt-3 max-w-lg text-slate-600 dark:text-slate-400">
                Estos datos ayudan a interpretar y organizar tu programación.
                Podrás cambiarlos más adelante.
              </p>
              <div className="mt-8 space-y-5 rounded-[24px] border border-black/[.06] bg-white p-5 shadow-sm dark:border-white/[.07] dark:bg-[#14171A] md:p-7">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Aerolínea
                  </span>
                  <div className="relative">
                    <Plane
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <select
                      value={airline}
                      onChange={(e) => setAirline(e.target.value)}
                      className="min-h-12 w-full appearance-none rounded-[14px] border border-black/10 bg-white pl-11 pr-10 text-[15px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-white/10 dark:bg-white/[.045] dark:focus:ring-blue-950"
                    >
                      <option>Iberia</option>
                      <option disabled>Más aerolíneas próximamente</option>
                    </select>
                  </div>
                </label>
                <Input
                  label="Base"
                  icon={MapPin}
                  value={base}
                  maxLength={3}
                  onChange={(e) =>
                    setBase(e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))
                  }
                  placeholder="MAD"
                  hint="Código IATA de 3 letras"
                />
                <Input
                  label="Nombre de usuario"
                  icon={UserRound}
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value.replace(/\s/g, "").toLowerCase())
                  }
                  placeholder="pedro"
                  hint="Será visible para tus amistades"
                />
              </div>
            </motion.section>
          )}
          {step === 2 && (
            <motion.section
              key="step2"
              initial={{ opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              className="mt-9"
            >
              <p className="text-sm font-semibold text-[#176BFF]">
                Primera importación
              </p>
              <h1 className="mt-2 text-[34px] font-semibold leading-tight tracking-[-0.045em] md:text-[42px]">
                Trae tu programación.
              </h1>
              <p className="mt-3 max-w-lg text-slate-600 dark:text-slate-400">
                Selecciona el archivo CSV recibido de Iberia. LaProgra
                interpretará las actividades reconocidas.
              </p>
              <input
                ref={fileRef}
                className="hidden"
                type="file"
                accept=".csv,text/csv"
                onChange={processFile}
              />
              <button
                onClick={() => fileRef.current?.click()}
                className={`mt-8 flex min-h-[245px] w-full flex-col items-center justify-center rounded-[24px] border-2 border-dashed p-7 text-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${fileState === "success" ? "border-emerald-300 bg-emerald-50/70 dark:border-emerald-800 dark:bg-emerald-950/20" : "border-slate-300 bg-white hover:border-blue-400 hover:bg-blue-50/30 dark:border-white/15 dark:bg-[#14171A] dark:hover:border-blue-700"}`}
              >
                {fileState === "idle" && (
                  <>
                    <div className="grid h-14 w-14 place-items-center rounded-[18px] bg-blue-50 text-[#176BFF] dark:bg-blue-950/60">
                      <CloudUpload size={26} />
                    </div>
                    <h2 className="mt-5 text-lg font-semibold">
                      Selecciona o arrastra tu CSV
                    </h2>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      Archivo de programación de Iberia · Máx. 10 MB
                    </p>
                  </>
                )}
                {fileState === "loading" && (
                  <>
                    <span className="h-11 w-11 animate-spin rounded-full border-[3px] border-blue-100 border-t-[#176BFF] dark:border-blue-950 dark:border-t-blue-400" />
                    <h2 className="mt-5 text-lg font-semibold">
                      Procesando programación…
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                      Descartando datos no necesarios
                    </p>
                  </>
                )}
                {fileState === "success" && (
                  <>
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white">
                      <Check size={27} />
                    </div>
                    <h2 className="mt-5 text-lg font-semibold">
                      Programación preparada
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      {importedCount}{" "}
                      {importedCount === 1
                        ? "actividad reconocida"
                        : "actividades reconocidas"}
                      {importedPeriod &&
                        ` · ${new Intl.DateTimeFormat("es-ES", { month: "long", year: "numeric" }).format(new Date(importedPeriod.year, importedPeriod.month - 1, 1))}`}
                    </p>
                    <span className="mt-4 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      Pulsa para sustituir el archivo
                    </span>
                  </>
                )}
              </button>
              <div className="mt-5 flex gap-3 rounded-[16px] bg-slate-100 p-4 text-sm text-slate-600 dark:bg-white/[.05] dark:text-slate-400">
                <LockKeyhole size={18} className="mt-0.5 shrink-0" />
                <p>
                  La columna{" "}
                  <strong className="text-slate-800 dark:text-slate-200">
                    Description
                  </strong>{" "}
                  se descarta por completo durante la importación y no se
                  conserva.
                </p>
              </div>
              {importError && (
                <p className="mt-4 rounded-[14px] bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:bg-red-950/30 dark:text-red-300">
                  {importError}
                </p>
              )}
            </motion.section>
          )}
          {step === 3 && (
            <motion.section
              key="step3"
              initial={{ opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-9"
            >
              <div className="grid h-16 w-16 place-items-center rounded-[22px] bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                <Check size={30} />
              </div>
              <h1 className="mt-6 text-[34px] font-semibold leading-tight tracking-[-0.045em] md:text-[42px]">
                Todo listo.
              </h1>
              <p className="mt-3 max-w-lg text-slate-600 dark:text-slate-400">
                Tu calendario ya está preparado. Las horas se muestran en
                horario local de Madrid.
              </p>
              <div className="mt-8 overflow-hidden rounded-[22px] border border-black/[.06] bg-white dark:border-white/[.07] dark:bg-[#14171A]">
                {[
                  [Plane, "Aerolínea", airline],
                  [
                    MapPin,
                    "Base",
                    `${getAirportCity(base) || base || "MAD"} (${base || "MAD"})`,
                  ],
                  [UserRound, "Usuario", `@${username || "pedro"}`],
                  [
                    FileSpreadsheet,
                    "Importación",
                    fileState === "success"
                      ? `${importedCount} ${importedCount === 1 ? "actividad" : "actividades"}`
                      : "Datos de demostración",
                  ],
                ].map(([Icon, label, value], i) => (
                  <div
                    key={label}
                    className={`flex items-center gap-4 px-5 py-4 ${i ? "border-t border-black/[.06] dark:border-white/[.07]" : ""}`}
                  >
                    <Icon size={18} className="text-slate-400" />
                    <span className="flex-1 text-sm text-slate-500">
                      {label}
                    </span>
                    <strong className="text-sm font-semibold">{value}</strong>
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
        <div className="mt-9 flex items-center justify-between">
          {step > 1 ? (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>
              <ArrowLeft size={17} />
              Atrás
            </Button>
          ) : (
            <span />
          )}
          <Button
            onClick={next}
            disabled={
              (step === 1 && (!base || base.length !== 3)) ||
              (step === 2 && fileState === "loading")
            }
          >
            {step === 3 ? "Ver mi calendario" : "Continuar"}
            <ArrowRight size={17} />
          </Button>
        </div>
      </main>
    </div>
  );
}
