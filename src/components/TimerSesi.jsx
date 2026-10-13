import { useEffect } from "react";
import styles from "../App.module.css";

function hitungDetikSesi(waktuMulai) {
  return Math.floor((Date.now() - waktuMulai) / 1000);
}

export default function TimerSesi({ detikBerlalu, onDetikBerjalan, waktuMulai }) {
  useEffect(() => {
    onDetikBerjalan(hitungDetikSesi(waktuMulai));

    const intervalId = window.setInterval(() => {
      onDetikBerjalan(hitungDetikSesi(waktuMulai));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [onDetikBerjalan, waktuMulai]);

  const menit = Math.floor(detikBerlalu / 60).toString().padStart(2, "0");
  const detik = (detikBerlalu % 60).toString().padStart(2, "0");

  return (
    <div className={styles.timer} aria-label={`Lama sesi ${menit}:${detik}`}>
      <span className={styles.titik} aria-hidden="true" />
      <span>Sesi</span>
      <strong>{menit}:{detik}</strong>
    </div>
  );
}
