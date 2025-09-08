function Footer() {
  return (
    <>
      <footer className="bg-transparent backdrop-blur-lg rounded-sm shadow-md dark:bg-transparent mt-12 pt-12 border-t border-gray-300">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-black">
              TopVents
            </span>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-black sm:mb-0 dark:text-black">
              <li>
                <a
                  href="/events"
                  className="hover:underline hover:text-green-700 me-4 md:me-6"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="/holidays"
                  className="hover:underline hover:text-green-700 me-4 md:me-6"
                >
                  Holidays
                </a>
              </li>
              <li>
                <a
                  href="/hotels"
                  className="hover:underline hover:text-green-700 me-4 md:me-6"
                >
                  Hotels
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-300 sm:mx-auto dark:border-gray-700 lg:my-8 shadow-md" />
          <span className="block text-sm text-black sm:text-center dark:text-black">
            © 2025{" "}
            <a
              href="https://flowbite.com/"
              className="hover:underline text-black"
            >
              TopVents™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
