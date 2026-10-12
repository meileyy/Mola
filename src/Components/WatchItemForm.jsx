import { useId, useState } from 'react'

// Filtre çubuğuyla aynı ortak etiketler kullanılsın diye seçenekler burada sabit.
const TYPE_OPTIONS = [
  { value: 'movie', label: 'Film' },
  { value: 'series', label: 'Dizi' },
  { value: 'book', label: 'Kitap' },
]

const STATUS_OPTIONS = [
  { value: 'planned', label: 'Planlanan' },
  { value: 'in-progress', label: 'Devam eden' },
  { value: 'done', label: 'Tamamlanan' },
]

// Hem ekleme hem düzenleme için kullanılır.
// initialItem verilirse düzenleme modundayız; alanlar o kayıttan dolar.
export default function WatchItemForm({ initialItem, onSubmit, onCancel }) {
  const isEdit = Boolean(initialItem)

  const [title, setTitle] = useState(initialItem?.title ?? '')
  const [type, setType] = useState(initialItem?.type ?? 'movie')
  const [status, setStatus] = useState(initialItem?.status ?? 'planned')
  const [note, setNote] = useState(initialItem?.note ?? '')
  const [error, setError] = useState('')

  // Aynı form birden fazla render edilse de alan id'leri çakışmasın
  const uid = useId()
  const titleId = `${uid}-title`
  const typeId = `${uid}-type`
  const statusId = `${uid}-status`
  const noteId = `${uid}-note`

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = title.trim()
    // Başlık en az bir harf veya rakam içermeli; yalnızca tire/boşluk/noktalama kabul edilmez.
    // \p{L} Unicode harf olduğu için Türkçe karakterler de geçerli sayılır.
    if (!/[\p{L}\p{N}]/u.test(trimmed)) {
      setError('Lütfen geçerli bir başlık girin.')
      return
    }
    // id ve createdAt'e dokunmuyoruz; hook yönetir (düzenlemede korunur)
    onSubmit({ title: trimmed, type, status, note: note.trim() })
  }

  return (
    <div
      className="modal-content"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${uid}-heading`}
    >
      <div className="modal-header">
        <h2 className="modal-title h5" id={`${uid}-heading`}>
          {isEdit ? 'Kaydı Düzenle' : 'Yeni Kayıt'}
        </h2>
        <button
          type="button"
          className="btn-close"
          aria-label="Kapat"
          onClick={onCancel}
        ></button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="modal-body">
          <div className="mb-3">
            <label htmlFor={titleId} className="form-label">
              Başlık <span className="text-danger">*</span>
            </label>
            <input
              id={titleId}
              type="text"
              className={`form-control ${error ? 'is-invalid' : ''}`}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (error) setError('')
              }}
              autoFocus
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor={typeId} className="form-label">
                Tür
              </label>
              <select
                id={typeId}
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-sm-6">
              <label htmlFor={statusId} className="form-label">
                Durum
              </label>
              <select
                id={statusId}
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-3">
            <label htmlFor={noteId} className="form-label">
              Not <span className="text-secondary">(isteğe bağlı)</span>
            </label>
            <textarea
              id={noteId}
              className="form-control"
              rows="2"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
            İptal
          </button>
          <button type="submit" className="btn btn-primary">
            Kaydet
          </button>
        </div>
      </form>
    </div>
  )
}
