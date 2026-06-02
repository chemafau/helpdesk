import { Ticket, AIAnalysis } from '@/types';
import { tickets } from '@/data/tickets';
import { knowledgeBase } from '@/data/knowledge-base';

const possibleCauses: Record<string, string[]> = {
  Login: [
    'Akun terkunci setelah beberapa percobaan login gagal',
    'Password belum terupdate di sistem setelah reset',
    'Cache/Session browser masih menyimpan kredensial lama',
  ],
  Database: [
    'Query tidak menggunakan index yang optimal (Full Table Scan)',
    'Koneksi database melebihi batas maksimum (connection pool)',
    'Resource server database tidak mencukupi (CPU/Memory)',
  ],
  Application: [
    'Bug pada versi terbaru aplikasi setelah deployment',
    'Konfigurasi server atau environment yang salah',
    'Library atau dependency tidak kompatibel',
  ],
  Network: [
    'Konfigurasi jaringan yang salah (IP, DNS, Gateway)',
    'Hardware jaringan bermasalah (switch, router, access point)',
    'Pemblokiran dari firewall atau proxy perusahaan',
  ],
  Hardware: [
    'Driver perangkat perlu diperbarui atau diinstall ulang',
    'Kerusakan hardware fisik atau koneksi longgar',
    'Overheating atau masalah daya perangkat',
  ],
  Email: [
    'Konfigurasi SPF/DKIM/DMARC yang salah menyebabkan spam',
    'Filter spam terlalu agresif memblokir email legitimate',
    'Quota mailbox atau SMTP server penuh',
  ],
  Access: [
    'Role atau permission belum di-assign ke akun user',
    'Perubahan konfigurasi akses sistem setelah update',
    'User tidak memiliki hak akses yang diperlukan untuk fitur ini',
  ],
  Performance: [
    'Memory leak pada aplikasi menyebabkan degradasi performa',
    'Beban server melebihi kapasitas yang ditentukan',
    'Query database atau background job yang tidak efisien',
  ],
};

const recommendedAnswers: Record<string, string> = {
  Login:
    'Berdasarkan histori ticket sebelumnya dan SOP Login, masalah ini biasanya terjadi karena akun terkunci atau password belum terupdate di sistem.\n\nSilakan lakukan langkah berikut:\n1. Pastikan password sudah direset dan tersimpan dengan benar.\n2. Coba logout dari semua device yang sedang digunakan.\n3. Clear cache browser, lalu coba login kembali.\n\nJika masih gagal, akun Anda mungkin terkunci. Silakan hubungi tim IT untuk proses unlock akun.',

  Database:
    'Berdasarkan analisis histori ticket database dan SOP yang berlaku, masalah ini kemungkinan besar disebabkan oleh query yang tidak menggunakan index optimal.\n\nLangkah pemulihan yang disarankan:\n1. Jalankan EXPLAIN ANALYZE untuk mengidentifikasi bottleneck query.\n2. Tambahkan INDEX pada kolom yang sering digunakan sebagai filter.\n3. Hindari penggunaan SELECT * — gunakan kolom spesifik.\n4. Jika kritis, pertimbangkan untuk kill long-running query terlebih dahulu.',

  Application:
    'Berdasarkan histori ticket aplikasi, masalah ini biasanya terkait dengan bug atau konfigurasi yang salah setelah deployment.\n\nLangkah troubleshoot awal:\n1. Clear cache dan cookies browser, lalu refresh halaman.\n2. Coba gunakan browser lain atau mode incognito.\n3. Cek apakah ada update atau deployment terbaru yang bertepatan.\n4. Periksa log aplikasi (F12 > Console) untuk error detail.\n5. Eskalasi ke tim Developer jika masalah berlanjut.',

  Network:
    'Berdasarkan SOP jaringan dan histori ticket serupa, masalah ini umumnya dapat diselesaikan dengan troubleshoot jaringan dasar.\n\nLangkah yang disarankan:\n1. Restart modem/router (matikan 30 detik, hidupkan kembali).\n2. Disconnect dan reconnect ke jaringan WiFi.\n3. Coba gunakan kabel ethernet jika saat ini menggunakan WiFi.\n4. Verifikasi IP address, DNS settings, dan gateway.\n5. Hubungi tim Network jika masalah ada pada infrastruktur.',

  Hardware:
    'Berdasarkan histori ticket hardware, masalah ini perlu investigasi fisik langsung pada perangkat.\n\nLangkah awal yang bisa dilakukan:\n1. Restart perangkat yang bermasalah.\n2. Cek semua koneksi kabel dan port (pastikan tidak longgar).\n3. Update driver perangkat ke versi terbaru.\n4. Jalankan hardware diagnostic jika tersedia di BIOS/system.\n5. Koordinasikan dengan tim IT untuk pengecekan fisik langsung.',

  Email:
    'Berdasarkan SOP email dan histori ticket, masalah email umumnya terkait konfigurasi mail server atau kapasitas mailbox.\n\nLangkah troubleshoot:\n1. Cek folder spam untuk email yang mungkin terfilter.\n2. Verifikasi konfigurasi SPF, DKIM, dan DMARC record.\n3. Periksa kapasitas mailbox (tidak melebihi batas).\n4. Untuk mengirim file besar, gunakan file sharing (OneDrive/SharePoint) dan kirim link via email.',

  Access:
    'Berdasarkan SOP akses dan histori ticket, pastikan role dan permission sudah di-assign dengan benar di sistem.\n\nProsedur pemberian akses:\n1. Verifikasi identitas dan kebutuhan akses user yang bersangkutan.\n2. Dapatkan persetujuan tertulis dari atasan/manager user.\n3. Assign role yang sesuai di Admin Panel > User Management.\n4. Minta user logout dan login kembali agar permission terupdate.',

  Performance:
    'Berdasarkan histori ticket performa dan SOP monitoring, masalah ini perlu investigasi resource server secara menyeluruh.\n\nLangkah tindakan:\n1. Monitor CPU, Memory, dan Disk I/O server secara real-time.\n2. Identifikasi proses yang mengkonsumsi resource berlebihan.\n3. Kill proses yang tidak responsif atau runaway jika perlu.\n4. Pertimbangkan scaling jika beban melebihi kapasitas normal.\n5. Cek dan optimalkan query database atau background job.',
};

export function analyzeTicket(ticket: Ticket): AIAnalysis {
  const relatedSOPs = knowledgeBase
    .filter((kb) => kb.category === ticket.category)
    .slice(0, 3);

  const keywords = ticket.description.toLowerCase().split(' ');
  const keywordSOPs = knowledgeBase.filter((kb) =>
    kb.tags.some((tag) => keywords.some((kw) => kw.includes(tag)))
  );
  const allSOPs = [...new Map([...relatedSOPs, ...keywordSOPs].map((s) => [s.id, s])).values()].slice(0, 3);

  const similarTickets = tickets
    .filter(
      (t) =>
        t.ticket_id !== ticket.ticket_id &&
        t.category === ticket.category &&
        (t.status === 'Resolved' || t.status === 'Closed') &&
        t.resolution
    )
    .slice(0, 3);

  return {
    possibleCauses: possibleCauses[ticket.category] ?? [
      'Konfigurasi sistem yang tidak sesuai',
      'Bug pada aplikasi atau update terbaru',
      'Masalah konektivitas atau resource',
    ],
    recommendedAnswer:
      recommendedAnswers[ticket.category] ??
      'Silakan jelaskan masalah lebih detail agar tim IT dapat membantu dengan tepat. Sertakan screenshot jika memungkinkan.',
    similarTickets,
    relatedSOPs: allSOPs,
  };
}
