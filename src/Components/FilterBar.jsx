import { useId } from 'react'

// Ortak etiketler: tüm türlere ve durumlara uyan filtre seçenekleri.
const TYPE_FILTERS = [
  { value: 'all', label: 'Tüm türler' },
  { value: 'movie', label: 'Film' },
  { value: 'series', label: 'Dizi' },
  { value: 'book', label: 'Kitap' },
]

const STATUS_FILTERS = [
  { value: 'all', label: 'Tüm durumlar' },
  { value: 'planned', label: 'Planlanan' },
  { value: 'in-progress', label: 'Devam eden' },
  { value: 'done', label: 'Tamamlanan' },
]

// Arama + tür + durum kontrolleri. Değerler yukarıdan (HomePage) yönetilir;
// bu bileşen yalnızca kullanıcı girdisini üst bileşene iletir.
export default function FilterBar({
  search,
  type,
  status,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onClear,
}) {
  const uid = useId()
  const searchId = `${uid}-search`
  const typeId = `${uid}-type`
  const statusId = `${uid}-status`

  return (
    <div className="row g-2 align-items-end mb-3">
      <div className="col-12 col-md-6 col-lg-5">
        <label htmlFor={searchId} className="form-label small mb-1">
          Ara
        </label>
        <div className="input-group">
          <span className="input-group-text" aria-hidden="true">
            <i className="bi bi-search"></i>
          </span>
          <input
            id={searchId}
            type="search"
            className="form-control"
            placeholder="Başlığa göre ara"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="col-6 col-md-3 col-lg-3">
        <label htmlFor={typeId} className="form-label small mb-1">
          Tür
        </label>
        <select
          id={typeId}
          className="form-select"
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          {TYPE_FILTERS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="col-6 col-md-3 col-lg-3">
        <label htmlFor={statusId} className="form-label small mb-1">
          Durum
        </label>
        <select
          id={statusId}
          className="form-select"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          {STATUS_FILTERS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="col-12 col-lg-1 d-grid">
        <button type="button" className="btn btn-outline-secondary" onClick={onClear}>
          Temizle
        </button>
      </div>
    </div>
  )
}
