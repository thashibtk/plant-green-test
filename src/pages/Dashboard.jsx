import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaSearch,
  FaCog,
  FaCommentDots,
  FaBell,
  FaSignOutAlt,
  FaHome,
  FaLayerGroup,
  FaBuilding,
  FaBoxes,
  FaSitemap,
  FaCalendar,
  FaBox,
  
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const navItems = [
  { Icon: FaHome,        label: "Dashboard", to: "/" },
  { Icon: FaCalendar,    label: "Events",    to: "/events" },
  { Icon: FaLayerGroup,  label: "Modules",   to: "/modules" },
  { Icon: FaBuilding,    label: "Accounts",  to: "/accounts" },
  { Icon: FaBoxes,       label: "Inventory", to: "/inventory" },
  { Icon: FaCog,         label: "Settings",  to: "/settings" },

];


export default function Dashboard() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  function handleLogout() {
    logout();                      
    nav("/login", { replace: true }); 
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex">
      
      <aside className="w-16 bg-neutral-900 text-white flex flex-col items-center py-4">
        
        <div className="h-10 w-10 rounded-xl grid place-items-center">
          <img src="/assets/TBBzMHC.svg" alt="Logo" className="h-8 w-8" />
        </div>

        <nav className="mt-10 flex-1 flex flex-col gap-3">
            {navItems.map(({ Icon, label, to }) => (
            <NavLink
                key={label}
                to={to}
                end={to === "/"}                  
                title={label}
                aria-label={label}
                className={({ isActive }) =>
                `relative h-10 w-10 grid place-items-center rounded-xl transition
                    ${isActive
                    ? "bg-white text-neutral-900 shadow-[inset_0_0_0_1px_rgba(255,255,255,.2)]"
                    : "text-white/80 hover:bg-white/10"}`
                }
            >
                {({ isActive }) => (
                <>
                    <Icon />
                    <span
                    className={`absolute left-0 h-5 w-1 rounded-full bg-white transition-opacity
                        ${isActive ? "opacity-100" : "opacity-0"}`}
                    />
                </>
                )}
            </NavLink>
            ))}
        </nav>

        <button
          title="Sign out"
          onClick={handleLogout}
          className="mt-auto h-10 w-10 grid place-items-center rounded-xl hover:bg-white/10 text-rose-300/90 mb-1"
        >
          <FaSignOutAlt />
        </button>
      </aside>

      <div className="flex-1">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4">
          {/* Search */}
          <div className="relative hidden sm:block w-full max-w-sm">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              placeholder="Search Events...."
              className="w-3/5 pl-10 pr-3 py-2 rounded-lg border border-neutral-200 bg-neutral-100 text-sm shadow-sm outline-none focus:ring-2 focus:ring-neutral-200"
            />
          </div>

          {/* Actions */}
          <div className="ml-4 flex items-center gap-3">

            <span className="hidden lg:inline text-sm text-neutral-500 mx-1">
              {user?.email ? `Signed in as ${user.email}` : "Welcome!"}
            </span>

            <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-md border border-black bg-white text-sm font-semibold hover:bg-neutral-50">              
              New Client
              <FaHome />
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-900 text-white text-sm font-semibold hover:opacity-90">              
              New Work Order
              <FaBox />
            </button>

            <button className="h-10 w-10 grid place-items-center rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50">
              <FaCog />
            </button>
            <button className="h-10 w-10 grid place-items-center rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50">
              <FaCommentDots />
            </button>
            <button className="h-10 w-10 grid place-items-center rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50">
              <FaBell />
            </button>

            <div className=" bg-white">
              <img src="/assets/y9pT9l.png" alt="Logo" className="h-10 w-10 grid place-items-center rounded-xl" />
            </div>
          </div>
        </header>

        <main className="px-6 pb-10">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <FaSitemap />
            <span>Dashboard</span>
          </div>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Platform Dashboard</h1>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64 md:col-span-2 rounded-2xl bg-neutral-100 border border-neutral-200" />
            <div className="h-64 rounded-2xl bg-neutral-100 border border-neutral-200" />

            <div className="h-56 rounded-2xl bg-neutral-100 border border-neutral-200" />
            <div className="h-56 rounded-2xl bg-neutral-100 border border-neutral-200" />
            <div className="h-56 rounded-2xl bg-neutral-100 border border-neutral-200" />
          </div>
        </main>
      </div>
    </div>
  );
}
