import { useEffect, useState } from "react";
import { getAirportCity, getAirportTimeZone } from "./importers";
import { Login, Onboarding } from "./screens/auth";
import {
  AppNav,
  CalendarView,
  CompareView,
  SettingsView,
} from "./screens/appViews";
import { supabase } from "./lib/supabaseClient";
import {
  loadProfile,
  loadScheduleEvents,
  deleteScheduleMonth,
  saveAdditionalScheduleEvents,
  saveProfile,
  syncSwiftairSchedule,
  deleteAccount as deleteAccountService,
} from "./lib/scheduleService";
import { getDisplayTimeZone } from "./lib/timeZone";

export default function App() {
  const [session, setSession] = useState(null);
  const [screen, setScreen] = useState("loading");
  const [passwordRecovery, setPasswordRecovery] = useState(() =>
    typeof window !== "undefined" && window.location.hash.includes("type=recovery"),
  );
  const [theme, setTheme] = useState("light");
  const [profile, setProfile] = useState({
    airline: "Iberia",
    base: "MAD",
    baseCity: getAirportCity("MAD"),
    username: "pedro",
    displayTimeZone: "base",
  });
  const [schedule, setSchedule] = useState({});
  const [schedulePeriod, setSchedulePeriod] = useState(() => {
    const now = new Date();
    return { month: now.getMonth() + 1, year: now.getFullYear() };
  });
  const [showSlabTimes, setShowSlabTimes] = useState(false);
  const [active, setActive] = useState("calendar");

  const hydrate = async (userId) => {
    const profileRow = await loadProfile(userId);
    if (!profileRow) {
      setScreen("onboarding");
      return;
    }
    setProfile({
      airline: profileRow.airline,
      base: profileRow.base,
      baseCity: profileRow.base_city,
      username: profileRow.username,
      displayTimeZone: profileRow.display_time_zone || "base",
    });
    const { events } = await loadScheduleEvents(userId);
    setSchedule(events);
    setScreen("app");
  };

  useEffect(() => {
    let recoveryDetected = passwordRecovery;
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        if (event === "PASSWORD_RECOVERY") {
          recoveryDetected = true;
          setPasswordRecovery(true);
          setSession(newSession);
          setScreen("login");
          return;
        }

        setSession(newSession);
        if (newSession) {
          if (recoveryDetected) {
            setScreen("login");
            return;
          }
          hydrate(newSession.user.id);
        } else {
          recoveryDetected = false;
          setPasswordRecovery(false);
          setScreen("login");
        }
      },
    );

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session && !recoveryDetected) hydrate(data.session.user.id);
      else if (recoveryDetected) setScreen("login");
      else setScreen("login");
    });
    return () => subscription.subscription.unsubscribe();
  }, [passwordRecovery]);

  const logout = () => supabase.auth.signOut();
  const deleteAccount = async () => {
    await deleteAccountService();
    setProfile({ airline: "Iberia", base: "MAD", baseCity: getAirportCity("MAD"), username: "pedro", displayTimeZone: "base" });
    setSchedule({});
    await supabase.auth.signOut();
  };
  const updateDisplayTimeZone = async (displayTimeZone) => {
    const nextProfile = { ...profile, displayTimeZone };
    setProfile(nextProfile);
    try {
      if (session?.user?.id) {
        await saveProfile(session.user.id, nextProfile);
      }
    } catch (error) {
      setProfile(profile);
      throw error;
    }
  };
  const addSchedule = async (newEvents, period) => {
    if (session?.user?.id) {
      await saveAdditionalScheduleEvents(session.user.id, newEvents);
    }
    const importedPeriods = new Set(
      Object.values(newEvents)
        .flat()
        .map((event) => `${event.year}-${event.month}`),
    );
    setSchedule((currentSchedule) => {
      const merged = {};
      Object.entries(currentSchedule).forEach(([day, events]) => {
        const retainedEvents = events.filter(
          (event) => !importedPeriods.has(`${event.year}-${event.month}`),
        );
        if (retainedEvents.length) merged[day] = retainedEvents;
      });
      Object.entries(newEvents).forEach(([day, events]) => {
        merged[day] = [...(merged[day] || []), ...events];
      });
      return merged;
    });
    if (period) setSchedulePeriod(period);
  };
  const syncSchedule = async (webcalUrl) => {
    if (!session?.user?.id) {
      throw new Error("Sesión no válida.");
    }
    const result = await syncSwiftairSchedule(webcalUrl);
    // La sincronización solo reemplaza los eventos futuros en la base de
    // datos, así que el estado local se recarga desde ahí (fuente de verdad).
    const { events } = await loadScheduleEvents(session.user.id);
    setSchedule(events);
    return result;
  };
  const deleteSchedule = async ({ month, year }) => {
    if (session?.user?.id) {
      await deleteScheduleMonth(session.user.id, month, year);
    }
    const nextPeriod = Object.values(schedule)
      .flat()
      .find(
        (event) =>
          event.month &&
          event.year &&
          (event.month !== month || event.year !== year),
      );
    setSchedule((currentSchedule) =>
      Object.fromEntries(
        Object.entries(currentSchedule)
          .map(([day, events]) => [
            day,
            events.filter(
              (event) => event.month !== month || event.year !== year,
            ),
          ])
          .filter(([, events]) => events.length),
      ),
    );
    if (
      schedulePeriod.month === month &&
      schedulePeriod.year === year &&
      nextPeriod
    ) {
      setSchedulePeriod({ month: nextPeriod.month, year: nextPeriod.year });
    }
  };
  const baseTimeZone = getAirportTimeZone(profile.base);
  const displayTimeZone = getDisplayTimeZone(
    profile.displayTimeZone,
    baseTimeZone,
  );
  return (
    <div
      className={theme === "dark" ? "dark" : ""}
      style={{
        fontFamily:
          "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
      }}
    >
      <style>{`:root { color-scheme: light; } .dark { color-scheme: dark; } * { box-sizing: border-box; } button, input, select { font: inherit; } ::selection { background: rgba(23,107,255,.22); } @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } }`}</style>
      {screen === "loading" && (
        <div className="min-h-screen bg-[#F5F6F8] dark:bg-[#090B10]" />
      )}{" "}
      {screen === "login" && (
        <Login
          onContinue={() => {}}
          initialMode={passwordRecovery ? "updatePassword" : "signIn"}
          theme={theme}
          setTheme={setTheme}
        />
      )}{" "}
      {screen === "onboarding" && (
        <Onboarding
          userId={session?.user?.id}
          onFinish={() => setScreen("app")}
          setProfile={setProfile}
          setSchedule={setSchedule}
          setSchedulePeriod={setSchedulePeriod}
        />
      )}{" "}
      {screen === "app" && (
        <div className="min-h-screen bg-[#F5F6F8] text-slate-950 dark:bg-[#090B10] dark:text-white">
          <AppNav
            active={active}
            setActive={setActive}
            desktop
            timeZonePreference={profile.displayTimeZone}
            baseIata={profile.base}
            onTimeZoneChange={updateDisplayTimeZone}
          />
          <main className="lg:pl-[236px]">
            {active === "calendar" && (
              <CalendarView
                theme={theme}
                profile={profile}
                schedule={{ events: schedule, period: schedulePeriod }}
                showSlabTimes={showSlabTimes}
                timeZone={displayTimeZone}
                onToggleSlabTimes={() =>
                  setShowSlabTimes((showTimes) => !showTimes)
                }
                onOpenSettings={() => setActive("settings")}
                onLogout={logout}
              />
            )}{" "}
            {active === "compare" && (
              <CompareView onBack={() => setActive("calendar")} />
            )}{" "}
            {active === "settings" && (
              <SettingsView
                theme={theme}
                setTheme={setTheme}
                profile={profile}
                setProfile={setProfile}
                schedule={schedule}
                onAddSchedule={addSchedule}
                onDeleteSchedule={deleteSchedule}
                onSyncSchedule={syncSchedule}
                userId={session?.user?.id}
                timeZonePreference={profile.displayTimeZone}
                baseIata={profile.base}
                onTimeZoneChange={updateDisplayTimeZone}
                onDeleteAccount={deleteAccount}
                onLogout={logout}
                onBack={() => setActive("calendar")}
              />
            )}
          </main>
          <AppNav
            active={active}
            setActive={setActive}
            timeZonePreference={profile.displayTimeZone}
            baseIata={profile.base}
            onTimeZoneChange={updateDisplayTimeZone}
          />
        </div>
      )}
    </div>
  );
}
