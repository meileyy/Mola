import { useEffect, useId, useRef } from 'react'

// Silme gibi geri alınamaz işlemlerden önce gösterilen onay penceresi.
// Form modalıyla aynı deseni kullanır; sarmalayıcı (modal + backdrop) HomePage'tedir.
export default function ConfirmDialog({ title, onConfirm, onCancel }) {
  const uid = useId()
  const cancelRef = useRef(null)

  // Açılışta güvenli seçeneğe (Vazgeç) odaklan: Enter yanlışlıkla silmesin
  useEffect(() => {
    cancelRef.current?.focus()
  }, [])

  // Esc ile kapatma (klavye kullanımı)
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onCancel])

  return (
    <div
      className="modal-content"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby={`${uid}-title`}
      aria-describedby={`${uid}-desc`}
    >
      <div className="modal-header">
        <h2 className="modal-title h5" id={`${uid}-title`}>
          Kaydı Sil
        </h2>
        <button
          type="button"
          className="btn-close"
          aria-label="Kapat"
          onClick={onCancel}
        ></button>
      </div>
      <div className="modal-body">
        <p className="mb-0" id={`${uid}-desc`}>
          <strong>{title}</strong> kaydını silmek istediğinize emin misiniz? Bu
          işlem geri alınamaz.
        </p>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onCancel}
          ref={cancelRef}
        >
          Vazgeç
        </button>
        <button type="button" className="btn btn-danger" onClick={onConfirm}>
          Sil
        </button>
      </div>
    </div>
  )
}
