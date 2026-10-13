import MenuCard from "./MenuCard";
import styles from "../App.module.css";

export default function MenuList({ menu, onTambah }) {
  return (
    <div className={styles.daftarMenu}>
      {menu.map((item) => (
        <MenuCard key={item.id} menu={item} onTambah={onTambah} />
      ))}
    </div>
  );
}
