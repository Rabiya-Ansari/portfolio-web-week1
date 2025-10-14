import React from "react";

function About() {
    return (
        <section
            id="about"
            className=" text-[var(--text)] py-16 px-6"
        >
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-extrabold  mb-6">
                    About Me
                </h2>
                <p className="text-lg  mb-4">
                    Hi, I’m <span className="font-semibold">Rabiya Ansari</span>, a passionate <span className="font-semibold">Front-End Developer</span> specializing in creating responsive and modern web experiences.
                </p>
                <p className="text-lg  mb-4">
                    I work with <span className="font-semibold">HTML, CSS, JavaScript, React.js</span> and design beautiful UIs using <span className="font-semibold">Tailwind CSS</span> and <span className="font-semibold">DaisyUI</span>.
                </p>
                <p className="text-lg ">
                    I enjoy turning ideas into interactive websites and crafting user-friendly interfaces that leave a lasting impression. I’m always eager to learn new technologies and take on challenging projects.
                </p>

            </div>
        </section>
    );
}

export default About;
