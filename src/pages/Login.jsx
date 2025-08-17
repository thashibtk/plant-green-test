import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaPaperPlane } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const from = useLocation().state?.from?.pathname || "/";

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await login(email, password);
      nav(from, { replace: true });
    } catch (err) {
      const msg = err?.response?.message || err?.message || "Login failed.";
      setError(msg);
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen auth-bg flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm bg-neutral-900/100 rounded-[32px] shadow-[0_10px_30px_rgba(0,0,0,.25)] p-8 md:p-10 border border-white/10">

        <div className="mb-6">
          <img src="/assets/TBBzMH.svg" alt="Logo" className="h-10 w-40" />
        </div>

        <h1 className="text-2xl font-medium">
          Log in <span className="text-neutral-300">to your account!</span>
        </h1>
        <p className="text-sm text-neutral-400 mt-1">Enter your email and password to login</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-neutral-300">Email</label>
            <div className="relative">
              <FaPaperPlane className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none" />
              <input
                type="email"
                className="mt-1 w-full rounded-xl bg-neutral-800 border border-white/10 p-3 pl-10 outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Enter email address.."
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-neutral-300">Password</label>
            <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none" />
              <input
                type="password"
                className="mt-1 w-full rounded-xl bg-neutral-800 border border-white/10 p-3 pl-10 outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Enter password.."
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-neutral-300 pt-1">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" className="size-4 rounded bg-neutral-800 border-white/10" />
              <span>Remember me</span>
            </label>
            <button type="button" className="opacity-80 hover:opacity-100">Forgot Password ?</button>
          </div>

          {error && (
            <div className="text-sm text-red-400 bg-red-950/40 border border-red-800/50 p-3 rounded-xl">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full rounded-2xl p-3 bg-white text-black font-semibold hover:opacity-90 disabled:opacity-60 transition"
          >
            {loading ? "Signing in…" : "Sign In to Account"}
          </button>

          <div className="my-4 border-t border-white/10" />
            <p className="text-center text-xs text-neutral-500">Don't have account?</p>



          <Link
            to="/register"
            className="block text-center w-full rounded-2xl p-3 border border-white/20 text-white/90 hover:bg-white/5 transition"
          >
            Create New Account
          </Link>
        </form>

        <p className="mt-6 text-center text-xs text-neutral-500">2025 © Demo Panel | FE</p>
      </div>
    </div>
  );
}
