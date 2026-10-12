// Açık/koyu tema geçiş butonu. Durumuna göre ikon ve erişilebilir ad değişir.
export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'
  // aria-label mevcut durumda yapılacak eylemi anlatır (tıklayınca ne olacağı)
  const label = isDark ? 'Açık temaya geç' : 'Koyu temaya geç'

  return (
    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={onToggle}
      aria-label={label}
      title={label}
    >
      <i className={`bi ${isDark ? 'bi-sun' : 'bi-moon-stars'}`} aria-hidden="true"></i>
    </button>
  )
}
