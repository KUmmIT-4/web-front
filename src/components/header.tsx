import hamburger from "@/assets/images/hamburger.png";
import user from "@/assets/images/user.png";

function Header() {
  return (
    <header className="h-12 flex px-5 justify-between w-full items-center">
      <span className="text-[var(--primary)] text-2xl font-bold">하루코딩</span>
      <div className="flex gap-7">
        <img className="size-5" src={user} />
        <img className="size-5" src={hamburger} />
      </div>
    </header>
  );
}

export default Header;
