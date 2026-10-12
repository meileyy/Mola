import Header from './Components/Header.jsx'
import HomePage from './Pages/HomePage.jsx'
import { useTheme } from './hooks/useTheme.js'

export default function App() {
  // Tema tek yerde (uygulamanın üstünde) yönetilir
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <HomePage />
    </>
  )
}
