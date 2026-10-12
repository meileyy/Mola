# Ajan Talimatları

> Bu dosya CLAUDE.md, AGENTS.md ve GEMINI.md olarak aynen kopyalanabilir; böylece aynı talimatlar hangi yapay zekâ aracında çalışılırsa çalışılsın yüklenir.

Bu proje, "Web Geliştirme; Javascript Proje Yönergesi" kapsamında hazırlanan **Mola** adlı bir **Film, Dizi & Kitap Takip Listesi** uygulamasıdır. Amaç modern web dünyasına girişi hızlandırmak ve eğitimde öğrenilenleri pekiştirmektir. Bu nedenle kod **basit, okunabilir ve öğretici** olmalıdır. Zeki ama karmaşık çözümler yerine, bir öğrencinin okuyup anlayabileceği çözümler tercih edilir.

## Proje Özeti

- **Ne:** Film, dizi ve kitapları "planlandı / devam ediyor / tamamlandı" durumlarıyla takip eden tek sayfalık uygulama.
- **Ad:** Mola (repo ve klasör adı: `mola`)
- **Zorunlu işlemler (CRUD):** Ekle, Listele, Güncelle, Sil.
- **Ek özellikler:** Türe göre filtreleme (film / dizi / kitap), duruma göre filtreleme, kendi listemizde arama, koyu / açık tema.
- **Arayüz dili:** Türkçe.
- **Kısıt:** Süre kısıtlı. Kapsamı büyütme; önce teslim edilebilir bir sürüm çıkar.

## Teknoloji Yığını

| Katman | Seçim |
| --- | --- |
| Kütüphane | ReactJS |
| Derleme aracı | Vite |
| Dil | **JavaScript** (TypeScript kullanılmaz; yönerge JavaScript istiyor) |
| CSS | Bootstrap 5 (5.3 dahili koyu / açık temayı kullan) |
| Veri saklama | LocalStorage (anahtar: `mola`) |
| Sürüm kontrol | Git + GitHub (public depo) |
| Yayın | Netlify (build: `npm run build`, yayın klasörü: `dist`) |

## Veri Modeli

Tek varlık: `WatchItem`. Tüm kayıtlar tek bir dizi olarak LocalStorage'da JSON olarak saklanır.

| Alan | Tip | Açıklama |
| --- | --- | --- |
| id | string | Benzersiz kimlik (`crypto.randomUUID()`) |
| title | string | Film, dizi veya kitap adı |
| type | `"movie"`, `"series"` veya `"book"` | Tür (film, dizi, kitap) |
| status | `"planned"`, `"in-progress"`, `"done"` | Durum kodu (ekranda türe göre gösterilir, aşağıdaki tabloya bak) |
| note | string | Kısa not, opsiyonel |
| createdAt | string | Eklenme tarihi (ISO formatı) |

JavaScript'te interface olmadığı için bu yapı `src/Interfaces/WatchItem.js` dosyasında **JSDoc** ile belgelenir.

### Durum Etiketleri

Veride durum kodu hep aynıdır; ekranda yazan metin türe göre değişir (kitap "izlenmez", okunur).

| Durum kodu | Film kartında | Dizi kartında | Kitap kartında |
| --- | --- | --- | --- |
| `planned` | İzlenecek | İzlenecek | Okunacak |
| `in-progress` | İzleniyor | İzleniyor | Okunuyor |
| `done` | İzlendi | İzlendi | Okundu |

Kartlarda tür rozeti: 🎬 Film, 📺 Dizi, 📖 Kitap (her tür için farklı Bootstrap rozet rengi).

Bu eşleştirme **sadece** `src/utils/labels.js` içindeki `getStatusLabel(type, status)` fonksiyonunda yapılır. Filtre çubuğunda tüm türlere uyan ortak etiketler kullanılır: `Tümü`, `Planlanan`, `Devam eden`, `Tamamlanan`.

## Klasör Yapısı

