import React, { useState, useEffect } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = ["home", "about", "projects", "skills", "blog", "contact"];


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollProgress(scrolled);

      for (let item of navItems) {
        const section = document.getElementById(item);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) {
            setActiveSection(item);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      <div
        className="h-1 bg-gradient-to-r from-[var(--text)] via-[#27A5DE]"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <div className="bg-transparent backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center h-16 px-4">
          <h1 className="font-bold text-2xl text-white"><i class="ri-macbook-line"></i>RabiyaAnsari</h1>

          <nav>
            <ul
              className={`${menuOpen ? "flex bg-[#135169] " : "hidden"
                } md:flex flex-col md:flex-row gap-4 absolute md:static right-4 top-16 md:top-0 p-4 md:p-0 `}
            >
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className={`text-white font-medium relative transition-all duration-300 ${activeSection === item
                        ? "after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#135169] after:via-[#25F3FA]"
                        : "hover:text-[#25F3FA]"
                      }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              className="md:hidden p-2 text-white text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className="ri-menu-line"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
