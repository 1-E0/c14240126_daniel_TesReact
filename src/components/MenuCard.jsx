import Badge from "./Badge";
import styles from "../App.module.css";

const FORMAT_RUPIAH = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export default function MenuCard({ menu, onTambah }) {
  const habis = menu.stok === 0;

  return (
    <article className={`${styles.kartu} ${habis ? styles.kartuHabis : ""}`}>
      <div className={styles.barisBadge}>
        <Badge variant={menu.kategori}>{menu.kategori}</Badge>
        <Badge variant={habis ? "habis" : "tersedia"}>
          {habis ? "Habis" : `Stok ${menu.stok}`}
        </Badge>
      </div>
      <div className={styles.info}>
        <h3>{menu.nama}</h3>
        <p className={styles.harga}>{FORMAT_RUPIAH.format(menu.harga)}</p>
      </div>
      <button
        className={styles.tombolTambah}
        type="button"
        disabled={habis}
        onClick={() => onTambah(menu)}
      >
        {habis ? "Stok habis" : "Tambah"}
        {!habis && <span aria-hidden="true">+</span>}
      </button>
    </article>
  );
}
