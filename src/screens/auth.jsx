import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CloudUpload,
  FileSpreadsheet,
  HelpCircle,
  Link2,
  TriangleAlert,
  LockKeyhole,
  Mail,
  MapPin,
  Moon,
  Pencil,
  Plane,
  Sun,
  UserRound,
  X,
} from "lucide-react";
import { getAirportCity, importSchedule } from "../importers";
import { Button, Input, LaPrograMark } from "../components/shared";
import { supabase } from "../lib/supabaseClient";
import {
  saveProfile,
  saveScheduleEvents,
  syncSwiftairSchedule,
} from "../lib/scheduleService";

export function Login({ onContinue, theme, setTheme, initialMode = "signIn" }) {
  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [touched, setTouched] = useState(false);
  const [authError, setAuthError] = useState("");

  const [confirmationSent, setConfirmationSent] = useState(false);
  const [recoverySent, setRecoverySent] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  /*
   * Detecta cuándo el usuario vuelve desde el enlace
   * de recuperación enviado por Supabase.
   */
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setMode("updatePassword");
        setRecoverySent(false);
        setPasswordUpdated(false);
        setTouched(false);
        setAuthError("");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const changeMode = (newMode) => {
    setMode(newMode);
    setTouched(false);
    setAuthError("");
    setLoading(false);
    setPasswordUpdated(false);

    if (newMode === "recover") {
      setPassword("");
    }

    if (newMode !== "updatePassword") {
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const submit = async () => {
    setTouched(true);
    setAuthError("");

    /*
     * SOLICITAR RECUPERACIÓN DE CONTRASEÑA
     */
    if (mode === "recover") {
      const normalizedEmail = email.trim();

      if (!normalizedEmail) {
        return;
      }

      setLoading(true);

      const { error } = await supabase.auth.resetPasswordForEmail(
        normalizedEmail,
        {
          redirectTo: window.location.origin,
        },
      );

      setLoading(false);

      if (error) {
        setAuthError(error.message);
        return;
      }

      setRecoverySent(true);
      return;
    }

    /*
     * GUARDAR LA NUEVA CONTRASEÑA
     */
    if (mode === "updatePassword") {
      if (!newPassword || !confirmPassword) {
        return;
      }

      if (newPassword.length < 8) {
        setAuthError("La nueva contraseña debe tener al menos 8 caracteres.");
        return;
      }

      if (newPassword !== confirmPassword) {
        setAuthError("Las contraseñas no coinciden.");
        return;
      }

      setLoading(true);

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      setLoading(false);

      if (error) {
        setAuthError(error.message);
        return;
      }

      setPasswordUpdated(true);
      setTouched(false);
      setNewPassword("");
      setConfirmPassword("");
      return;
    }

    /*
     * INICIO DE SESIÓN Y REGISTRO
     */
    const normalizedEmail = email.trim();

    if (!normalizedEmail || !password) {
      return;
    }

    setLoading(true);

    if (mode === "signIn") {
      const { error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      setLoading(false);

      if (error) {
        setAuthError(error.message);
        return;
      }

      onContinue();
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    setLoading(false);

    if (error) {
      setAuthError(error.message);
      return;
    }

    if (data.user && data.user.identities?.length === 0) {
      setAuthError("Ya existe una cuenta con ese correo. Inicia sesión.");
      return;
    }

    if (!data.session) {
      setConfirmationSent(true);
      return;
    }

    onContinue();
  };

  const continueWithGoogle = async () => {
    setAuthError("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      setAuthError(error.message);
    }
  };

  /*
   * PANTALLA DESPUÉS DE ENVIAR EL CORREO
   */
  if (recoverySent) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F5F6F8] px-5 text-slate-950 dark:bg-[#090B10] dark:text-white">
        <div className="mx-auto w-full max-w-[430px] rounded-[26px] border border-black/[.06] bg-white/90 p-7 text-center shadow-[0_18px_60px_rgba(20,23,28,.08)] backdrop-blur-xl dark:border-white/[.08] dark:bg-[#14171A]/90">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-blue-50 text-[#176BFF] dark:bg-blue-950/60">
            <Mail size={26} />
          </div>

          <h2 className="mt-5 text-2xl font-semibold tracking-[-0.035em]">
            Revisa tu correo
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Si existe una cuenta asociada a{" "}
            <strong className="text-slate-700 dark:text-slate-200">
              {email.trim()}
            </strong>
            , recibirás un enlace para cambiar tu contraseña.
          </p>

          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            Revisa también la carpeta de correo no deseado.
          </p>

          <Button
            variant="secondary"
            onClick={() => {
              setRecoverySent(false);
              changeMode("signIn");
            }}
            className="mt-6 w-full"
          >
            Volver a iniciar sesión
          </Button>
        </div>
      </div>
    );
  }

  /*
   * PANTALLA DESPUÉS DEL REGISTRO
   */
  if (confirmationSent) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F5F6F8] px-5 text-slate-950 dark:bg-[#090B10] dark:text-white">
        <div className="mx-auto w-full max-w-[430px] rounded-[26px] border border-black/[.06] bg-white/90 p-7 text-center shadow-[0_18px_60px_rgba(20,23,28,.08)] backdrop-blur-xl dark:border-white/[.08] dark:bg-[#14171A]/90">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-blue-50 text-[#176BFF] dark:bg-blue-950/60">
            <Mail size={26} />
          </div>

          <h2 className="mt-5 text-2xl font-semibold tracking-[-0.035em]">
            Confirma tu correo
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Hemos enviado un enlace de confirmación a{" "}
            <strong className="text-slate-700 dark:text-slate-200">
              {email.trim()}
            </strong>
            . Ábrelo para activar tu cuenta y continuar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F5F6F8] text-slate-950 dark:bg-[#090B10] dark:text-white">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <LaPrograMark />

        <button
          type="button"
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
            {[...Array(21)].map((_, index) => (
              <div
                key={index}
                className={`h-12 rounded-xl ${
                  index === 9 || index === 10
                    ? "bg-emerald-400/80"
                    : index === 4 || index === 16
                      ? "bg-violet-400/75"
                      : "bg-white shadow-sm dark:bg-white/10"
                }`}
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
              Bienvenido a
              <br />
              LaProgra.
            </h1>

            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Tu programación, siempre a mano.
            </p>
          </div>

          <div className="rounded-[26px] border border-black/[.06] bg-white/90 p-5 shadow-[0_18px_60px_rgba(20,23,28,.08)] backdrop-blur-xl dark:border-white/[.08] dark:bg-[#14171A]/90 md:p-7">
            <h2 className="text-2xl font-semibold tracking-[-0.035em]">
              {mode === "recover"
                ? "Recuperar contraseña"
                : mode === "updatePassword"
                  ? "Crear nueva contraseña"
                  : mode === "signIn"
                    ? "Iniciar sesión"
                    : "Crear cuenta"}
            </h2>

            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              {mode === "recover"
                ? "Introduce el correo utilizado en el registro."
                : mode === "updatePassword"
                  ? passwordUpdated
                    ? "La nueva contraseña se ha guardado."
                    : "Introduce y confirma tu nueva contraseña."
                  : mode === "signIn"
                    ? "Accede para consultar tu calendario."
                    : "Introduce un correo y contraseña para tu cuenta."}
            </p>

            <div className="mt-6 space-y-4">
              {mode !== "updatePassword" && (
                <Input
                  label="Correo electrónico"
                  icon={Mail}
                  type="email"
                  autoComplete="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setAuthError("");
                  }}
                  error={touched && !email.trim() ? "Introduce tu correo" : ""}
                />
              )}

              {mode !== "recover" && mode !== "updatePassword" && (
                <Input
                  label="Contraseña"
                  icon={LockKeyhole}
                  type="password"
                  autoComplete={
                    mode === "signIn" ? "current-password" : "new-password"
                  }
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setAuthError("");
                  }}
                  error={touched && !password ? "Introduce tu contraseña" : ""}
                />
              )}

              {mode === "updatePassword" && !passwordUpdated && (
                <>
                  <Input
                    label="Nueva contraseña"
                    icon={LockKeyhole}
                    type="password"
                    autoComplete="new-password"
                    placeholder="Mínimo 8 caracteres"
                    value={newPassword}
                    onChange={(event) => {
                      setNewPassword(event.target.value);
                      setAuthError("");
                    }}
                    error={
                      touched && !newPassword
                        ? "Introduce la nueva contraseña"
                        : touched && newPassword && newPassword.length < 8
                          ? "Debe tener al menos 8 caracteres"
                          : ""
                    }
                  />

                  <Input
                    label="Confirmar nueva contraseña"
                    icon={LockKeyhole}
                    type="password"
                    autoComplete="new-password"
                    placeholder="Repite la nueva contraseña"
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                      setAuthError("");
                    }}
                    error={
                      touched && !confirmPassword
                        ? "Confirma la nueva contraseña"
                        : touched &&
                            newPassword &&
                            confirmPassword &&
                            newPassword !== confirmPassword
                          ? "Las contraseñas no coinciden"
                          : ""
                    }
                  />
                </>
              )}

              {mode === "signIn" && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => changeMode("recover")}
                    className="text-sm font-semibold text-[#176BFF] hover:underline"
                  >
                    ¿Has olvidado tu contraseña?
                  </button>
                </div>
              )}

              {passwordUpdated && (
                <div className="rounded-[14px] bg-emerald-50 px-4 py-4 text-sm text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
                  <p className="font-semibold">
                    Contraseña actualizada correctamente
                  </p>

                  <p className="mt-1">
                    Ya puedes iniciar sesión con tu nueva contraseña.
                  </p>

                  <button
                    type="button"
                    onClick={async () => {
                      setLoading(true);
                      setAuthError("");

                      const { error } = await supabase.auth.signOut();

                      setLoading(false);

                      if (error) {
                        setAuthError(error.message);
                        return;
                      }

                      setPasswordUpdated(false);
                      setEmail("");
                      setPassword("");
                      changeMode("signIn");
                    }}
                    disabled={loading}
                    className="mt-3 font-semibold text-[#176BFF] hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? "Cerrando sesión…" : "Ir a iniciar sesión"}
                  </button>
                </div>
              )}

              {authError && (
                <p
                  role="alert"
                  className="rounded-[14px] bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:bg-red-950/30 dark:text-red-300"
                >
                  {authError}
                </p>
              )}

              {!passwordUpdated && (
                <Button onClick={submit} disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                      {mode === "recover"
                        ? "Enviando…"
                        : mode === "updatePassword"
                          ? "Actualizando…"
                          : mode === "signIn"
                            ? "Accediendo…"
                            : "Creando cuenta…"}
                    </>
                  ) : mode === "recover" ? (
                    "Recuperar"
                  ) : mode === "updatePassword" ? (
                    "Guardar nueva contraseña"
                  ) : mode === "signIn" ? (
                    <>
                      Continuar <ArrowRight size={17} />
                    </>
                  ) : (
                    "Registrar"
                  )}
                </Button>
              )}
            </div>

            {mode !== "recover" && mode !== "updatePassword" && (
              <>
                <div className="my-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />

                  <span className="text-xs text-slate-400">o</span>

                  <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
                </div>

                <Button
                  variant="secondary"
                  onClick={continueWithGoogle}
                  className="w-full"
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[13px] font-bold text-blue-600 shadow-sm">
                    G
                  </span>
                  Continuar con Google
                </Button>
              </>
            )}

            {mode !== "updatePassword" && (
              <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                {mode === "recover"
                  ? "¿Recuerdas tu contraseña? "
                  : mode === "signIn"
                    ? "¿Aún no tienes cuenta? "
                    : "¿Ya tienes cuenta? "}

                <button
                  type="button"
                  onClick={() => {
                    if (mode === "recover") {
                      changeMode("signIn");
                      return;
                    }

                    changeMode(mode === "signIn" ? "signUp" : "signIn");
                  }}
                  className="font-semibold text-[#176BFF] hover:underline"
                >
                  {mode === "recover"
                    ? "Iniciar sesión"
                    : mode === "signIn"
                      ? "Crear cuenta"
                      : "Iniciar sesión"}
                </button>
              </p>
            )}
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

