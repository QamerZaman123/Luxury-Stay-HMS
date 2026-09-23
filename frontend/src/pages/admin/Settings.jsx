import { useState, useEffect } from "react";
import PageHeader from "../../components/admin/PageHeader";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import { useAuth } from "../../context/AuthContext";
import { userApi } from "../../services/api";
import { CheckCircle2, ShieldAlert } from "lucide-react";

const tabs = [
  { id: "hotel", label: "Hotel Information" },
  { id: "account", label: "Account Settings" },
  { id: "notifications", label: "Notification Settings" },
  { id: "system", label: "System Settings" },
];

export default function Settings() {
  const [tab, setTab] = useState("account");
  const { user, role, refreshUser } = useAuth();

  const [accountForm, setAccountForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [accountSuccess, setAccountSuccess] = useState("");
  const [accountError, setAccountError] = useState("");
  const [savingAccount, setSavingAccount] = useState(false);

  useEffect(() => {
    if (user) {
      setAccountForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    if (!user?._id) return;

    setSavingAccount(true);
    setAccountSuccess("");
    setAccountError("");

    try {
      const updates = {
        firstName: accountForm.firstName.trim(),
        lastName: accountForm.lastName.trim(),
      };
      if (accountForm.password) {
        updates.password = accountForm.password;
      }

      await userApi.update(user._id, updates);
      await refreshUser();
      setAccountSuccess("Account profile updated successfully.");
      setAccountForm((p) => ({ ...p, password: "" }));
    } catch (err) {
      setAccountError(err.message || "Failed to update account.");
    } finally {
      setSavingAccount(false);
    }
  };

  return (
    <div>
      <PageHeader title="Settings" description="Property, account, and system preferences." />
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="flex gap-2 overflow-x-auto border border-charcoal/8 bg-white p-2 lg:flex-col lg:overflow-visible">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`whitespace-nowrap px-4 py-2.5 text-left text-[12px] uppercase tracking-[0.12em] transition-colors ${
                tab === t.id ? "bg-charcoal text-ivory" : "text-muted hover:bg-ivory hover:text-charcoal"
              }`}
            >
              {t.label}
            </button>
          ))}
        </aside>

        <section className="border border-charcoal/8 bg-white p-6 md:p-8">
          {tab === "account" ? (
            <form className="grid max-w-xl gap-4" onSubmit={handleUpdateAccount}>
              <h3 className="font-serif text-[24px] text-charcoal">Account Settings</h3>

              {accountSuccess && (
                <div className="flex items-center gap-2 border border-emerald-200 bg-emerald-50 p-3 text-[13px] text-emerald-800">
                  <CheckCircle2 size={16} />
                  <span>{accountSuccess}</span>
                </div>
              )}

              {accountError && (
                <div className="flex items-center gap-2 border border-rose-200 bg-rose-50 p-3 text-[13px] text-rose-800">
                  <ShieldAlert size={16} />
                  <span>{accountError}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="First Name"
                  value={accountForm.firstName}
                  onChange={(e) =>
                    setAccountForm((p) => ({ ...p, firstName: e.target.value }))
                  }
                  required
                />
                <Input
                  label="Last Name"
                  value={accountForm.lastName}
                  onChange={(e) =>
                    setAccountForm((p) => ({ ...p, lastName: e.target.value }))
                  }
                  required
                />
              </div>

              <Input
                label="Email"
                value={accountForm.email}
                disabled
                className="opacity-75"
              />

              <Input
                label="Assigned Role"
                value={role ? role.toUpperCase() : "STAFF"}
                disabled
                className="opacity-75"
              />

              <Input
                label="New Password"
                type="password"
                placeholder="Leave blank to keep existing password"
                value={accountForm.password}
                onChange={(e) =>
                  setAccountForm((p) => ({ ...p, password: e.target.value }))
                }
              />

              <Button type="submit" className="mt-2 w-fit" disabled={savingAccount}>
                {savingAccount ? "Updating..." : "Update account"}
              </Button>
            </form>
          ) : null}

          {tab === "hotel" ? (
            <form className="grid max-w-xl gap-4" onSubmit={(e) => e.preventDefault()}>
              <h3 className="font-serif text-[24px] text-charcoal">Hotel Information</h3>
              <p className="text-[12px] text-muted italic">Hotel property profiles will sync with backend upon hotel inventory activation.</p>
              <Input label="Property name" defaultValue="LuxuryStay Hospitality" />
              <Input label="Address" defaultValue="18 Orchard Lane, Mayfair, London W1K" />
              <Input label="Phone" defaultValue="+44 20 7123 4567" />
              <Input label="Email" defaultValue="stay@luxurystay.com" />
              <Input label="Check-in time" defaultValue="15:00" />
              <Input label="Check-out time" defaultValue="11:00" />
              <Button className="mt-2 w-fit">Save hotel details</Button>
            </form>
          ) : null}

          {tab === "notifications" ? (
            <form className="grid max-w-xl gap-5" onSubmit={(e) => e.preventDefault()}>
              <h3 className="font-serif text-[24px] text-charcoal">Notification Settings</h3>
              {[
                "New reservations",
                "Check-in reminders",
                "Payment received",
                "Housekeeping alerts",
                "Maintenance requests",
                "Guest feedback",
              ].map((item) => (
                <label key={item} className="flex items-center justify-between border-b border-charcoal/8 py-3">
                  <span className="text-[14px] text-charcoal">{item}</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-gold" />
                </label>
              ))}
              <Button className="mt-2 w-fit">Save preferences</Button>
            </form>
          ) : null}

          {tab === "system" ? (
            <form className="grid max-w-xl gap-4" onSubmit={(e) => e.preventDefault()}>
              <h3 className="font-serif text-[24px] text-charcoal">System Settings</h3>
              <Select label="Currency" options={["USD", "GBP", "EUR"]} defaultValue="USD" />
              <Select label="Date format" options={["DD MMM YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]} />
              <Select label="Language" options={["English", "French"]} />
              <Select label="Timezone" options={["Europe/London", "UTC"]} />
              <Button className="mt-2 w-fit">Save system</Button>
            </form>
          ) : null}
        </section>
      </div>
    </div>
  );
}
