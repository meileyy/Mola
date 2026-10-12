import { useState } from 'react'
import { useWatchlist } from '../hooks/useWatchlist.js'
import WatchItemCard from '../Components/WatchItemCard.jsx'
import WatchItemForm from '../Components/WatchItemForm.jsx'
import ConfirmDialog from '../Components/ConfirmDialog.jsx'
import FilterBar from '../Components/FilterBar.jsx'

// Tek sayfa. Ekleme ve düzenleme aynı modal + form ile yapılır.
export default function HomePage() {
  const { items, addItem, updateItem, removeItem } = useWatchlist()

  // Modal açık mı ve düzenlenen kayıt (yeni kayıtta null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  // Silinmek üzere onay bekleyen kayıt (yoksa null)
  const [deletingItem, setDeletingItem] = useState(null)

  // Arama ve filtre değerleri (kayıtları değil, yalnızca gösterilen listeyi etkiler)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  function clearFilters() {
    setSearch('')
    setTypeFilter('all')
    setStatusFilter('all')
  }

  // Türkçe için locale duyarlı küçük harf; arama büyük/küçük harf duyarsız olsun
  const query = search.trim().toLocaleLowerCase('tr')
  const visibleItems = items.filter((item) => {
    const matchesSearch =
      query === '' || item.title.toLocaleLowerCase('tr').includes(query)
    const matchesType = typeFilter === 'all' || item.type === typeFilter
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  function openAdd() {
    setEditingItem(null)
    setIsFormOpen(true)
  }

  function openEdit(item) {
    setEditingItem(item)
    setIsFormOpen(true)
  }

  // Kapanışta form unmount olur; böylece eski veri bir sonraki açılışa taşınmaz
  function closeForm() {
    setIsFormOpen(false)
    setEditingItem(null)
  }

  function handleSubmit(data) {
    if (editingItem) {
      updateItem(editingItem.id, data)
    } else {
      addItem(data)
    }
    closeForm()
  }

  // Onaylanınca hook'un removeItem'ı silme + LocalStorage işini yapar
  function confirmDelete() {
    removeItem(deletingItem.id)
    setDeletingItem(null)
  }

  function cancelDelete() {
    setDeletingItem(null)
  }

  return (
    <main className="container pb-5">
      <div className="d-flex justify-content-between align-items-center mb-3 gap-2">
        <h2 className="h4 mb-0 section-title">Listem</h2>
        <button type="button" className="btn btn-primary" onClick={openAdd}>
          <i className="bi bi-plus-lg me-1" aria-hidden="true"></i>
          Yeni Kayıt
        </button>
      </div>

      {items.length === 0 ? (
        // Hiç kayıt yok: ilk kaydı eklemeye yönlendiren boş görünüm
        <div className="empty-state">
          <span className="empty-icon">
            <i className="bi bi-collection" aria-hidden="true"></i>
          </span>
          <p className="mb-1 fw-semibold">Henüz kayıt yok</p>
          <p className="mb-3 small">İlk film, dizi veya kitabını ekleyerek başla.</p>
          <button type="button" className="btn btn-outline-primary" onClick={openAdd}>
            İlk kaydını ekle
          </button>
        </div>
      ) : (
        <>
          <FilterBar
            search={search}
            type={typeFilter}
            status={statusFilter}
            onSearchChange={setSearch}
            onTypeChange={setTypeFilter}
            onStatusChange={setStatusFilter}
            onClear={clearFilters}
          />

          <p className="text-secondary small mb-3" aria-live="polite">
            {visibleItems.length} kayıt gösteriliyor
          </p>

          {visibleItems.length === 0 ? (
            // Kayıt var ama arama/filtre sonucu boş
            <div className="empty-state">
              <span className="empty-icon">
                <i className="bi bi-search" aria-hidden="true"></i>
              </span>
              <p className="mb-1 fw-semibold">Eşleşen kayıt bulunamadı</p>
              <p className="mb-3 small">Arama veya filtreleri değiştirmeyi dene.</p>
              <button type="button" className="btn btn-outline-secondary" onClick={clearFilters}>
                Filtreleri temizle
              </button>
            </div>
          ) : (
            <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-lg-3">
              {visibleItems.map((item) => (
                <div className="col" key={item.id}>
                  <WatchItemCard item={item} onEdit={openEdit} onDelete={setDeletingItem} />
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isFormOpen && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <WatchItemForm
                initialItem={editingItem}
                onSubmit={handleSubmit}
                onCancel={closeForm}
              />
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {deletingItem && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <ConfirmDialog
                title={deletingItem.title}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
              />
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </main>
  )
}
