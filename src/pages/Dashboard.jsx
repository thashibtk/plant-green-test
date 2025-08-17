import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
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
  FaBars,
  FaTimes,
  FaUser,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  function handleLogout() {
    logout();                      
    nav("/login", { replace: true }); 
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-16 bg-neutral-900 text-white flex-col items-center py-4">
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

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <aside className="w-64 h-full bg-neutral-900 text-white p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <img src="/assets/TBBzMHC.svg" alt="Logo" className="h-8 w-8" />
                <span className="font-semibold">Dashboard</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="h-8 w-8 grid place-items-center rounded-lg hover:bg-white/10"
              >
                <FaTimes />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {navItems.map(({ Icon, label, to }) => (
                <NavLink
                  key={label}
                  to={to}
                  end={to === "/"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition
                      ${isActive
                      ? "bg-white text-neutral-900"
                      : "text-white/80 hover:bg-white/10"}`
                  }
                >
                  <Icon />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-white/20">
              <div className="flex items-center gap-3 px-3 py-2 text-sm text-white/70">
                <FaUser />
                <span className="truncate">{user?.email || "Guest"}</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-rose-300/90 mt-2"
              >
                <FaSignOutAlt />
                <span>Sign out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      <div className="flex-1">
        <header className="flex items-center justify-between px-4 md:px-6 py-4">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden h-10 w-10 grid place-items-center rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50"
            >
              <FaBars />
            </button>


            <div className="relative flex-1 max-w-sm">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm" />
              <input
                placeholder="Search Events...."
                className="w-3/5 pl-10 pr-3 py-2 rounded-lg border border-neutral-200 bg-neutral-100 text-sm shadow-sm outline-none focus:ring-2 focus:ring-neutral-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <span className="hidden xl:inline text-sm text-neutral-500">
              {user?.email ? `Signed in as ${user.email}` : "Welcome!"}
            </span>

            <div className="hidden sm:flex items-center gap-2">
              <button className="px-3 md:px-4 py-2 rounded-md border border-black bg-white text-xs md:text-sm font-semibold hover:bg-neutral-50 whitespace-nowrap">              
                New Client
                <FaHome className="ml-1 md:ml-2 inline" />
              </button>
              <button className="px-3 md:px-4 py-2 rounded-md bg-neutral-900 text-white text-xs md:text-sm font-semibold hover:opacity-90 whitespace-nowrap">              
                New Work Order
                <FaBox className="ml-1 md:ml-2 inline" />
              </button>
            </div>

            <div className="sm:hidden relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="h-10 w-10 grid place-items-center rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50"
              >
                <FaUser />
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 top-12 w-48 bg-white border border-neutral-200 rounded-lg shadow-lg z-40">
                  <div className="p-3 border-b border-neutral-200">
                    <p className="text-xs text-neutral-500 truncate">{user?.email || "Guest"}</p>
                  </div>
                  <div className="p-2">
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-50 rounded flex items-center gap-2">
                      <FaHome />
                      New Client
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-50 rounded flex items-center gap-2">
                      <FaBox />
                      New Work Order
                    </button>
                    <hr className="my-2" />
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-50 rounded flex items-center gap-2 text-rose-600"
                    >
                      <FaSignOutAlt />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Icon buttons */}
            <div className="hidden md:flex items-center gap-2">
              <button className="h-10 w-10 grid place-items-center rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50">
                <FaCog />
              </button>
              <button className="h-10 w-10 grid place-items-center rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50">
                <FaCommentDots />
              </button>
              <button className="h-10 w-10 grid place-items-center rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50">
                <FaBell />
              </button>
            </div>

            <div className="bg-white">
              <img src="/assets/y9pT9l.png" alt="Profile" className="h-10 w-10 rounded-xl object-cover" />
            </div>
          </div>
        </header>

        <main className="px-4 md:px-6 pb-10">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <FaSitemap />
            <span>Dashboard</span>
          </div>

          <h1 className="mt-2 text-2xl md:text-4xl font-semibold tracking-tight">Platform Dashboard</h1>

          <div className="sm:hidden flex gap-2 mt-4">
            <button className="flex-1 px-3 py-2 rounded-md border border-black bg-white text-sm font-semibold hover:bg-neutral-50">              
              <FaHome className="mr-2 inline" />
              New Client
            </button>
            <button className="flex-1 px-3 py-2 rounded-md bg-neutral-900 text-white text-sm font-semibold hover:opacity-90">              
              <FaBox className="mr-2 inline" />
              New Work Order
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="h-48 md:h-64 lg:col-span-2 rounded-2xl bg-neutral-100 border border-neutral-200" />
            <div className="h-48 md:h-64 rounded-2xl bg-neutral-100 border border-neutral-200" />

            <div className="h-48 md:h-56 rounded-2xl bg-neutral-100 border border-neutral-200" />
            <div className="h-48 md:h-56 rounded-2xl bg-neutral-100 border border-neutral-200" />
            <div className="h-48 md:h-56 rounded-2xl bg-neutral-100 border border-neutral-200" />
          </div>
        </main>
      </div>

      {showUserMenu && (
        <div 
          className="sm:hidden fixed inset-0 z-30" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
}