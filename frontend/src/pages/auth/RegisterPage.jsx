import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    nationality: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const update = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setLocalError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.password
    ) {
      setLocalError("Please fill in all required fields.");
      return;
    }

    if (formData.password.length < 6) {
      setLocalError("Password must be at least 6 characters long.");
      return;
    }

    setSubmitting(true);
    setLocalError("");

    try {
      await register({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        phone: formData.phone.trim() || undefined,
        nationality: formData.nationality.trim() || undefined,
      });

      // Redirect to home as logged in guest
      navigate("/", { replace: true });
    } catch (err) {
      setLocalError(err.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
          <p className="eyebrow text-gold">Guest Registration</p>
          <h1 className="mt-1 font-serif text-[30px] font-medium tracking-wide text-charcoal">
            Join LuxuryStay
          </h1>
          <p className="mt-2 text-[13px] text-muted">
            Create an account to reserve suites and manage your stays
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="border border-charcoal/10 bg-white px-6 py-8 shadow-[0_20px_50px_rgba(23,23,23,0.06)] sm:px-10">
          {localError && (
            <div className="mb-6 flex items-start gap-3 border border-rose-200 bg-rose-50 p-3.5 text-rose-800">
              <ShieldAlert size={18} className="mt-0.5 shrink-0" />
              <p className="text-[13px] leading-snug">{localError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="First Name *"
                id="firstName"
                required
                value={formData.firstName}
                onChange={update("firstName")}
                placeholder="Elena"
              />
              <Input
                label="Last Name *"
                id="lastName"
                required
                value={formData.lastName}
                onChange={update("lastName")}
                placeholder="Moreau"
              />
            </div>

            <Input
              label="Email Address *"
              id="email"
              type="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={update("email")}
              placeholder="elena.moreau@email.com"
            />

            <Input
              label="Password *"
              id="password"
              type="password"
              required
              autoComplete="new-password"
              value={formData.password}
              onChange={update("password")}
              placeholder="Minimum 6 characters"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Phone Number"
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={update("phone")}
                placeholder="+92 300 1234567"
              />
              <Input
                label="Nationality"
                id="nationality"
                value={formData.nationality}
                onChange={update("nationality")}
                placeholder="e.g. Pakistani, British"
              />
            </div>

            <p className="text-[11px] text-muted">
              * Required fields. By registering, your account will be given guest privileges.
            </p>

            <Button
              type="submit"
              className="mt-2 w-full"
              disabled={submitting}
            >
              {submitting ? "Creating account..." : "Register Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-[13px] text-muted">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-charcoal underline underline-offset-4 transition-colors hover:text-gold"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
