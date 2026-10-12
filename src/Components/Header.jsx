import ThemeToggle from './ThemeToggle.jsx'

// Uygulama başlığı. Sağ tarafta tema değiştirme butonu bulunur.
export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="app-header mb-4">
      <div className="container py-3 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <span className="mola-logo">
            <i className="bi bi-collection-play" aria-hidden="true"></i>
          </span>
          <div>
            <h1 className="h4 fw-bold mb-0 brand-title">Mola</h1>
            <small className="text-secondary">Film, Dizi &amp; Kitap Takip Listesi</small>
          </div>
        </div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  )
}
