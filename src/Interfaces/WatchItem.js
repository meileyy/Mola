// JavaScript'te interface olmadığı için veri yapısını JSDoc ile belgeliyoruz.
// Bu sayede editör otomatik tamamlama ve tip ipucu verebilir.

/**
 * Takip listesindeki tek bir kayıt (film, dizi veya kitap).
 * @typedef {Object} WatchItem
 * @property {string} id - Benzersiz kimlik (crypto.randomUUID()).
 * @property {string} title - Film, dizi veya kitap adı.
 * @property {'movie' | 'series' | 'book'} type - Tür.
 * @property {'planned' | 'in-progress' | 'done'} status - Durum kodu.
 * @property {string} note - Kısa not (opsiyonel, boş olabilir).
 * @property {string} createdAt - Eklenme tarihi (ISO formatı).
 */

// Bu dosya yalnızca tip belgesi içerir; dışa aktarılacak kod yok.
export {}
