import React from "react";
import AddButton from "../../../../components/AddButton/AddButton";
import Logo from "../../../../images/logo-mundo-wap.jpg";
import styles from "./header.module.css";

interface HeaderProps {
  pendingCount: number;
  openModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ pendingCount, openModal }) => {
  let counterColor = "blue";
  if (pendingCount > 3 && pendingCount < 10) {
    counterColor = "green";
  } else if (pendingCount >= 10) {
    counterColor = "red";
  }

  return (
    <header className={styles.container}>
      <div className={styles.companyName}>
        <img src={Logo} className={styles.logo} />
        <h1 style={{ fontSize: "2rem", alignItems: "center" }}>
          <span style={{fontFamily: 'LogoFont', color: "var(--primaryColor)"}}>agendamentos</span>
          <span style={{fontFamily: 'Black900', color: "var(--secondaryColor)", marginRight: "0.5rem" }}>wap</span>
          <span style={{ fontSize: "1.8rem",fontWeight: "bold", color: "var(--secondaryColor)" }}>))</span>
        </h1>
      </div>
      <div>
        <div className={styles.asideContent}>
          Visitas pendentes:
          <span
            style={{
              color: counterColor,
              fontSize: "1.2rem",
              marginLeft: "0.4rem",
            }}
          >
            {pendingCount}
          </span>
          <div style={{ marginLeft: "1rem" }}>
            <AddButton onClick={openModal} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
