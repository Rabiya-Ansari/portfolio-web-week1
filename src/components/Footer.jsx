import React from "react";

function Footer() {
  return (
    <footer className="bg-[#000C24] backdrop-blur-md border-t border-white/20 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-white">

        <div>
          <h2 className="text-2xl font-bold"><i class="ri-macbook-line"></i>RabiyaAnsari.</h2>
          <p className="text-sm mt-2 text-gray-300">
            I’m a passionate frontend developer who loves turning creative ideas into responsive, user-friendly websites.
            I build clean, accessible interfaces with modern design principles and smooth interactions.
            Every project I work on is crafted to be fast, functional, and visually engaging, leaving a lasting impression.
          </p>
        </div>


        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#projects" className="hover:text-white">Projects</a></li>
            <li><a href="#blog" className="hover:text-white">Blog</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>


        <div>
          <h3 className="font-semibold text-lg mb-3">Connect</h3>
          <div className="flex space-x-4">

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-white/20 hover:border-[#27A5DE] hover:text-[#27A5DE] hover:scale-110 hover:shadow-[0_10px_20px_rgba(0,170,255,0.3)]transition"
            >
              <i className="ri-facebook-circle-line text-xl"></i>
            </a>


            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-white/20 hover:border-[#27A5DE] hover:text-[#27A5DE] hover:scale-110 hover:shadow-[0_10px_20px_rgba(0,170,255,0.3)] transition"
            >
              <i className="ri-github-fill text-xl"></i>
            </a>


            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-white/20 hover:border-[#27A5DE] hover:text-[#27A5DE] hover:scale-110 hover:shadow-[0_10px_20px_rgba(0,170,255,0.3)] transition"
            >
              <i className="ri-linkedin-box-fill text-xl"></i>
            </a>


            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-white/20 hover:border-[#27A5DE] hover:text-[#27A5DE] hover:scale-110 hover:shadow-[0_10px_20px_rgba(0,170,255,0.3)] transition"
            >
              <i className="ri-twitter-x-line text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center py-4 border-t border-white/10 text-gray-300 text-sm">
        © {new Date().getFullYear()} RabiyaAnsari. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
