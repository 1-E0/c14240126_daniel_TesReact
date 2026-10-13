import { useState } from "react";
import styles from "../App.module.css";

const FORM_KOSONG = {
  nama: "",
  kategori: "",
  harga: "",
  stok: "",
};

export default function FormTambahMenu({ kategori, onTambah }) {
  const [form, setForm] = useState(FORM_KOSONG);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((sebelumnya) => ({ ...sebelumnya, [name]: value }));
    setErrors((sebelumnya) => {
      if (!sebelumnya[name]) return sebelumnya;
      const { [name]: dihapus, ...sisa } = sebelumnya;
      return sisa;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const hargaAngka = Number(form.harga);
    const stokAngka = Number(form.stok);
    const errorBaru = {};

    if (form.nama.trim().length < 3) {
      errorBaru.nama = "Nama menu harus terdiri dari minimal 3 karakter.";
    }
    if (!form.kategori) {
      errorBaru.kategori = "Pilih kategori menu.";
    }
    if (!form.harga || !Number.isInteger(hargaAngka) || hargaAngka <= 0) {
      errorBaru.harga = "Harga harus berupa bilangan bulat lebih dari 0.";
    }
    if (
      form.stok === "" ||
      !Number.isInteger(stokAngka) ||
      stokAngka < 0
    ) {
      errorBaru.stok = "Stok harus berupa bilangan bulat dan tidak boleh negatif.";
    }

    setErrors(errorBaru);
    if (Object.keys(errorBaru).length > 0) return;

    onTambah({
      nama: form.nama.trim(),
      kategori: form.kategori,
      harga: hargaAngka,
      stok: stokAngka,
    });
    setForm(FORM_KOSONG);
    setErrors({});
  };

  return (
    <section className={styles.formPanel} aria-labelledby="judul-form-menu">
      <div className={styles.formKepala}>
        <div>
          <h2 id="judul-form-menu">Tambah menu</h2>
        </div>
        <span className={styles.ikonTambah} aria-hidden="true">＋</span>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label htmlFor="nama-menu">Nama menu</label>
          <input
            id="nama-menu"
            name="nama"
            type="text"
            value={form.nama}
            onChange={handleChange}
            placeholder="Contoh: Nasi Uduk"
            aria-invalid={Boolean(errors.nama)}
            aria-describedby={errors.nama ? "error-nama-menu" : undefined}
          />
          {errors.nama && <span className={styles.error} id="error-nama-menu" role="alert">{errors.nama}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="kategori-menu">Kategori</label>
          <select
            id="kategori-menu"
            name="kategori"
            value={form.kategori}
            onChange={handleChange}
            aria-invalid={Boolean(errors.kategori)}
            aria-describedby={errors.kategori ? "error-kategori-menu" : undefined}
          >
            <option value="">Pilih kategori</option>
            {kategori.map((namaKategori) => (
              <option key={namaKategori} value={namaKategori}>
                {namaKategori.charAt(0).toUpperCase() + namaKategori.slice(1)}
              </option>
            ))}
          </select>
          {errors.kategori && <span className={styles.error} id="error-kategori-menu" role="alert">{errors.kategori}</span>}
        </div>

        <div className={styles.barisAngka}>
          <div className={styles.field}>
            <label htmlFor="harga-menu">Harga (Rp)</label>
            <input
              id="harga-menu"
              name="harga"
              type="number"
              min="1"
              step="1"
              value={form.harga}
              onChange={handleChange}
              placeholder="15000"
              aria-invalid={Boolean(errors.harga)}
              aria-describedby={errors.harga ? "error-harga-menu" : undefined}
            />
            {errors.harga && <span className={styles.error} id="error-harga-menu" role="alert">{errors.harga}</span>}
          </div>
          <div className={styles.field}>
            <label htmlFor="stok-menu">Stok</label>
            <input
              id="stok-menu"
              name="stok"
              type="number"
              min="0"
              step="1"
              value={form.stok}
              onChange={handleChange}
              placeholder="10"
              aria-invalid={Boolean(errors.stok)}
              aria-describedby={errors.stok ? "error-stok-menu" : undefined}
            />
            {errors.stok && <span className={styles.error} id="error-stok-menu" role="alert">{errors.stok}</span>}
          </div>
        </div>

        <button className={styles.tombolSimpan} type="submit">Simpan menu</button>
      </form>
    </section>
  );
}
