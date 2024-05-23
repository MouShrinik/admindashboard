const Footer = () => {
  return (
    <div className="relative bg-gray-200 shadow-md overflow-x-hidden h-25 text-white dark:bg-gray-800">
      <div className="container flex flex-col items-center justify-between p-6 mx-0 sm:space-y-0 sm:flex-row">
        <a href="#">
          <img className="w-auto h-8" src={"/logo/onigiri.svg"} alt="" />
        </a>

        <p className="text-sm text-gray-600">© Onigiri 2024. Admin Ui</p>
      </div>
    </div>
  );
};

export default Footer;
