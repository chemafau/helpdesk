import { KnowledgeBase } from '@/types';

export const knowledgeBase: KnowledgeBase[] = [
  {
    id: 1,
    title: 'SOP Login Gagal',
    category: 'Login',
    tags: ['login', 'password', 'akun', 'kredensial'],
    content: `SOP Penanganan Login Gagal

Jika user tidak bisa login ke sistem, ikuti langkah berikut:

1. Verifikasi Username
   - Pastikan username yang dimasukkan sudah benar
   - Cek apakah ada spasi di awal/akhir username
   - Username bersifat case-sensitive pada beberapa sistem

2. Cek Status Akun
   - Buka Admin Panel > User Management
   - Cari user berdasarkan username atau email
   - Periksa apakah akun dalam status Active, Locked, atau Disabled
   - Jika Locked: klik tombol "Unlock Account"
   - Jika Disabled: eskalasi ke Admin Sistem

3. Reset Password
   - Jika user lupa password, gunakan fitur "Forgot Password"
   - Pastikan email terdaftar di sistem sudah benar
   - Link reset password berlaku 24 jam
   - Setelah reset, minta user login dengan password baru

4. Cek Browser & Cache
   - Minta user clear cache dan cookies browser
   - Coba gunakan browser lain (Chrome, Firefox, Edge)
   - Pastikan browser tidak menggunakan password lama yang tersimpan

5. Verifikasi Koneksi
   - Pastikan user terhubung ke jaringan yang benar
   - Beberapa sistem hanya bisa diakses dari intranet perusahaan

6. Eskalasi
   - Jika langkah 1-5 tidak berhasil, eskalasi ke tim IT Level 2
   - Sertakan: username, screenshot error, waktu kejadian`,
  },
  {
    id: 2,
    title: 'SOP Reset Password',
    category: 'Login',
    tags: ['password', 'reset', 'email', 'kredensial'],
    content: `SOP Reset Password User

Prosedur reset password untuk membantu user yang lupa atau perlu mengganti password:

1. Verifikasi Identitas User
   - Konfirmasi nama lengkap dan email terdaftar
   - Tanyakan nomor karyawan atau departemen
   - Jangan reset password tanpa verifikasi identitas

2. Reset Via Self-Service (Diutamakan)
   - Arahkan user ke halaman login
   - Klik "Lupa Password?" atau "Forgot Password?"
   - Masukkan email terdaftar
   - Cek inbox email (termasuk folder spam)
   - Klik link reset dalam email
   - Buat password baru sesuai ketentuan

3. Ketentuan Password Baru
   - Minimal 8 karakter
   - Kombinasi huruf besar, huruf kecil, angka, dan simbol
   - Tidak boleh sama dengan 5 password sebelumnya
   - Akan expired setiap 90 hari

4. Reset Manual oleh Admin (Jika Self-Service Gagal)
   - Login ke Admin Panel
   - User Management > Cari user
   - Klik "Reset Password"
   - Generate password sementara
   - Kirim password sementara via email resmi
   - Minta user ganti password saat pertama login

5. Dokumentasi
   - Catat ticket reset password
   - Tandai sebagai Resolved setelah user berhasil login`,
  },
  {
    id: 3,
    title: 'SOP Unlock Akun User',
    category: 'Login',
    tags: ['unlock', 'akun', 'terkunci', 'login'],
    content: `SOP Unlock Akun yang Terkunci

Akun dapat terkunci setelah beberapa kali percobaan login yang gagal (default: 5 kali):

1. Identifikasi Penyebab Akun Terkunci
   - Cek log sistem untuk melihat percobaan login yang gagal
   - Tanyakan kepada user apakah ada orang lain yang mencoba akses
   - Perhatikan waktu dan lokasi percobaan login

2. Verifikasi Identitas
   - Konfirmasi identitas user sebelum unlock
   - Gunakan verifikasi multi-faktor jika tersedia

3. Proses Unlock
   - Login ke Admin Panel > User Management
   - Cari akun yang terkunci (tampil indikator "Locked")
   - Klik tombol "Unlock Account"
   - Konfirmasi tindakan

4. Setelah Unlock
   - Informasikan ke user bahwa akun sudah di-unlock
   - Rekomendasikan user untuk reset password
   - Monitor aktivitas akun selama 24 jam ke depan

5. Tindakan Keamanan
   - Jika akun terkunci karena aktivitas mencurigakan, laporkan ke tim Security
   - Dokumentasikan insiden di tiket`,
  },
  {
    id: 4,
    title: 'SOP Query Database Lambat',
    category: 'Database',
    tags: ['database', 'query', 'lambat', 'performance', 'sql'],
    content: `SOP Penanganan Query Database Lambat

Jika user melaporkan query database berjalan lambat:

1. Identifikasi Query Bermasalah
   - Minta user sertakan query SQL yang berjalan lambat
   - Catat waktu eksekusi yang dialami user
   - Identifikasi tabel dan jumlah data yang terlibat

2. Analisis Query
   - Gunakan EXPLAIN/EXPLAIN ANALYZE untuk analisis query plan
   - Periksa apakah menggunakan INDEX atau Full Table Scan
   - Identifikasi JOIN yang tidak efisien

3. Cek Kondisi Database
   - Monitor CPU dan Memory penggunaan database server
   - Cek active connections yang sedang berjalan
   - Periksa apakah ada long-running transactions
   - Cek ukuran tabel dan fragmentasi index

4. Solusi Umum
   - Tambahkan INDEX pada kolom yang sering di-query/filter
   - Optimalkan query: hindari SELECT *, gunakan kolom spesifik
   - Gunakan pagination untuk data besar
   - Pertimbangkan query caching

5. Tindakan Darurat
   - Jika database tidak responsif, restart service database
   - Kill long-running queries yang memblokir sistem
   - Eskalasi ke DBA jika masalah berlanjut

6. Pencegahan
   - Lakukan VACUUM/ANALYZE secara berkala (PostgreSQL)
   - Rebuild index yang terfragmentasi
   - Monitor query performance secara rutin`,
  },
  {
    id: 5,
    title: 'SOP Koneksi Database Gagal',
    category: 'Database',
    tags: ['database', 'koneksi', 'connection', 'error'],
    content: `SOP Penanganan Koneksi Database Gagal

Jika aplikasi tidak bisa connect ke database:

1. Cek Status Database Server
   - Verifikasi apakah database service sedang berjalan
   - Ping server database untuk cek konektivitas jaringan
   - Cek port database (PostgreSQL: 5432, SQL Server: 1433, MySQL: 3306)

2. Verifikasi Konfigurasi Koneksi
   - Cek connection string di konfigurasi aplikasi
   - Pastikan host, port, database name, username, dan password benar
   - Verifikasi firewall tidak memblokir port database

3. Cek Resource Database Server
   - CPU usage tidak boleh melebihi 90%
   - Pastikan disk tidak penuh
   - Cek maximum connection limit belum tercapai

4. Langkah Pemulihan
   - Restart database service jika tidak responsif
   - Clear connection pool dari sisi aplikasi
   - Restart aplikasi server jika perlu

5. Eskalasi
   - Jika database server down lebih dari 15 menit, eskalasi ke tim Infrastruktur
   - Aktifkan failover ke database replica jika tersedia`,
  },
  {
    id: 6,
    title: 'SOP Error Upload File',
    category: 'Application',
    tags: ['upload', 'file', 'error', 'aplikasi'],
    content: `SOP Penanganan Error Upload File

Jika user mengalami error saat upload file:

1. Identifikasi Error
   - Minta screenshot atau pesan error yang muncul
   - Tanyakan jenis file yang dicoba di-upload
   - Tanyakan ukuran file yang dicoba di-upload

2. Cek Batasan Upload
   - Ukuran file maksimum (biasanya 10MB untuk dokumen, 5MB untuk gambar)
   - Format file yang diizinkan (PDF, DOC, DOCX, XLS, XLSX, JPG, PNG)
   - Pastikan nama file tidak mengandung karakter khusus

3. Solusi Umum
   - Kompres file jika terlalu besar
   - Konversi ke format yang didukung
   - Rename file jika ada karakter khusus
   - Clear browser cache dan coba lagi

4. Cek Sisi Server
   - Verifikasi storage server masih tersedia
   - Cek permission folder upload
   - Periksa log aplikasi untuk error detail

5. Eskalasi
   - Jika semua langkah gagal, eskalasi ke tim Developer
   - Sertakan: jenis file, ukuran, screenshot error, dan log aplikasi`,
  },
  {
    id: 7,
    title: 'SOP Dashboard Tidak Tampil',
    category: 'Application',
    tags: ['dashboard', 'blank', 'tampilan', 'error', 'aplikasi'],
    content: `SOP Penanganan Dashboard Blank/Tidak Tampil

Jika user melaporkan dashboard kosong atau tidak tampil:

1. Verifikasi Masalah
   - Konfirmasi apakah masalah hanya pada user tersebut atau semua user
   - Tanyakan sejak kapan masalah terjadi
   - Cek apakah ada update/deployment terbaru

2. Troubleshoot Sisi Client
   - Clear cache dan cookies browser
   - Coba browser lain
   - Disable browser extension/plugin
   - Coba mode Incognito/Private
   - Periksa konsol browser (F12) untuk error JavaScript

3. Verifikasi Koneksi
   - Pastikan koneksi internet stabil
   - Cek apakah API endpoint bisa diakses
   - Verifikasi tidak ada pemblokiran dari proxy/firewall

4. Cek Sisi Server
   - Verifikasi aplikasi server berjalan normal
   - Cek log error di server
   - Pastikan database connection normal
   - Cek apakah ada proses yang menggunakan resource berlebihan

5. Rollback/Recovery
   - Jika setelah deployment terbaru: pertimbangkan rollback
   - Restart aplikasi service jika perlu
   - Eskalasi ke tim Developer jika masalah persisten`,
  },
  {
    id: 8,
    title: 'SOP API Gagal/Error',
    category: 'Application',
    tags: ['api', 'error', 'integration', 'endpoint'],
    content: `SOP Penanganan API Gagal

Jika API endpoint tidak berfungsi atau mengembalikan error:

1. Identifikasi Error
   - Catat HTTP status code (400, 401, 403, 404, 500, dll)
   - Catat pesan error yang dikembalikan API
   - Identifikasi endpoint yang bermasalah

2. Analisis Berdasarkan Error Code
   - 400 Bad Request: Periksa request payload/parameter
   - 401 Unauthorized: Token expired, perlu re-autentikasi
   - 403 Forbidden: User tidak punya akses, cek permission
   - 404 Not Found: Endpoint salah atau resource tidak ada
   - 500 Internal Server Error: Masalah di server API
   - 503 Service Unavailable: API server down atau maintenance

3. Langkah Pemulihan
   - Untuk 401: Logout dan login kembali untuk refresh token
   - Untuk 500/503: Tunggu beberapa menit, coba lagi
   - Periksa status page API jika tersedia

4. Eskalasi
   - Jika error 500/503 berlanjut: eskalasi ke tim Backend Developer
   - Sertakan: endpoint URL, request/response detail, waktu kejadian`,
  },
  {
    id: 9,
    title: 'SOP Masalah Jaringan/Network',
    category: 'Network',
    tags: ['jaringan', 'network', 'koneksi', 'internet', 'wifi'],
    content: `SOP Penanganan Masalah Jaringan

Jika user mengalami masalah koneksi jaringan:

1. Identifikasi Masalah
   - Apakah masalah internet atau jaringan lokal?
   - Apakah semua user terdampak atau hanya satu user?
   - Device apa yang digunakan (laptop, PC, mobile)?

2. Troubleshoot Dasar
   - Restart modem/router (matikan 30 detik, hidupkan kembali)
   - Disconnect dan reconnect ke WiFi
   - Coba kabel ethernet jika menggunakan WiFi
   - Ping gateway untuk cek koneksi lokal

3. Cek Koneksi Internet
   - Test speed internet di speedtest.net
   - Cek apakah DNS bekerja (ping 8.8.8.8)
   - Verifikasi tidak ada pemblokiran firewall

4. Cek Konfigurasi Jaringan
   - Verifikasi IP address, subnet, dan gateway benar
   - Cek DNS server settings
   - Pastikan proxy settings benar

5. Eskalasi
   - Jika masalah pada infrastruktur jaringan: eskalasi ke tim Network
   - Jika ISP bermasalah: hubungi ISP dan dokumentasikan`,
  },
  {
    id: 10,
    title: 'SOP Akses Ditolak',
    category: 'Access',
    tags: ['akses', 'permission', 'denied', 'role', 'hak akses'],
    content: `SOP Penanganan Akses Ditolak

Jika user tidak bisa mengakses fitur/menu/data tertentu:

1. Konfirmasi Masalah
   - Fitur/menu/data apa yang tidak bisa diakses?
   - Apa pesan error yang muncul?
   - Apakah user pernah bisa mengakses sebelumnya?

2. Verifikasi Role dan Permission
   - Login Admin Panel > User Management
   - Cek role yang dimiliki user
   - Bandingkan dengan permission yang diperlukan

3. Proses Pemberian Akses
   - Verifikasi apakah user memang berhak mendapat akses ini
   - Dapatkan persetujuan dari atasan/manager user
   - Dokumentasikan permintaan akses
   - Assign role atau permission yang sesuai

4. Verifikasi
   - Minta user logout dan login kembali
   - Konfirmasi user sudah bisa mengakses

5. Catatan Keamanan
   - Jangan berikan akses melebihi yang diperlukan (principle of least privilege)
   - Semua perubahan akses harus terdokumentasi
   - Review akses secara berkala`,
  },
  {
    id: 11,
    title: 'SOP Perangkat Hardware Bermasalah',
    category: 'Hardware',
    tags: ['hardware', 'perangkat', 'rusak', 'tidak berfungsi', 'printer', 'laptop', 'komputer'],
    content: `SOP Penanganan Perangkat Hardware Bermasalah

Jika user melaporkan perangkat hardware tidak berfungsi normal:

1. Identifikasi Perangkat dan Gejala
   - Jenis perangkat: laptop, PC, printer, monitor, keyboard, mouse, dll
   - Gejala spesifik: tidak menyala, error, suara aneh, panas berlebih
   - Sejak kapan masalah terjadi dan apakah ada kejadian sebelumnya

2. Troubleshoot Awal (Remote)
   - Restart perangkat
   - Cabut dan pasang kembali semua kabel dan koneksi
   - Update driver perangkat melalui Device Manager
   - Jalankan Windows Troubleshooter jika tersedia
   - Cek Event Viewer untuk error log hardware

3. Untuk Printer
   - Hapus print queue yang stuck
   - Restart Print Spooler service (services.msc)
   - Reinstall driver printer
   - Cek tinta/toner dan kertas tidak macet

4. Untuk Laptop/PC Tidak Menyala
   - Pastikan adaptor/kabel power tersambung dengan benar
   - Coba charger/kabel lain
   - Lepas baterai (jika bisa), tunggu 30 detik, pasang kembali
   - Cek lampu indikator daya

5. Overheating
   - Bersihkan ventilasi dari debu
   - Gunakan cooling pad
   - Periksa thermal paste jika CPU suhu sangat tinggi

6. Eskalasi ke Teknisi Lapangan
   - Jika masalah tidak bisa diselesaikan remote, buat jadwal kunjungan teknisi
   - Siapkan: nomor aset perangkat, lokasi user, deskripsi masalah detail`,
  },
  {
    id: 12,
    title: 'SOP Email Tidak Terkirim atau Tidak Masuk',
    category: 'Email',
    tags: ['email', 'tidak terkirim', 'tidak masuk', 'spam', 'outlook', 'mail'],
    content: `SOP Penanganan Masalah Email

Jika user mengalami masalah pengiriman atau penerimaan email:

1. Identifikasi Masalah
   - Email tidak bisa dikirim / bounced back
   - Email tidak masuk ke inbox
   - Email masuk ke folder spam
   - Tidak bisa login ke email client

2. Email Tidak Bisa Dikirim
   - Cek pesan bounce / error yang diterima pengirim
   - Verifikasi alamat email tujuan sudah benar
   - Pastikan ukuran attachment tidak melebihi batas (biasanya 25MB)
   - Cek apakah akun SMTP belum mencapai limit pengiriman harian
   - Verifikasi konfigurasi SMTP (host, port, SSL/TLS, autentikasi)

3. Email Tidak Masuk
   - Cek folder Spam / Junk terlebih dahulu
   - Periksa aturan filter/rules yang mungkin memindahkan email
   - Verifikasi kapasitas mailbox tidak penuh (biasanya 50GB)
   - Cek apakah pengirim di-block atau masuk blacklist
   - Verifikasi MX record domain masih valid

4. Masalah di Mail Client (Outlook, Thunderbird)
   - Cek koneksi internet
   - Verifikasi setting IMAP/POP3 dan SMTP
   - Rebuild Outlook profile jika korup
   - Update mail client ke versi terbaru

5. Konfigurasi Keamanan Email
   - Periksa SPF record: pastikan server pengirim tercantum
   - DKIM: pastikan signature email valid
   - DMARC: cek policy tidak terlalu strict memblokir email legitimate

6. Eskalasi
   - Masalah konfigurasi DNS/MX record: eskalasi ke tim Infrastruktur
   - Masalah mail server down: eskalasi ke tim Server`,
  },
  {
    id: 13,
    title: 'SOP Sistem Lambat / Performa Menurun',
    category: 'Performance',
    tags: ['lambat', 'lemot', 'performance', 'performa', 'loading', 'hang', 'freeze'],
    content: `SOP Penanganan Sistem Lambat / Performa Menurun

Jika user melaporkan aplikasi atau sistem berjalan lambat:

1. Identifikasi Ruang Lingkup Masalah
   - Apakah lambat pada semua user atau hanya user tertentu?
   - Apakah lambat pada semua fitur atau fitur tertentu saja?
   - Kapan mulai terjadi? Apakah bertepatan dengan deployment atau perubahan?

2. Troubleshoot Sisi Client
   - Restart browser dan clear cache (Ctrl+Shift+Del)
   - Tutup tab dan aplikasi lain yang tidak digunakan
   - Cek penggunaan RAM dan CPU di Task Manager
   - Restart komputer user
   - Coba akses dari perangkat / jaringan berbeda

3. Cek Koneksi Jaringan
   - Test kecepatan internet (speedtest.net)
   - Ping server aplikasi untuk cek latency
   - Cek apakah jaringan sedang padat (jam sibuk)

4. Monitoring Sisi Server
   - Monitor CPU, RAM, Disk I/O server aplikasi secara real-time
   - Cek jumlah concurrent user yang sedang aktif
   - Identifikasi proses yang mengkonsumsi resource berlebihan
   - Cek log aplikasi untuk error atau warning

5. Investigasi Database
   - Cek query yang berjalan lama (slow query log)
   - Periksa index database apakah masih optimal
   - Monitor koneksi database aktif
   - Pertimbangkan query caching

6. Tindakan Pemulihan
   - Restart aplikasi service jika response time sangat buruk
   - Kill proses runaway yang mengkonsumsi resource berlebihan
   - Aktifkan mode maintenance jika perlu perbaikan menyeluruh
   - Scaling horizontal/vertikal jika beban melebihi kapasitas

7. Pencegahan
   - Lakukan load testing sebelum deployment ke production
   - Pasang monitoring dan alerting (CPU > 80%, RAM > 85%)
   - Jadwalkan maintenance rutin di luar jam kerja`,
  },
  {
    id: 14,
    title: 'SOP Permintaan Akses Sistem Baru',
    category: 'Access',
    tags: ['akses baru', 'onboarding', 'request akses', 'user baru', 'aktivasi'],
    content: `SOP Permintaan Akses Sistem Baru

Prosedur untuk user yang membutuhkan akses ke sistem atau aplikasi baru:

1. Penerimaan Request
   - Terima permintaan melalui tiket helpdesk
   - Pastikan request mencantumkan: nama user, NIP/NIK, departemen, sistem yang diminta, alasan kebutuhan

2. Verifikasi dan Persetujuan
   - Konfirmasi identitas user
   - Minta persetujuan atasan langsung via email atau tanda tangan form
   - Cek apakah akses yang diminta sesuai dengan job description user
   - Untuk akses sensitif (keuangan, HR), diperlukan persetujuan manager dan IT Security

3. Provisioning Akses
   - Buat akun di sistem yang diminta jika belum ada
   - Assign role minimum yang dibutuhkan (principle of least privilege)
   - Set password sementara dan aktifkan wajib ganti password saat pertama login
   - Daftarkan MFA jika sistem mendukung

4. Notifikasi User
   - Kirim email ke user berisi: username, password sementara, panduan login pertama
   - Sertakan link dokumentasi atau panduan penggunaan sistem

5. Dokumentasi
   - Catat di log akses: siapa diberi akses ke sistem apa, kapan, siapa yang menyetujui
   - Update tiket menjadi Resolved setelah user konfirmasi bisa akses

6. Review Berkala
   - Akses direview setiap 6 bulan
   - Akses dicabut otomatis jika user resign atau pindah departemen`,
  },
  {
    id: 15,
    title: 'SOP Backup dan Recovery Data',
    category: 'Database',
    tags: ['backup', 'recovery', 'restore', 'data hilang', 'database'],
    content: `SOP Backup dan Recovery Data

Prosedur penanganan jika data hilang atau perlu restore:

1. Identifikasi Data yang Bermasalah
   - Data apa yang hilang atau perlu di-restore?
   - Kapan terakhir data dalam kondisi normal?
   - Apa penyebab data hilang (terhapus tidak sengaja, corrupt, dll)?

2. Jangan Panik — Hentikan Operasi Dulu
   - Jangan menulis data baru ke storage yang sama
   - Jangan coba perbaiki sendiri tanpa backup
   - Segera hubungi tim IT / DBA

3. Cek Backup yang Tersedia
   - Backup harian: tersedia untuk 7 hari terakhir
   - Backup mingguan: tersedia untuk 4 minggu terakhir
   - Backup bulanan: tersedia untuk 3 bulan terakhir
   - Lokasi backup: server backup di /backup/ atau cloud storage

4. Proses Restore
   - Identifikasi backup terdekat sebelum data hilang
   - Test restore di environment staging dulu sebelum production
   - Koordinasikan jadwal restore dengan tim terdampak (ada downtime)
   - Lakukan restore di luar jam kerja jika memungkinkan

5. Verifikasi Setelah Restore
   - Validasi integritas data setelah restore
   - Minta user mengkonfirmasi data sudah kembali normal
   - Jalankan consistency check pada database

6. Post-Recovery
   - Dokumentasikan insiden: penyebab, data yang hilang, waktu recovery
   - Evaluasi frekuensi dan metode backup
   - Pertimbangkan implementasi Point-in-Time Recovery (PITR)`,
  },
];
