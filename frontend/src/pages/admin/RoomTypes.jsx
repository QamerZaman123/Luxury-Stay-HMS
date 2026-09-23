import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import StatusBadge from "../../components/admin/StatusBadge";
import AdminModal from "../../components/admin/AdminModal";
import Button from "../../components/common/Button";
import { roomTypes } from "../../data/admin";
import { formatCurrency } from "../../utils/format";

export default function RoomTypes() {
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("view");

  return (
    <div>
      <PageHeader
        title="Room Types"
        description="Categories, capacity, and nightly rates for the house."
        actions={<Button>Add type</Button>}
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {roomTypes.map((type) => (
          <article key={type.id} className="flex flex-col border border-charcoal/8 bg-white p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-serif text-[26px] text-charcoal">{type.name}</h3>
                <p className="mt-1 text-[12px] uppercase tracking-[0.12em] text-muted">{type.rooms} rooms</p>
              </div>
              <StatusBadge status={type.status} />
            </div>
            <p className="mt-4 flex-1 text-[14px] font-light leading-relaxed text-muted">{type.description}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-charcoal/8 pt-5 text-[13px]">
              <div>
                <dt className="text-muted">Capacity</dt>
                <dd className="mt-1 text-charcoal">{type.capacity} guests</dd>
              </div>
              <div>
                <dt className="text-muted">From</dt>
                <dd className="mt-1 text-charcoal">{formatCurrency(type.price)}</dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {type.amenities.map((a) => (
                <span key={a} className="border border-charcoal/10 px-2 py-1 text-[11px] text-muted">
                  {a}
                </span>
              ))}
            </div>
            <div className="mt-6 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelected(type);
                  setMode("view");
                }}
              >
                <Eye size={13} /> View
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelected(type);
                  setMode("edit");
                }}
              >
                <Pencil size={13} /> Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  setSelected(type);
                  setMode("delete");
                }}
              >
                <Trash2 size={13} /> Delete
              </Button>
            </div>
          </article>
        ))}
      </div>
      <AdminModal
        open={!!selected}
        title={selected ? selected.name : ""}
        onClose={() => setSelected(null)}
        onConfirm={mode !== "view" ? () => setSelected(null) : undefined}
        confirmLabel={mode === "delete" ? "Delete type" : "Save"}
      >
        {selected && mode === "view" ? <p>{selected.description}</p> : null}
        {selected && mode === "edit" ? <p>Editing is a UI preview. Changes are not persisted.</p> : null}
        {selected && mode === "delete" ? (
          <p>Remove {selected.name} from the catalogue? Existing rooms of this type would need reassignment.</p>
        ) : null}
      </AdminModal>
    </div>
  );
}
