import { ref, watch } from 'vue'

type Theme = 'light' | 'dark'
type ThemeColors = {
  primary: string
  secondary: string
  background: string
  text: string
}

const STORAGE_KEY = 'christmas-theme'

const defaultThemes: Record<Theme, ThemeColors> = {
  light: {
    primary: '#e74c3c',
    secondary: '#2ecc71',
    background: '#f9f9f9',
    text: '#2c3e50'
  },
  dark: {
    primary: '#c0392b',
    secondary: '#27ae60',
    background: '#2c3e50',
    text: '#ecf0f1'
  }
}

export function useTheme() {
  const currentTheme = ref<Theme>(
    (localStorage.getItem(STORAGE_KEY) as Theme) || 'light'
  )
  
  const applyTheme = (theme: Theme) => {
    const colors = defaultThemes[theme]
    
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}-color`, value)
    })
    
    localStorage.setItem(STORAGE_KEY, theme)
  }
  
  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  }
  
  watch(currentTheme, (newTheme) => {
    applyTheme(newTheme)
  }, { immediate: true })
  
  return {
    currentTheme,
    toggleTheme
  }
} 