function HelpStep({ number, title, children }) {
  return (
    <li className="flex gap-3">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-50 text-xs font-bold text-[#176BFF] dark:bg-blue-950/60 dark:text-blue-300">
        {number}
      </span>
      <div className="pt-0.5">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          {title}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {children}
        </p>
      </div>
    </li>
  );
}

function IberiaImportHelp() {
  return (
    <>
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        Descarga tu programación desde ibNet y selecciona el archivo CSV
        obtenido.
      </p>
      <ol className="mt-5 space-y-4">
        <HelpStep number="1" title="Accede a ibNet">
          Entra con tus credenciales habituales.
        </HelpStep>
        <HelpStep number="2" title="Abre Programación">
          Ve a <strong>Programación</strong> y selecciona la opción{" "}
          <strong>Outlook</strong>.
        </HelpStep>
        <HelpStep number="3" title="Descarga el archivo">
          Guarda el archivo de programación en formato CSV.
        </HelpStep>
        <HelpStep number="4" title="Impórtalo en LaProgra">
          Cierra esta ventana y pulsa “Selecciona o arrastra tu CSV”.
        </HelpStep>
      </ol>
      <div className="mt-5 flex gap-3 rounded-[14px] bg-slate-100 p-4 dark:bg-white/[.05]">
        <LockKeyhole size={18} className="mt-0.5 shrink-0 text-slate-400" />
        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          La columna <strong>Description</strong> se descarta durante la
          importación y no se conserva.
        </p>
      </div>
    </>
  );
}

function SwiftairImportHelp() {
  return (
    <>
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        Necesitas un dispositivo Apple para poder importar tu calendario de
        Swiftair.
      </p>
      <ol className="mt-5 space-y-4">
        <HelpStep number="1" title="Crea un calendario en Calendar">
          Abre la app{" "}
          <a
            href="https://www.icloud.com/calendar/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "inherit",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Calendar
          </a>{" "}
          de Apple y crea un calendario. Ejemplo: “Swiftair”.
        </HelpStep>
        <HelpStep number="2" title="Exporta tus eventos">
          <p>
            Abre <strong>eCrew</strong> en tu dispositivo Apple y ve a{" "}
            <strong>Settings</strong>.
          </p>

          <p className="mt-2">
            En <strong>Export to</strong>, selecciona el calendario que creaste
            previamente.
          </p>

          <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50/60 p-3 dark:border-blue-900/50 dark:bg-blue-950/30">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              Importante
            </p>

            <div className="mt-2 space-y-2 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-600 dark:text-slate-300">
                  AutoSync
                </span>
                <span className="rounded-md bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-950/50 dark:text-green-300">
                  ON
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-600 dark:text-slate-300">
                  Combined flights
                </span>
                <span className="rounded-md bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700 dark:bg-red-950/50 dark:text-red-300">
                  OFF
                </span>
              </div>
            </div>
          </div>
        </HelpStep>
        <HelpStep number="3" title="Copia el enlace">
          En{" "}
          <a
            href="https://www.icloud.com/calendar/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "inherit",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Calendar
          </a>{" "}
          selecciona el calendario que creaste previamente y hazlo público.
          Copia el enlace webcal proporcionado.
        </HelpStep>
        <HelpStep number="4" title="Pega aquí el enlace">
          Cierra esta ventana y luego pega el enlace. Después pulsa “Importa tu
          enlace webcal” para cargar los eventos.
        </HelpStep>
      </ol>
      <div className="mt-5 flex gap-3 rounded-[14px] bg-slate-100 p-4 dark:bg-white/[.05]">
        <TriangleAlert size={18} className="mt-0.5 shrink-0 text-slate-400" />
        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          Si el proceso se corrompe crea nuevamente otro calendario en{" "}
          <a
            href="https://www.icloud.com/calendar/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "inherit",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Calendar
          </a>{" "}
          con un nombre distinto y repite los pasos anteriores.
        </p>
      </div>
    </>
  );
}

export function Onboarding({
  userId,
  onFinish,
  onBackToLogin,
  setProfile,
  setSchedule,
  setSchedulePeriod,
}) {
  const [step, setStep] = useState(1);
  const [airline, setAirline] = useState("");
  const [base, setBase] = useState("");
  const [username, setUsername] = useState("");
  const [onboardingTouched, setOnboardingTouched] = useState(false);
  const [fileState, setFileState] = useState("idle");
  const [importError, setImportError] = useState("");
  const [importedCount, setImportedCount] = useState(0);
  const [importedPeriod, setImportedPeriod] = useState(null);
  const [parsedSchedule, setParsedSchedule] = useState(null);
  const [scheduleSavedByServer, setScheduleSavedByServer] = useState(false);
  const [webcalUrl, setWebcalUrl] = useState("");
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [leavingOnboarding, setLeavingOnboarding] = useState(false);

  const fileRef = useRef(null);

  useEffect(() => {
    if (!helpModalOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setHelpModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [helpModalOpen]);

  useEffect(() => {
    if (step !== 2) {
      setHelpModalOpen(false);
    }
  }, [step]);
  const showImportedSchedule = (parsed, savedByServer = false) => {
    const count = Object.values(parsed.events).flat().length;
    if (!count) {
      throw new Error("No se han encontrado actividades en la programación.");
    }
    setSchedule(parsed.events);
    setSchedulePeriod(parsed.period);
    setImportedPeriod(parsed.period);
    setImportedCount(count);
    setParsedSchedule(parsed.events);
    setScheduleSavedByServer(savedByServer);
    setTimeout(() => setFileState("success"), 1150);
  };
  const completeImport = (text) => {
    showImportedSchedule(importSchedule(text, airline));
  };
  const processFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileState("loading");
    setImportError("");
    file
      .text()
      .then((text) => {
        completeImport(text);
      })
      .catch((error) => {
        console.error("No se pudo importar la programación", error);
        setImportError(
          error instanceof Error ? error.message : "No se pudo leer el archivo",
        );
        setFileState("idle");
      });
  };
  const processWebcal = async () => {
    if (!webcalUrl.trim()) return;
    setFileState("loading");
    setImportError("");
    try {
      const sanitizedUrl = webcalUrl.trim().replace(/^webcal/i, "https");
      const data = await syncSwiftairSchedule(sanitizedUrl);
      showImportedSchedule(data, true);
    } catch (error) {
      console.error("No se pudo importar la programación de Swiftair", error);
      setImportError(
        error instanceof Error
          ? error.message
          : "No se ha podido leer el calendario.",
      );
      setFileState("idle");
    }
  };
  const exitOnboarding = async () => {
    if (leavingOnboarding) return;

    setLeavingOnboarding(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("No se pudo cerrar la sesión", error);
      setLeavingOnboarding(false);
      return;
    }

    if (onBackToLogin) {
      onBackToLogin();
      return;
    }

    window.location.reload();
  };

  const next = async () => {
    if (step === 1) {
      setOnboardingTouched(true);

      const isAirlineValid = airline.trim() !== "";
      const isBaseValid = base.trim().length === 3;
      const isUsernameValid = username.trim() !== "";

      if (!isAirlineValid || !isBaseValid || !isUsernameValid) {
        return;
      }
    }

    if (step < 3) {
      setStep(step + 1);
      return;
    }
    const profileData = {
      airline,
      base,
      baseCity: getAirportCity(base),
      username: username.trim(),
      displayTimeZone: "base",
    };
    setProfile(profileData);
    if (userId) {
      await saveProfile(userId, profileData);
      if (parsedSchedule && !scheduleSavedByServer) {
        await saveScheduleEvents(userId, parsedSchedule);
      }
    }
    onFinish();
  };
  return (
    <div className="min-h-screen bg-[#F5F6F8] text-slate-950 dark:bg-[#090B10] dark:text-white">
      <header className="mx-auto flex max-w-4xl items-center justify-between px-5 py-5 md:px-8">
        <LaPrograMark />
        <span />
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
                      onChange={(e) => {
                        setAirline(e.target.value);
                        setFileState("idle");
                        setImportError("");
                        setParsedSchedule(null);
                        setScheduleSavedByServer(false);
                        setImportedCount(0);
                        setImportedPeriod(null);
                      }}
                      className="min-h-12 w-full appearance-none rounded-[14px] border border-black/10 bg-white pl-11 pr-10 text-[15px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-white/10 dark:bg-white/[.045] dark:focus:ring-blue-950"
                    >
                      <option value="" disabled>
                        Selecciona una aerolínea
                      </option>
                      <option value="Iberia">Iberia</option>
                      <option value="Swiftair">Swiftair</option>
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
                  placeholder="ej. MAD"
                  hint="Código IATA de 3 letras"
                  error={
                    onboardingTouched && base.trim().length !== 3
                      ? "Introduce un código IATA de 3 letras"
                      : ""
                  }
                />
                <Input
                  label="Nombre de usuario"
                  icon={UserRound}
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value.replace(/\s/g, "").toLowerCase())
                  }
                  placeholder="ej. pedro"
                  hint="Será visible para tus amistades"
                  error={
                    onboardingTouched && !username.trim()
                      ? "Introduce un nombre de usuario"
                      : ""
                  }
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
              <div className="flex items-start justify-between gap-4">
                <h1 className="mt-2 text-[34px] font-semibold leading-tight tracking-[-0.045em] md:text-[42px]">
                  Trae tu programación.
                </h1>
                <button
                  type="button"
                  onClick={() => setHelpModalOpen(true)}
                  className="mt-1 flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-black/5 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                  aria-haspopup="dialog"
                  aria-expanded={helpModalOpen}
                  aria-controls="onboarding-import-help"
                >
                  <HelpCircle size={24} />
                  <span className="hidden sm:inline">Ayuda</span>
                </button>
              </div>
              <p className="mt-3 max-w-lg text-slate-600 dark:text-slate-400">
                {airline === "Swiftair" ? (
                  "Pega el enlace webcal de Swiftair. LaProgra interpretará los eventos de tu programación."
                ) : (
                  <>
                    Selecciona el archivo CSV que hay en{" "}
                    <strong>ibNet - Programación - Outlook</strong>. LaProgra
                    interpretará los eventos de tu programación.
                  </>
                )}
              </p>
              {airline === "Swiftair" && (
                <div className="mt-6">
                  <Input
                    label="Enlace webcal"
                    icon={Link2}
                    type="url"
                    value={webcalUrl}
                    onChange={(event) => setWebcalUrl(event.target.value)}
                    placeholder="webcal://…"
                    hint="Podrás cambiar el enlace en la configuración de LaProgra."
                  />
                </div>
              )}
              <input
                ref={fileRef}
                className="hidden"
                type="file"
                accept=".csv,text/csv"
                onChange={processFile}
              />
              <button
                onClick={() =>
                  airline === "Swiftair"
                    ? processWebcal()
                    : fileRef.current?.click()
                }
                disabled={
                  fileState === "loading" ||
                  (airline === "Swiftair" && !webcalUrl.trim())
                }
                className={`mt-8 flex min-h-[245px] w-full flex-col items-center justify-center rounded-[24px] border-2 border-dashed p-7 text-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-45 ${fileState === "success" ? "border-emerald-300 bg-emerald-50/70 dark:border-emerald-800 dark:bg-emerald-950/20" : "border-slate-300 bg-white hover:border-blue-400 hover:bg-blue-50/30 dark:border-white/15 dark:bg-[#14171A] dark:hover:border-blue-700"}`}
              >
                {fileState === "idle" && (
                  <>
                    <div className="grid h-14 w-14 place-items-center rounded-[18px] bg-blue-50 text-[#176BFF] dark:bg-blue-950/60">
                      <CloudUpload size={26} />
                    </div>
                    <h2 className="mt-5 text-lg font-semibold">
                      {airline === "Swiftair"
                        ? "Importa tu enlace webcal"
                        : "Selecciona o arrastra tu CSV"}
                    </h2>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      {airline === "Swiftair"
                        ? "Calendario de programación de Swiftair"
                        : "Archivo de programación de Iberia · Máx. 10 MB"}
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
                      {airline === "Swiftair"
                        ? "Pulsa para actualizar desde el enlace"
                        : "Pulsa para sustituir el archivo"}
                    </span>
                  </>
                )}
              </button>
              <div className="mt-5 flex gap-3 rounded-[16px] bg-slate-100 p-4 text-sm text-slate-600 dark:bg-white/[.05] dark:text-slate-400">
                <LockKeyhole size={18} className="mt-0.5 shrink-0" />
                <p>
                  {airline === "Swiftair" ? (
                    "El enlace se guarda para mantener tu programación actualizada automáticamente."
                  ) : (
                    <>
                      La columna{" "}
                      <strong className="text-slate-800 dark:text-slate-200">
                        Description
                      </strong>{" "}
                      se descarta por completo durante la importación y no se
                      conserva.
                    </>
                  )}
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
                Tu calendario ya está preparado. Por defecto, las horas se
                muestran en el huso horario de tu base.
              </p>
              <div className="mt-8 overflow-hidden rounded-[22px] border border-black/[.06] bg-white dark:border-white/[.07] dark:bg-[#14171A]">
                {[
                  [Plane, "Aerolínea", airline],
                  [MapPin, "Base", `${getAirportCity(base) || base} (${base})`],
                  [UserRound, "Usuario", `@${username}`],
                  [
                    FileSpreadsheet,
                    "Importación",
                    fileState === "success"
                      ? `${importedCount} ${importedCount === 1 ? "actividad" : "actividades"}`
                      : "Sin programación importada",
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
            <Button
              variant="ghost"
              onClick={exitOnboarding}
              disabled={leavingOnboarding}
            >
              <ArrowLeft size={17} />
              Atrás
            </Button>
          )}
          <Button
            onClick={next}
            disabled={
              (step === 1 &&
                (!airline.trim() ||
                  base.trim().length !== 3 ||
                  !username.trim())) ||
              (step === 2 &&
                (fileState === "loading" ||
                  (airline === "Swiftair" && !webcalUrl.trim())))
            }
          >
            {step === 3 ? "Ver mi calendario" : "Continuar"}
            <ArrowRight size={17} />
          </Button>
        </div>
      </main>

      {helpModalOpen && (
        <>
          <button
            type="button"
            onClick={() => setHelpModalOpen(false)}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
            aria-label="Cerrar ayuda de importación"
          />
          <div
            id="onboarding-import-help"
            role="dialog"
            aria-modal="true"
            aria-labelledby="onboarding-import-help-title"
            aria-describedby="onboarding-import-help-description"
            className="fixed inset-x-5 top-1/2 z-50 mx-auto flex max-h-[90vh] w-auto max-w-lg -translate-y-1/2 flex-col overflow-hidden rounded-[22px] border border-black/[.08] bg-white shadow-2xl dark:border-white/[.08] dark:bg-[#181B20]"
          >
            {/* Header */}
            <div className="flex shrink-0 items-start justify-between gap-4 p-6 pb-0">
              <div>
                <h2
                  id="onboarding-import-help-title"
                  className="mt-1 text-xl font-semibold"
                >
                  {airline === "Swiftair"
                    ? "Cómo obtener tu enlace webcal"
                    : "Cómo descargar tu programación"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setHelpModalOpen(false)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Cerrar ayuda"
              >
                <X size={18} />
              </button>
            </div>

            {/* Contenido con scroll */}
            <div
              id="onboarding-import-help-description"
              className="min-h-0 overflow-y-auto px-6 pt-5"
            >
              {airline === "Swiftair" ? (
                <SwiftairImportHelp />
              ) : (
                <IberiaImportHelp />
              )}
            </div>

            {/* Footer */}
            <div className="shrink-0 p-6 pt-4">
              <div className="flex justify-end">
                <Button onClick={() => setHelpModalOpen(false)}>
                  Entendido
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