```
mola/
├── public/
├── src/
│   ├── Components/      → Header, ThemeToggle, WatchItemCard, WatchItemForm, FilterBar, ConfirmDialog
│   ├── Pages/           → HomePage (tek sayfa; ekleme ve düzenleme modal ile)
│   ├── Interfaces/      → WatchItem.js (JSDoc ile veri yapısı)
│   ├── hooks/           → useWatchlist.js, useTheme.js
│   ├── utils/           → storage.js, labels.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── CLAUDE.md
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

**Sorumluluk dağılımı (önemli):**

- LocalStorage okuma/yazma **sadece** `utils/storage.js` içinde yapılır.
- Ekle / listele / güncelle / sil mantığı **sadece** `hooks/useWatchlist.js` içinde yaşar. Bileşenler veriye doğrudan dokunmaz, hook'u çağırır.
- Böylece süre kalırsa backend eklemek için sadece `useWatchlist.js` (ve `storage.js`) değişir; arayüz aynı kalır.

## Çalışma İlkeleri

**1. Önce mevcut olanı kontrol et**
Yeni bileşen, hook veya fonksiyon yazmadan önce `src/` altında benzeri var mı bak. Varsa onu kullan veya genişlet; kopyalama yapma.

**2. Küçük adımlarla ilerle**
Her adımın sonunda uygulama çalışır durumda olmalı. Sırayla: iskelet → listele → ekle → sil → güncelle → filtre/arama → tema → cilalama → teslim. Bir adım bitmeden diğerine geçme.

**3. Hata çıkınca kendini düzelt**
- Hata mesajını ve konsol çıktısını oku.
- Sorunu düzelt, `npm run dev` ile tekrar dene.
- Aynı hatanın tekrar etmemesi için bu dosyadaki ilgili bölümü güncelle (aşağıdaki "Öğrenilenler").

**4. Dokümanı ve bu dosyayı güncel tut**
Bir karar değişirse (örneğin backend eklendi) hem proje mimari dokümanını hem bu dosyayı güncelle. Bu dosyayı sormadan silme veya baştan yazma; sadece geliştir.

## Kodlama Kuralları

- Sadece fonksiyonel bileşenler ve hook'lar kullan (class bileşen yok).
- Bileşen dosyaları `.jsx`, diğerleri `.js` uzantılı olsun. Bileşen adları `PascalCase`, fonksiyon ve değişkenler `camelCase`.
- Kod içindeki değişken ve fonksiyon adları İngilizce, **kullanıcıya görünen tüm metinler Türkçe** olsun (butonlar, etiketler, hata ve boş durum mesajları).
- Stil için önce Bootstrap sınıflarını kullan. Özel CSS'i sadece gerekirse `index.css` içine yaz.
- Durum metinlerini (İzlenecek, Okunacak vb.) bileşenlerin içine elle yazma; her zaman `getStatusLabel(type, status)` kullan.
- Silme işleminden önce her zaman onay penceresi (`ConfirmDialog`) göster.
- Formda başlık boşsa kaydetme ve Türkçe bir uyarı göster.
- Liste boşsa kullanıcıya "Henüz kayıt yok" gibi bir mesaj göster.
- Yorum satırları kısa ve Türkçe olsun; "ne" yaptığını değil "neden" yaptığını anlat.

## Kapsam Dışı (Şimdilik Yapma)

- TypeScript
- React Router (tek sayfa + modal kullanıyoruz)
- Backend / Node sunucusu (önce LocalStorage ile bitir; süre kalırsa eklenir)
- TMDB / Open Library gibi dış arama servisleri (arama sadece kendi listemizde)
- Puanlama (yıldız) özelliği
- Spor takibi (istenirse sonradan `type` alanına yeni bir seçenek olarak eklenir)

## Komutlar

```
npm create vite@latest mola -- --template react   # kurulum (framework: React, variant: JavaScript)
cd mola
npm install
npm install bootstrap
npm run dev        # geliştirme sunucusu: http://localhost:5173
npm run build      # yayın paketi: dist klasörü
```

Bootstrap, `src/main.jsx` içinde içe aktarılır:

```
import 'bootstrap/dist/css/bootstrap.min.css'
```

## Teslim Kontrol Listesi

- [ ] Ekle, listele, güncelle, sil çalışıyor
- [ ] Tür filtresi, durum filtresi, arama ve tema çalışıyor
- [ ] Sayfa yenilenince veriler LocalStorage'dan geri geliyor
- [ ] Mobil ekranda düzen bozulmuyor
- [ ] En az 1 ekran görüntüsü alındı ve README'ye eklendi
- [ ] README'de kurulum ve çalıştırma adımları var
- [ ] Proje GitHub'da **public** depo olarak yüklendi
- [ ] Netlify'a bağlandı ve yayındaki sitede dört işlem denendi
- [ ] GitHub linki ve Netlify linki proje teslim formunda paylaşıldı

## Öğrenilenler

Bu bölüm geliştirme sırasında çıkan hatalar ve çözümleriyle doldurulur. Her kayıt: **sorun → neden → çözüm**.

- (Henüz kayıt yok)

## Özet

Bu proje bir öğrenme projesidir: basit tut, küçük adımlarla ilerle, her adımda çalışan bir uygulama bırak ve teslim maddelerini asla gözden kaçırma. Pragmatik ol, kapsamı büyütme.
