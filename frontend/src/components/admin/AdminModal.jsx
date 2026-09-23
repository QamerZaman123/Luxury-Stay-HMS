import Modal from "../common/Modal";
import Button from "../common/Button";

export default function AdminModal({ open, title, onClose, children, onConfirm, confirmLabel = "Save" }) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {onConfirm ? (
            <Button onClick={onConfirm}>{confirmLabel}</Button>
          ) : null}
        </>
      }
    >
      {children}
    </Modal>
  );
}
