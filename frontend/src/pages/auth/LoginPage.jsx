import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { ArrowLeft, Lock, Mail, ShieldAlert } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setLocalError("Please enter both email and password.");
      return;
    }

    setSubmitting(true);
    setLocalError("");

    try {
      const result = await login(email.trim(), password);
      const roleName = result.user?.role?.name || result.user?.role;
      const isStaffMember = [
        "admin",
        "manager",
        "receptionist",
        "housekeeping",
        "maintenance",
      ].includes(roleName);

      if (from) {
        navigate(from, { replace: true });
      } else if (isStaffMember) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      setLocalError(err.message || "Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  const setDemoCredentials = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setLocalError("");
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-ivory px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-charcoal"
        >
          <ArrowLeft size={14} /> Back to hotel site
        </Link>
        <div className="text-center">
          <p className="eyebrow text-gold">LuxuryStay Portal</p>
          <h1 className="mt-1 font-serif text-[30px] font-medium tracking-wide text-charcoal">
            Welcome Back
          </h1>
          <p className="mt-2 text-[13px] text-muted">
            Sign in to access your hotel management dashboard or guest account
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="border border-charcoal/10 bg-white px-6 py-8 shadow-[0_20px_50px_rgba(23,23,23,0.06)] sm:px-10">
          {localError && (
            <div className="mb-6 flex items-start gap-3 border border-rose-200 bg-rose-50 p-3.5 text-rose-800">
              <ShieldAlert size={18} className="mt-0.5 shrink-0" />
              <p className="text-[13px] leading-snug">{localError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Input
                label="Email Address"
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="name@luxurystay.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <Input
                label="Password"
                id="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={submitting}
            >
              {submitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 border-t border-charcoal/8 pt-5">
            <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
              Quick Select Credentials:
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  setDemoCredentials("admin@luxurystay.com", "AdminPassword123!")
                }
                className="border border-charcoal/12 bg-ivory/60 px-2.5 py-1 text-[11px] font-medium text-charcoal transition-colors hover:border-gold hover:bg-white"
              >
                Admin (System)
              </button>
              <button
                type="button"
                onClick={() =>
                  setDemoCredentials("ayesha.khan@luxurystay.com", "AdminPassword123!")
                }
                className="border border-charcoal/12 bg-ivory/60 px-2.5 py-1 text-[11px] font-medium text-charcoal transition-colors hover:border-gold hover:bg-white"
              >
                Admin (Seeded)
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-[13px] text-muted">
            New to LuxuryStay?{" "}
            <Link
              to="/register"
              className="font-medium text-charcoal underline underline-offset-4 transition-colors hover:text-gold"
            >
              Create guest account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
