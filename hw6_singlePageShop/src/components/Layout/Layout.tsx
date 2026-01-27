import React from "react";
import { Outlet } from 'react-router';
import Header from "../Header";
import styles from "../../styles/Layout.module.css";

const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet /> {/* Здесь рендерятся страницы */}
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; 2025 Магазин товаров. Все права защищены.</p>
          <p>Создано с ❤️ на OTUS JavaScript Pro</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
