import DarkMode from "./darkmode/DarkMode";

const Header = () => {
  return (
    <div className="flex justify-between items-center  p-4">
      <a href="#">
        <img className="w-auto h-8 px-2" src={"/logo/onigiri.svg"} alt="" />
      </a>

      <h1 class="bg-gradient-to-r from-sky-400 to-blue-500 inline-block text-transparent bg-clip-text text-4xl font-extrabold">
        Admin UI.
      </h1>
      <DarkMode />
    </div>
  );
};

export default Header;
