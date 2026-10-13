import { useEffect, useRef, useState } from "react";
import { semuaMenu } from "./data/menu";
import FilterBar from "./components/FilterBar";
import FormTambahMenu from "./components/FormTambahMenu";
import Keranjang from "./components/Keranjang";
import MenuList from "./components/MenuList";
import TimerSesi from "./components/TimerSesi";
import styles from "./App.module.css";

const KUNCI_KERANJANG = "kantinkita:keranjang:v1";

function bacaKeranjang() {
  const tersimpan = window.localStorage.getItem(KUNCI_KERANJANG);
  if (!tersimpan) return [];

  try {
    const data = JSON.parse(tersimpan);
    if (!Array.isArray(data)) {
      console.error("Data keranjang di localStorage bukan sebuah daftar.");
      return [];
    }

    const keranjangValid = data.filter(
      (item) =>
        item &&
        Number.isInteger(item.id) &&
        typeof item.nama === "string" &&
        Number.isFinite(item.harga) &&
        item.harga >= 0 &&
        Number.isInteger(item.qty) &&
        item.qty > 0
    );

    if (keranjangValid.length !== data.length) {
      console.error("Sebagian data keranjang di localStorage tidak valid.");
    }

    return keranjangValid;
  } catch (error) {
    console.error("Data keranjang di localStorage tidak dapat dibaca.", error);
    return [];
  }
}

function formatKategori(kategori) {
  return kategori.charAt(0).toUpperCase() + kategori.slice(1);
}

export default function App() {
  const [menu, setMenu] = useState(semuaMenu);
  const [kataKunci, setKataKunci] = useState("");
  const [kategoriAktif, setKategoriAktif] = useState("semua");
  const [keranjang, setKeranjang] = useState(bacaKeranjang);
  const [timerDitampilkan, setTimerDitampilkan] = useState(true);
  const [detikSesi, setDetikSesi] = useState(0);
  const waktuMulaiSesi = useRef(Date.now());
  const idMenuBerikutnya = useRef(
    Math.max(0, ...semuaMenu.map((item) => item.id), ...keranjang.map((item) => item.id)) + 1
  );

  const kategori = Array.from(new Set(menu.map((item) => item.kategori)));
  const jumlahPerKategori = Object.fromEntries(
    kategori.map((namaKategori) => [
      namaKategori,
      menu.filter((item) => item.kategori === namaKategori).length,
    ])
  );
  const jumlahSemuaMenu = menu.length;
  const jumlahItem = keranjang.reduce((jumlah, item) => jumlah + item.qty, 0);

  const menuDitampilkan = menu.filter((item) => {
    const cocokNama = item.nama.toLowerCase().includes(kataKunci.trim().toLowerCase());
    const cocokKategori = kategoriAktif === "semua" || item.kategori === kategoriAktif;
    return cocokNama && cocokKategori;
  });

  useEffect(() => {
    window.localStorage.setItem(KUNCI_KERANJANG, JSON.stringify(keranjang));
  }, [keranjang]);

  useEffect(() => {
    document.title = jumlahItem > 0 ? `(${jumlahItem}) KantinKita` : "KantinKita";
  }, [jumlahItem]);

  const tambahKeKeranjang = (menuPilihan) => {
    setKeranjang((sebelumnya) => {
      const sudahAda = sebelumnya.some((item) => item.id === menuPilihan.id);
      if (sudahAda) {
        return sebelumnya.map((item) =>
          item.id === menuPilihan.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [
        ...sebelumnya,
        {
          id: menuPilihan.id,
          nama: menuPilihan.nama,
          harga: menuPilihan.harga,
          qty: 1,
        },
      ];
    });
  };

  const ubahJumlah = (id, perubahan) => {
    setKeranjang((sebelumnya) =>
      sebelumnya.flatMap((item) => {
        if (item.id !== id) return [item];
        const qtyBaru = item.qty + perubahan;
        return qtyBaru > 0 ? [{ ...item, qty: qtyBaru }] : [];
      })
    );
  };

  const hapusDariKeranjang = (id) => {
    setKeranjang((sebelumnya) => sebelumnya.filter((item) => item.id !== id));
  };

  const hapusDenganKonfirmasi = (item) => {
    const disetujui = window.confirm(`Hapus ${item.nama} dari keranjang?`);
    if (disetujui) hapusDariKeranjang(item.id);
  };

  const tambahMenu = (menuBaru) => {
    const menuDenganId = { ...menuBaru, id: idMenuBerikutnya.current };
    idMenuBerikutnya.current += 1;
    setMenu((sebelumnya) => [...sebelumnya, menuDenganId]);
  };

  const keteranganKosong = () => {
    const filterAktif = [
      ...(kataKunci.trim() ? [`kata kunci "${kataKunci.trim()}"`] : []),
      ...(kategoriAktif !== "semua"
        ? [`kategori "${formatKategori(kategoriAktif)}"`]
        : []),
    ];

    if (filterAktif.length === 0) return "Belum ada menu untuk ditampilkan.";
    return `Tidak ada menu yang cocok dengan ${filterAktif.join(" dan ")}.`;
  };

  return (
    <div className={styles.halaman}>
      <header className={styles.header}>
        <div className={styles.identitas}>
          <span className={styles.logo} aria-hidden="true">KK</span>
          <div>
            <h1>KantinKita</h1>
          </div>
        </div>
        <div className={styles.sesi}>
          {timerDitampilkan && (
            <TimerSesi
              detikBerlalu={detikSesi}
              onDetikBerjalan={setDetikSesi}
              waktuMulai={waktuMulaiSesi.current}
            />
          )}
          <button
            className={styles.tombolTimer}
            type="button"
            onClick={() => setTimerDitampilkan((ditampilkan) => !ditampilkan)}
          >
            {timerDitampilkan ? "Sembunyikan timer" : "Tampilkan timer"}
          </button>
        </div>
      </header>

      <main className={styles.konten}>
        <div className={styles.tataLetak}>
          <div className={styles.kolomMenu}>
            <section className={styles.katalog} aria-labelledby="judul-menu">
              <div className={styles.judulBagian}>
                <div>
                  <h2 id="judul-menu">Jelajahi menu</h2>
                </div>
                <span className={styles.jumlahMenu}>{jumlahSemuaMenu} menu</span>
              </div>

              <FilterBar
                kataKunci={kataKunci}
                onKataKunciChange={setKataKunci}
                kategori={kategori}
                kategoriAktif={kategoriAktif}
                onKategoriChange={setKategoriAktif}
                jumlahPerKategori={jumlahPerKategori}
                jumlahSemuaMenu={jumlahSemuaMenu}
              />

              {menuDitampilkan.length === 0 ? (
                <p className={styles.kosongMenu} role="status">{keteranganKosong()}</p>
              ) : (
                <MenuList menu={menuDitampilkan} onTambah={tambahKeKeranjang} />
              )}
            </section>

            <FormTambahMenu kategori={kategori} onTambah={tambahMenu} />
          </div>

          <aside className={styles.kolomKeranjang} aria-label="Ringkasan pesanan">
            <Keranjang
              keranjang={keranjang}
              onUbahJumlah={ubahJumlah}
              onHapus={hapusDenganKonfirmasi}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}
