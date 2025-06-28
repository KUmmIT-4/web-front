import { useNavigate } from "react-router-dom";

import user from "@/assets/images/user.png";
import backArrow from "@/assets/images/back-arrow.png";

interface HeaderProps {
  noLogo?: boolean;
  title?: string;
  gotoHome?: () => void;
}

const renderHeaderValue = ({ noLogo, title, gotoHome }: HeaderProps) => {
  if (noLogo) {
    return (
      <header className="h-12 flex px-5 w-full items-center justify-center relative">
        <div className="flex gap-7 absolute left-5">
          <img className="w-2.5 h-4.5" src={backArrow} onClick={gotoHome} />
        </div>
        <span className="text-black text-2xl font-bold">{title}</span>
      </header>
    );
  } else {
    return (
      <header className={`h-12 flex px-5 w-full justify-between items-center`}>
        <span className="text-[var(--primary)] text-2xl font-bold">
          하루코딩
        </span>

        <div>
          <img className="size-5" src={user} />
        </div>
      </header>
    );
  }
};

function Header({ noLogo = false, title = "title" }: HeaderProps) {
  const navigate = useNavigate();

  const gotoHome = () => {
    navigate("/home");
  };
  return <>{renderHeaderValue({ noLogo, title, gotoHome })}</>;
}

export default Header;
