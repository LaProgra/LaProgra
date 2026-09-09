import { useEffect, useState } from "react";
import { getAirportCity } from "./importers";
import { demoSchedule } from "./data/schedule";
import { Login, Onboarding } from "./screens/auth";
import {
  AppNav,
  CalendarView,
  CompareView,
  SettingsView,
} from "./screens/appViews";
import { supabase } from "./lib/supabaseClient";
import { loadProfile, loadScheduleEvents } from "./lib/scheduleService";

export default function App() {
  const [session, setSession] = useState(null);
  const [screen, setScreen] = useState("login");
  const [theme, setTheme] = useState("light");
  const [profile, setProfile] = useState({
    airline: "Iberia",
    base: "MAD",
    baseCity: getAirportCity("MAD"),
    username: "pedro",
  });
  const [schedule, setSchedule] = useState(demoSchedule);
  const [schedulePeriod, setSchedulePeriod] = useState({
    month: 9,
    year: 2026,
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
    });
    const { events, period } = await loadScheduleEvents(userId);
    setSchedule(events);
    if (period) setSchedulePeriod(period);
    setScreen("app");
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) hydrate(data.session.user.id);
    });
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        if (newSession) hydrate(newSession.user.id);
        else setScreen("login");
      },
    );
    return () => subscription.subscription.unsubscribe();
  }, []);

  const logout = () => supabase.auth.signOut();
  return (
    <div
      className={theme === "dark" ? "dark" : ""}
      style={{
        fontFamily:
          "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
      }}
    >
      <style>{`:root { color-scheme: light; } .dark { color-scheme: dark; } * { box-sizing: border-box; } button, input, select { font: inherit; } ::selection { background: rgba(23,107,255,.22); } @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } }`}</style>
      {screen === "login" && (
        <Login
          onContinue={() => setScreen("onboarding")}
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
          <AppNav active={active} setActive={setActive} desktop />
          <main className="lg:pl-[236px]">
            {active === "calendar" && (
              <CalendarView
                theme={theme}
                schedule={{ events: schedule, period: schedulePeriod }}
                showSlabTimes={showSlabTimes}
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
                showSlabTimes={showSlabTimes}
                setShowSlabTimes={setShowSlabTimes}
                onLogout={logout}
                onBack={() => setActive("calendar")}
              />
            )}
          </main>
          <AppNav active={active} setActive={setActive} />
        </div>
      )}
    </div>
  );
}
