import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TermsModal from "../components/TermsModal";
import { FaUserEdit } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Register() {
  const { register } = useAuth();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accept, setAccept] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg({});
    if (password !== confirm) return setMsg({ type: "error", text: "Passwords do not match." });
    if (!accept) return setMsg({ type: "error", text: "Please accept the Terms & Conditions." });

    try {
      setLoading(true);
      await register(email, password, confirm);
      setMsg({ type: "ok", text: "Registration successful! Redirecting to login…" });
      setTimeout(() => nav("/login"), 900);
    } catch (err) {
      const text = err?.response?.message || err?.message || "Registration failed.";
      setMsg({ type: "error", text });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen auth-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-neutral-900/100 rounded-[28px] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,.25)] p-6 md:p-8">

        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-[26px] font-semibold">
              Create<span className="text-neutral-300"> your account!</span> 
            </h1>
            <p className="text-sm text-neutral-400 mt-1">Sign up to unlock exclusive features.</p>
          </div>
          <div className="flex items-center gap-2">
            <img src="/assets/TBBzMH.svg" alt="Logo" className="h-10 w-40" />
          </div>
        </div>

        <div className="mt-4 border-t border-white/10" />


        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-3 lg:col-span-2">
              <div className="h-24 w-24 rounded-xl bg-neutral-800/60 border border-white/10 grid place-items-center">
                <FaUserEdit size={38} className="text-white/60" />
              </div>
            </div>
            <div className="col-span-12 md:col-span-9 lg:col-span-10">
              <label className="text-sm text-neutral-300">Full Name</label>
              <input
                type="text"
                className="mt-1 w-full rounded-xl bg-neutral-800 border border-white/10 p-3 outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-neutral-300">Username</label>
              <input
                type="text"
                className="mt-1 w-full rounded-xl bg-neutral-800 border border-white/10 p-3 outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-neutral-300">Email Address</label>
              <input
                type="email"
                className="mt-1 w-full rounded-xl bg-neutral-800 border border-white/10 p-3 outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Enter your full email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm text-neutral-300">Password</label>
              <input
                type="password"
                className="mt-1 w-full rounded-xl bg-neutral-800 border border-white/10 p-3 outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div>
              <label className="text-sm text-neutral-300">Confirm Password</label>
              <input
                type="password"
                className="mt-1 w-full rounded-xl bg-neutral-800 border border-white/10 p-3 outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={8}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <label className="flex items-center gap-3">
              <input
                id="terms"
                type="checkbox"
                className="size-5 rounded border-white/10 bg-neutral-800"
                checked={accept}
                onChange={(e) => setAccept(e.target.checked)}
              />
              <span className="text-sm text-neutral-300">
                I accept the{" "}
                <button type="button" className="underline" onClick={() => setShowTerms(true)}>
                  Terms &amp; Conditions
                </button>
              </span>
            </label>

            <div className="w-full md:col-start-2">
                <button
                    disabled={loading}
                    className="block w-full rounded-[14px] py-3 bg-white text-black font-semibold hover:opacity-90 disabled:opacity-60 transition flex items-center justify-center gap-2"
                >
                    Create Account
                    <FaArrowRightLong aria-hidden="true" className="mt-px" />
                </button>
            </div>


          </div>

          {msg?.text && (
            <div
              className={`p-3 rounded-xl border ${
                msg.type === "ok"
                  ? "text-emerald-300 bg-emerald-900/30 border-emerald-700/40"
                  : "text-red-400 bg-red-950/40 border-red-800/50"
              }`}
            >
              {msg.text}
            </div>
          )}
        </form>

        <div className="mt-5 border-t border-white/10" />

        <div className="mt-4 flex items-center justify-between text-sm text-neutral-400">
          <div>
            Already have an account?{" "}
            <Link className="text-white/90 underline hover:opacity-80" to="/login">
              Log in
            </Link>
          </div>
          <div>2025 © Demo Panel | FE</div>
        </div>

        <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />
      </div>
    </div>
  );
}
