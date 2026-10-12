// Durum kodu ile ekranda görünen metin arasındaki eşleştirme SADECE burada yapılır.
// Kitaplar "izlenmez", okunur; o yüzden metin türe göre değişir.

const STATUS_LABELS = {
  movie: { planned: 'İzlenecek', 'in-progress': 'İzleniyor', done: 'İzlendi' },
  series: { planned: 'İzlenecek', 'in-progress': 'İzleniyor', done: 'İzlendi' },
  book: { planned: 'Okunacak', 'in-progress': 'Okunuyor', done: 'Okundu' },
}

/**
 * Türe ve duruma göre kullanıcıya gösterilecek durum metnini verir.
 * @param {'movie' | 'series' | 'book'} type
 * @param {'planned' | 'in-progress' | 'done'} status
 * @returns {string}
 */
export function getStatusLabel(type, status) {
  const byType = STATUS_LABELS[type]
  if (!byType) return status
  return byType[status] || status
}

// Her türün rozet metni, Bootstrap renk sınıfı ve ikonu (emoji yerine vektör ikon).
const TYPE_BADGES = {
  movie: { label: 'Film', className: 'text-bg-danger', icon: 'bi-film' },
  series: { label: 'Dizi', className: 'text-bg-primary', icon: 'bi-tv' },
  book: { label: 'Kitap', className: 'text-bg-success', icon: 'bi-book' },
}

/**
 * Tür rozetinin metnini, rengini ve ikon sınıfını verir.
 * @param {'movie' | 'series' | 'book'} type
 */
export function getTypeBadge(type) {
  return (
    TYPE_BADGES[type] || {
      label: type,
      className: 'text-bg-secondary',
      icon: 'bi-question-circle',
    }
  )
}

// Durum rozetinin rengi (türden bağımsız, sadece duruma göre).
const STATUS_VARIANTS = {
  planned: 'text-bg-secondary',
  'in-progress': 'text-bg-warning',
  done: 'text-bg-success',
}

/**
 * Durum rozetinin Bootstrap renk sınıfını verir.
 * @param {'planned' | 'in-progress' | 'done'} status
 * @returns {string}
 */
export function getStatusVariant(status) {
  return STATUS_VARIANTS[status] || 'text-bg-secondary'
}
