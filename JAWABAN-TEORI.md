

 A1

Hook tidak boleh dipanggil di dalam kondisi karena urutan pemanggilannya bisa berubah. React mengenali state dari urutan Hook saat komponen dijalankan. Jika `useState` hanya dipanggil saat `sudahLogin` benar, React bisa salah mengenali state. Panggil `useState` di awal komponen `Profil`, sebelum kondisi.

function Profil({ sudahLogin }) { 
  const [nama, setNama] = useState(""); 
  
  if (sudahLogin) { 
    // 
  } 
}


A2

`push` mengubah array lama, jadi React bisa tidak melihat perubahan. Buat array baru saat menambah data: `setItems((sebelumnya) => [...sebelumnya, baru])`. Cara ini juga memakai data state yang paling baru.

const tambah = (baru) => { 
  setItems([...items, baru]); 
};

A3

Tanpa daftar dependensi, efek berjalan setiap kali komponen dirender. Dengan `[]`, efek berjalan saat komponen pertama kali tampil. Dengan `[kota]`, efek berjalan saat komponen tampil dan setiap kali `kota` berubah. Cleanup berjalan sebelum efek dijalankan lagi dan saat komponen dihapus dari halaman.

A4

Simpan `keyword` di komponen induk karena `FilterBar` dan `DaftarMenu` sama-sama membutuhkannya. `FilterBar` memberi tahu induk tentang kata yang diketik lewat fungsi. Induk lalu mengirim nilai pencarian ke `DaftarMenu` agar daftar bisa difilter.

A5

Input disebut controlled jika nilainya   diatur oleh state React lewat `value`. Perubahan input ditangani dengan `onChange`. Satu fungsi `handleChange` bisa dipakai untuk banyak input jika setiap input punya `name` yang berbeda. Fungsi itu membaca `name` dan `value`, lalu memperbarui bagian yang sesuai di state.
