import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const Header: FC = () => {
  const { i18n } = useTranslation();

  const switchToRussian = () => {
    i18n.changeLanguage("ru");
  };

  const switchToKazakh = () => {
    i18n.changeLanguage("kk");
  };

  const switchToEnglish = () => {
    i18n.changeLanguage("en");
  };

  return (
    <header style={{}}>
      <Link href={"/transactions"} style={{ marginRight: "20px" }}>
        Home
      </Link>
      <div style={{ marginRight: "auto" }}>Список транзакций</div>
      <div style={{ marginRight: "20px" }}>
        <button onClick={switchToRussian} style={{ marginRight: "10px" }}>
          RU
        </button>
        <button onClick={switchToKazakh} style={{ marginRight: "10px" }}>
          KZ
        </button>
        <button onClick={switchToEnglish}>EN</button>
      </div>
    </header>
  );
};

export default Header;
