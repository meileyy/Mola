import ThemeToggle from './ThemeToggle.jsx'

// Uygulama başlığı. Sağ tarafta tema değiştirme butonu bulunur.
export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="border-bottom mb-4">
      <div className="container py-3 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-collection-play fs-3 text-danger" aria-hidden="true"></i>
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
