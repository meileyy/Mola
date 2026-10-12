import { useState, useEffect } from 'react'
import { loadItems, saveItems } from '../utils/storage.js'

// Ekle / listele / güncelle / sil mantığı SADECE bu hook'ta yaşar.
// Bileşenler veriye doğrudan dokunmaz; bu hook'u çağırır.
// Böylece ileride depolama değişse bile arayüz aynı kalır.
export function useWatchlist() {
  // Başlangıç değerini tembel (lazy) veriyoruz: loadItems yalnızca ilk render'da çalışsın
  const [items, setItems] = useState(loadItems)

  // Liste her değiştiğinde LocalStorage'a yaz
  useEffect(() => {
    saveItems(items)
  }, [items])

  // Yeni kayıt ekle: id ve createdAt'i burada üretiyoruz
  function addItem(item) {
    const newItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    // Yeni kayıt en üstte görünsün diye başa ekliyoruz
    setItems((prev) => [newItem, ...prev])
  }

  // Mevcut kaydı güncelle: sadece gelen alanları değiştir, id ve createdAt korunsun
  function updateItem(id, updatedData) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    )
  }

  // Kaydı sil
  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return { items, addItem, updateItem, removeItem }
}
