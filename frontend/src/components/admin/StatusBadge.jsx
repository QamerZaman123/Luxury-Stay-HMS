import Badge from "../common/Badge";

export default function StatusBadge({ status }) {
  return <Badge tone={status}>{status}</Badge>;
}
