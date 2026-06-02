import { Comment } from '@/types';

export const comments: Comment[] = [
  // HD-1024 - Tidak bisa login setelah reset password
  { id: 1, ticket_id: 'HD-1024', sender: 'Andi Rahman', sender_type: 'User', message: 'Halo, saya sudah reset password via email, tapi masih tidak bisa login. Muncul error "Invalid credentials" terus.', timestamp: '2026-08-01T10:32:00' },
  { id: 2, ticket_id: 'HD-1024', sender: 'IT Support', sender_type: 'Agent', message: 'Mohon coba clear cache dan cookies browser terlebih dahulu, kemudian coba login kembali dengan password baru.', timestamp: '2026-08-01T10:41:00' },
  { id: 3, ticket_id: 'HD-1024', sender: 'Andi Rahman', sender_type: 'User', message: 'Sudah dicoba, masih sama. Berikut screenshot errornya.', timestamp: '2026-08-01T10:46:00', attachment: 'screenshot_error.png' },
  { id: 4, ticket_id: 'HD-1024', sender: 'IT Support', sender_type: 'Agent', message: 'Terima kasih, akan kami cek lebih lanjut. Sepertinya akun perlu di-unlock dari admin panel.', timestamp: '2026-08-01T10:52:00' },
  { id: 5, ticket_id: 'HD-1024', sender: 'Andi Rahman', sender_type: 'User', message: 'Baik, ditunggu ya. Ini sangat urgent karena ada meeting jam 11.', timestamp: '2026-08-01T10:55:00' },

  // HD-1023 - Query database sangat lambat
  { id: 6, ticket_id: 'HD-1023', sender: 'Dwi Wahyu', sender_type: 'User', message: 'Query report bulanan yang biasanya selesai 2 menit, sekarang sudah 35 menit belum selesai. Sangat menghambat pekerjaan.', timestamp: '2026-08-01T09:45:00' },
  { id: 7, ticket_id: 'HD-1023', sender: 'IT Support', sender_type: 'Agent', message: 'Kami sedang investigasi masalah ini. Bisa share query SQL yang digunakan untuk report tersebut?', timestamp: '2026-08-01T09:58:00' },
  { id: 8, ticket_id: 'HD-1023', sender: 'Dwi Wahyu', sender_type: 'User', message: 'SELECT * FROM transactions WHERE MONTH(created_at) = 7 AND YEAR(created_at) = 2026 LEFT JOIN sales ON transactions.id = sales.transaction_id', timestamp: '2026-08-01T10:05:00' },
  { id: 9, ticket_id: 'HD-1023', sender: 'IT Support', sender_type: 'Agent', message: 'Sudah ditemukan masalahnya. Query tidak menggunakan index optimal pada kolom created_at. Sedang dalam proses optimasi, estimasi selesai 30 menit.', timestamp: '2026-08-01T10:30:00' },

  // HD-1022 - Error upload file di dashboard
  { id: 10, ticket_id: 'HD-1022', sender: 'Sinta Sari', sender_type: 'User', message: 'Saat coba upload file laporan ke dashboard, muncul error 413 Request Entity Too Large.', timestamp: '2026-07-31T11:00:00' },
  { id: 11, ticket_id: 'HD-1022', sender: 'IT Support', sender_type: 'Agent', message: 'Berapa ukuran file yang coba diupload? Format filenya apa?', timestamp: '2026-07-31T11:15:00' },
  { id: 12, ticket_id: 'HD-1022', sender: 'Sinta Sari', sender_type: 'User', message: 'File PDF, ukurannya sekitar 45MB. Ini laporan kuartal yang memang cukup besar.', timestamp: '2026-07-31T11:20:00' },
  { id: 13, ticket_id: 'HD-1022', sender: 'IT Support', sender_type: 'Agent', message: 'Masalah ditemukan — batas upload Nginx terlalu kecil (10MB). Sudah ditingkatkan ke 50MB. Silakan coba upload kembali.', timestamp: '2026-07-31T14:00:00' },
  { id: 14, ticket_id: 'HD-1022', sender: 'Sinta Sari', sender_type: 'User', message: 'Berhasil! Terima kasih banyak atas bantuannya.', timestamp: '2026-07-31T14:10:00' },

  // HD-1020 - SQL Server timeout saat import data
  { id: 15, ticket_id: 'HD-1020', sender: 'Joko Susilo', sender_type: 'User', message: 'Import data dari Excel gagal di tengah jalan karena SQL Server timeout. File berisi 50.000 baris data.', timestamp: '2026-07-31T14:00:00' },
  { id: 16, ticket_id: 'HD-1020', sender: 'IT Support', sender_type: 'Agent', message: 'Masalah timeout ini terjadi karena ukuran data yang besar. Kami perlu cek konfigurasi timeout SQL Server. Bisa share sample filenya?', timestamp: '2026-07-31T14:30:00' },
  { id: 17, ticket_id: 'HD-1020', sender: 'Joko Susilo', sender_type: 'User', message: 'File sudah dishare ke shared folder. Kapan kira-kira selesai? Deadline laporan besok pagi.', timestamp: '2026-07-31T15:00:00' },
  { id: 18, ticket_id: 'HD-1020', sender: 'IT Support', sender_type: 'Agent', message: 'Sedang dalam proses investigasi dan penyesuaian konfigurasi. Kami akan update progress paling lambat besok pagi jam 8.', timestamp: '2026-08-01T09:00:00' },

  // HD-1019 - Password expired tapi tidak bisa reset
  { id: 19, ticket_id: 'HD-1019', sender: 'Tono Nugroho', sender_type: 'User', message: 'Password saya sudah expired dan sistem meminta reset, tapi email reset tidak kunjung masuk sudah 30 menit lebih.', timestamp: '2026-07-30T09:15:00' },
  { id: 20, ticket_id: 'HD-1019', sender: 'IT Support', sender_type: 'Agent', message: 'Mohon cek folder spam email Anda terlebih dahulu. Jika tidak ada, kami akan kirim ulang dari server.', timestamp: '2026-07-30T09:25:00' },
  { id: 21, ticket_id: 'HD-1019', sender: 'Tono Nugroho', sender_type: 'User', message: 'Sudah dicek folder spam, tidak ada juga. Inbox juga kosong.', timestamp: '2026-07-30T09:35:00' },
  { id: 22, ticket_id: 'HD-1019', sender: 'IT Support', sender_type: 'Agent', message: 'Baik, kami sudah kirim ulang email reset dari server langsung. Silakan cek kembali dalam 5 menit.', timestamp: '2026-07-30T10:00:00' },
  { id: 23, ticket_id: 'HD-1019', sender: 'Tono Nugroho', sender_type: 'User', message: 'Email sudah masuk, password berhasil direset dan bisa login kembali. Terima kasih!', timestamp: '2026-07-30T11:30:00' },

  // HD-1021 - Akses report tidak bisa dibuka
  { id: 24, ticket_id: 'HD-1021', sender: 'Mira Lestari', sender_type: 'User', message: 'Menu Report tidak bisa dibuka, halaman menjadi blank setelah diklik. Padahal kemarin masih bisa.', timestamp: '2026-07-31T10:00:00' },
  { id: 25, ticket_id: 'HD-1021', sender: 'IT Support', sender_type: 'Agent', message: 'Sudah dicek, role Anda saat ini tidak memiliki permission akses modul Report. Apakah Anda membutuhkan akses tersebut untuk pekerjaan sehari-hari?', timestamp: '2026-07-31T10:30:00' },
  { id: 26, ticket_id: 'HD-1021', sender: 'Mira Lestari', sender_type: 'User', message: 'Ya, saya butuh untuk generate laporan mingguan. Sudah ada persetujuan dari Pak Budi (manager saya).', timestamp: '2026-07-31T10:45:00' },
  { id: 27, ticket_id: 'HD-1021', sender: 'IT Support', sender_type: 'Agent', message: 'Sudah dikonfirmasi ke manager dan permission akses Report telah ditambahkan. Silakan logout dan login kembali.', timestamp: '2026-07-31T11:30:00' },

  // HD-1016 - Internet kantor sangat lambat
  { id: 28, ticket_id: 'HD-1016', sender: 'Sari Indah', sender_type: 'User', message: 'Koneksi internet di lantai 3 sangat lambat sejak pagi. Speed test hanya 1 Mbps, biasanya 100 Mbps.', timestamp: '2026-07-28T08:00:00' },
  { id: 29, ticket_id: 'HD-1016', sender: 'IT Support', sender_type: 'Agent', message: 'Terima kasih laporan. Apakah masalah ini hanya di lantai 3 atau lantai lain juga terdampak?', timestamp: '2026-07-28T08:15:00' },
  { id: 30, ticket_id: 'HD-1016', sender: 'Sari Indah', sender_type: 'User', message: 'Setahu saya hanya di lantai 3. Teman di lantai 2 bilang normal.', timestamp: '2026-07-28T08:20:00' },
  { id: 31, ticket_id: 'HD-1016', sender: 'IT Support', sender_type: 'Agent', message: 'Ditemukan packet storm pada switch lantai 3. Switch sudah di-restart dan konfigurasi spanning tree diperbaiki. Silakan cek kembali.', timestamp: '2026-07-28T12:00:00' },
  { id: 32, ticket_id: 'HD-1016', sender: 'Sari Indah', sender_type: 'User', message: 'Sudah normal kembali, terima kasih!', timestamp: '2026-07-28T12:10:00' },

  // HD-1015 - Akun terkunci
  { id: 33, ticket_id: 'HD-1015', sender: 'Sari Dewi', sender_type: 'User', message: 'Akun saya terkunci setelah salah memasukkan password beberapa kali. Tidak bisa login sama sekali sekarang.', timestamp: '2026-07-28T14:20:00' },
  { id: 34, ticket_id: 'HD-1015', sender: 'IT Support', sender_type: 'Agent', message: 'Baik, kami akan unlock akun Anda setelah verifikasi identitas. Mohon sebutkan nomor karyawan Anda.', timestamp: '2026-07-28T14:30:00' },
  { id: 35, ticket_id: 'HD-1015', sender: 'Sari Dewi', sender_type: 'User', message: 'Nomor karyawan saya SD-2024-089.', timestamp: '2026-07-28T14:35:00' },
  { id: 36, ticket_id: 'HD-1015', sender: 'IT Support', sender_type: 'Agent', message: 'Identitas sudah diverifikasi. Akun sudah di-unlock dari Admin Panel. Silakan reset password dan login kembali.', timestamp: '2026-07-28T15:00:00' },
];
