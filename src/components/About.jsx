import React from "react";

function About() {
    return (
        <div
            id="about"
            className=" text-[var(--text)] py-16 px-6"
        >
            <div className="max-w-4xl mx-auto text-center" >
                <h2
                    className="text-4xl font-extrabold mb-6 text-[#27A5DE]
  drop-shadow-[0_0_8px_rgba(39,165,222,0.9)]
  animate-pulse"
                >
                    About Me
                </h2>
                <p className="text-lg mb-4" data-aos="fade-right">
                    Hi, I’m <span className="font-semibold">Rabiya Ansari</span>, a passionate <span className="font-semibold">Front-End Developer</span> dedicated to building responsive, modern, and accessible web experiences that delight users.
                </p>
                <p className="text-lg mb-4" data-aos="fade-left">
                    I specialize in <span className="font-semibold">HTML, CSS, JavaScript, and React.js</span>, and I design clean, interactive UIs using <span className="font-semibold">Tailwind CSS</span> and <span className="font-semibold">DaisyUI</span>. I love blending creativity with code to craft visually appealing websites.
                </p>
                <p className="text-lg" data-aos="fade-left">
                    Beyond coding, I focus on creating seamless user experiences, optimizing performance, and ensuring accessibility. I’m constantly exploring new tools and frameworks to stay ahead in the ever-evolving world of frontend development, turning ideas into interactive, user-friendly websites that leave a lasting impression.
                </p>
            </div>
        </div>
    );
}

export default About;
