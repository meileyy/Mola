// LocalStorage okuma/yazma SADECE bu dosyada yapılır.
// Böylece ileride depolama yöntemi değişirse tek yer güncellenir.

const STORAGE_KEY = 'mola'

/**
 * Kayıtları LocalStorage'dan okur.
 * @returns {import('../Interfaces/WatchItem.js').WatchItem[]}
 */
export function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const data = JSON.parse(raw)
    // Beklenmedik bir değer gelirse boş liste döndür (uygulama çökmesin)
    return Array.isArray(data) ? data : []
  } catch {
    // Bozuk JSON gibi durumlarda güvenli varsayılan
    return []
  }
}

/**
 * Kayıtları LocalStorage'a yazar.
 * @param {import('../Interfaces/WatchItem.js').WatchItem[]} items
 */
export function saveItems(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Depolama dolu/erişilemez olabilir; uygulamayı durdurmamak için sessiz geç
  }
}
