import styles from "../App.module.css";

const VARIAN_KATEGORI = {
  makanan: "makanan",
  minuman: "minuman",
  camilan: "camilan",
};

export default function Badge({ children, variant = "netral" }) {
  const kelasVarian = VARIAN_KATEGORI[variant] ?? variant;
  return <span className={`${styles.badge} ${styles[kelasVarian] ?? ""}`}>{children}</span>;
}
