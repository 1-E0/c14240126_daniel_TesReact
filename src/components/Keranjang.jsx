import Badge from "./Badge";
import styles from "../App.module.css";

const FORMAT_RUPIAH = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export default function Keranjang({ keranjang, onUbahJumlah, onHapus }) {
  const jumlahItem = keranjang.reduce((jumlah, item) => jumlah + item.qty, 0);
  const totalHarga = keranjang.reduce((total, item) => total + item.harga * item.qty, 0);

  return (
    <section aria-labelledby="judul-keranjang">
      <div className={styles.keranjangKepala}>
        <div>
          <p className={styles.labelBagian}>PESANANMU</p>
          <h2 id="judul-keranjang">Keranjang</h2>
        </div>
        <Badge variant="netral">{jumlahItem} item</Badge>
      </div>

      {keranjang.length === 0 ? (
        <div className={styles.kosongKeranjang}>
          <span className={styles.ikonKosong} aria-hidden="true">＋</span>
          <p>Keranjangmu masih kosong.</p>
          <span>Pilih menu untuk mulai memesan.</span>
        </div>
      ) : (
        <>
          <ul className={styles.daftarKeranjang}>
            {keranjang.map((item) => (
              <li className={styles.barisItem} key={item.id}>
                <div className={styles.rincianItem}>
                  <h3>{item.nama}</h3>
                  <p>{FORMAT_RUPIAH.format(item.harga * item.qty)}</p>
                </div>
                <div className={styles.aksiItem}>
                  <div className={styles.pengaturJumlah} aria-label={`Jumlah ${item.nama}`}>
                    <button
                      type="button"
                      aria-label={`Kurangi ${item.nama}`}
                      onClick={() => onUbahJumlah(item.id, -1)}
                    >
                      −
                    </button>
                    <span aria-live="polite">{item.qty}</span>
                    <button
                      type="button"
                      aria-label={`Tambah ${item.nama}`}
                      onClick={() => onUbahJumlah(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className={styles.tombolHapus}
                    type="button"
                    onClick={() => onHapus(item)}
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.ringkasan}>
            <div className={styles.rincianTotal}>
              <span>Jumlah item</span>
              <strong>{jumlahItem}</strong>
            </div>
            <div className={styles.rincianTotal}>
              <span>Total</span>
              <strong>{FORMAT_RUPIAH.format(totalHarga)}</strong>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
