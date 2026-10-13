import { useRef } from "react";
import styles from "../App.module.css";

function judulKategori(kategori) {
  return kategori.charAt(0).toUpperCase() + kategori.slice(1);
}

export default function FilterBar({
  kataKunci,
  onKataKunciChange,
  kategori,
  kategoriAktif,
  onKategoriChange,
  jumlahPerKategori,
  jumlahSemuaMenu,
}) {
  const inputRef = useRef(null);

  const bersihkanPencarian = () => {
    onKataKunciChange("");
    inputRef.current?.focus();
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.barisCari}>
        <label className={styles.labelCari} htmlFor="cari-menu">Cari menu</label>
        <div className={styles.kotakCari}>
          <span className={styles.ikonCari} aria-hidden="true">⌕</span>
          <input
            ref={inputRef}
            id="cari-menu"
            type="search"
            value={kataKunci}
            onChange={(event) => onKataKunciChange(event.target.value)}
            placeholder="Contoh: nasi goreng"
          />
          {kataKunci && (
            <button
              className={styles.tombolBersihkan}
              type="button"
              onClick={bersihkanPencarian}
            >
              Bersihkan
            </button>
          )}
        </div>
      </div>

      <div className={styles.filterKategori}>
        <span className={styles.labelKategori}>Kategori</span>
        <div className={styles.daftarFilter} role="group" aria-label="Filter kategori menu">
          <button
            type="button"
            className={`${styles.tombolFilter} ${kategoriAktif === "semua" ? styles.aktif : ""}`}
            aria-pressed={kategoriAktif === "semua"}
            onClick={() => onKategoriChange("semua")}
          >
            Semua <span>{jumlahSemuaMenu}</span>
          </button>
          {kategori.map((namaKategori) => (
            <button
              key={namaKategori}
              type="button"
              className={`${styles.tombolFilter} ${kategoriAktif === namaKategori ? styles.aktif : ""}`}
              aria-pressed={kategoriAktif === namaKategori}
              onClick={() => onKategoriChange(namaKategori)}
            >
              {judulKategori(namaKategori)} <span>{jumlahPerKategori[namaKategori]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
