import { getStatusLabel, getStatusVariant, getTypeBadge } from '../utils/labels.js'

// Tek bir kaydı gösteren sunum bileşeni. Durum/tür metinleri elle yazılmaz,
// her zaman labels.js yardımcılarından gelir.
export default function WatchItemCard({ item, onEdit, onDelete }) {
  const typeBadge = getTypeBadge(item.type)

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2 gap-2">
          <span className={`badge ${typeBadge.className}`}>
            <i className={`bi ${typeBadge.icon} me-1`} aria-hidden="true"></i>
            {typeBadge.label}
          </span>
          <span className={`badge ${getStatusVariant(item.status)}`}>
            {getStatusLabel(item.type, item.status)}
          </span>
        </div>
        <h2 className="h5 card-title mb-1">{item.title}</h2>
        {item.note && (
          <p className="card-text text-secondary small mb-0">{item.note}</p>
        )}
        <div className="mt-auto pt-3 d-flex gap-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => onEdit(item)}
          >
            <i className="bi bi-pencil me-1" aria-hidden="true"></i>
            Düzenle
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(item)}
          >
            <i className="bi bi-trash me-1" aria-hidden="true"></i>
            Sil
          </button>
        </div>
      </div>
    </div>
  )
}
