import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/common/Loading";
import Button from "../components/common/Button";

export default function RoleRoute({ allowedRoles = [] }) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory">
        <Loading message="Checking authorization..." />
      </div>
    );
  }

  const isAuthorized = allowedRoles.includes(role);

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-ivory px-4 text-center">
        <div className="max-w-md border border-charcoal/10 bg-white p-8 shadow-[0_20px_50px_rgba(23,23,23,0.06)]">
          <p className="eyebrow text-gold">403 Forbidden</p>
          <h2 className="mt-2 font-serif text-[26px] text-charcoal">Access Restricted</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">
            Your account ({user?.email}) has the role{" "}
            <span className="font-semibold text-charcoal">
              {role ? role.toUpperCase() : "UNASSIGNED"}
            </span>
            , which does not have permission to access this administrative portal.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/">
              <Button variant="outline">Return to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
