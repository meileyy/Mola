import { useEffect, useState } from 'react'

// Tema tercihi kayıtlardan AYRI bir anahtarda tutulur ('mola' anahtarına dokunulmaz).
const THEME_KEY = 'mola-theme'

// Kayıtlı geçerli bir tercih varsa onu, yoksa makul varsayılanı (açık) döndürür.
function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // localStorage erişilemezse varsayılana düş
  }
  return 'light'
}

// Tema durumu tek bir yerde (App) yönetilir; Bootstrap'in data-bs-theme'i <html>'e uygulanır.
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme)
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      // Yazılamazsa sessiz geç; uygulama çalışmaya devam etsin
    }
  }, [theme])

  function toggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme }
}
