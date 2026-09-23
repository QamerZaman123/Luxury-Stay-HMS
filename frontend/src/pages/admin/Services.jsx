import { useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import StatusBadge from "../../components/admin/StatusBadge";
import AdminModal from "../../components/admin/AdminModal";
import Button from "../../components/common/Button";
import { hotelServices } from "../../data/admin";
import { formatCurrency } from "../../utils/format";

export default function Services() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <PageHeader title="Services" description="Availability and pricing for guest services." />
      <div className="overflow-hidden border border-charcoal/8 bg-white">
        <table className="min-w-full text-left">
          <thead className="border-b border-charcoal/8 bg-ivory/70">
            <tr>
              {["Service", "Description", "Price", "Availability", "Actions"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hotelServices.map((s) => (
              <tr key={s.id} className="border-b border-charcoal/6 last:border-0">
                <td className="px-5 py-4 text-[13px] font-medium text-charcoal">{s.name}</td>
                <td className="max-w-sm px-5 py-4 text-[13px] text-muted">{s.description}</td>
                <td className="px-5 py-4 text-[13px] text-charcoal">
                  {s.price ? `${s.unit} ${formatCurrency(s.price)}` : s.unit}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={s.available ? "Active" : "Inactive"} />
                </td>
                <td className="px-5 py-4">
                  <Button variant="outline" size="sm" onClick={() => setSelected(s)}>
                    Manage
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminModal
        open={!!selected}
        title={selected?.name}
        onClose={() => setSelected(null)}
        onConfirm={() => setSelected(null)}
        confirmLabel="Update"
      >
        {selected ? <p>Toggle availability and pricing for {selected.name}. Changes are preview-only.</p> : null}
      </AdminModal>
    </div>
  );
}
