# Taskflow - Görev Yönetim Sistemi API

Merhaba, bu proje bootcamp kapsamında Node.js ve Express.js kullanarak geliştirdiğim Görev Yönetim Sistemi API ödevidir. 

Verileri şimdilik kod içinde geçici bir dizide (array) tutarak temel REST API mantığını ve istemci-sunucu haberleşmesini kurguladım.

## Projede Neler Var?
- **CRUD İşlemleri:** Görev ekleme (POST), listeleme (GET), güncelleme (PUT) ve silme (DELETE) işlemleri sorunsuz çalışıyor.
- **Ekstra Özellikler:** İsteğe bağlı olarak istenen "Arama, Filtreleme ve Sayfalama" mantığını da GET isteğinin içine ekledim.
- **Logger:** Sisteme gelen istekleri (saat, tarih, adres) anlık olarak terminale yazdıran bir middleware (ara katman) kullandım.

## 🚀 Projeyi Adım Adım İndirme ve Çalıştırma Rehberi

Projeyi kendi bilgisayarınızda test etmek için sırasıyla şu adımları izleyebilirsiniz:

**1. Projeyi İndirin (Download):**
GitHub sayfasında sağ üstteki yeşil **"Code"** butonuna tıklayıp **"Download ZIP"** seçeneği ile projeyi bilgisayarınıza indirin ve klasöre çıkartın. 

**2. Editörde Açın:**
İndirdiğiniz o proje klasörünü Visual Studio Code (veya kullandığınız herhangi bir kod editörü) ile açın.

**3. Terminali Açıp Paketleri Yükleyin:**
VS Code üst menüsünden `Terminal -> New Terminal` diyerek alt kısımdan terminali açın. Projenin çalışması için gereken Express.js paketini kurmak üzere terminale şu komutu yazıp Enter'a basın:
`npm install`

**4. Sunucuyu Başlatın:**
Yükleme saniyeler içinde bittikten sonra, sunucumuzu ayağa kaldırmak için terminale şu komutu yazın:
`node index.js`

**5. Postman ile Test Edin:**
Terminalde `Sunucu http://localhost:3000 adresinde çalışıyor...` yazısını gördüğünüz an sistem hazırdır. Postman programını açıp `http://localhost:3000/tasks` adresine istekler atarak projeyi test edebilirsiniz. Test uçlarına (endpoint) ait başarılı ekran görüntülerini projenin içindeki klasörde bulabilirsiniz.