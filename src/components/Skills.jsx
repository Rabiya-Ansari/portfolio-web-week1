import { useState, useEffect, useRef } from "react";

const categories = ["All", "Frontend", "Tools"];

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [activeCat, setActiveCat] = useState("All");
  const sectionRef = useRef(null);
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    fetch("/data/skillsData.json")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error("Error:", err));
  }, []);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimateBars(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
  }, []);

  const filteredSkills =
    activeCat === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCat);

  return (
    <section
      ref={sectionRef}
      className="py-16 px-6 md:px-20 text-white"
      id="skills"
    >
      <h2 className="text-3xl font-bold text-center mb-6">Skills</h2>

      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${activeCat === cat
                ? "bg-gradient-to-r from-[#135169] via-[#25F3FA] text-black border-transparent"
                : "bg-transparent border-gray-500 text-gray-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>



      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="bg-gray-800 p-4 rounded-lg relative"  data-aos="fade-right"
          >
            <div className="flex justify-between mb-2" > 
              <span className="font-semibold">{skill.name}</span>
              <span>{skill.level}%</span>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#135169] via-[#25F3FA] h-3 rounded-full transition-all duration-1000"
                style={{
                  width: animateBars ? `${skill.level}%` : "0%",
                }}
              ></div>
            </div>

            <div className="absolute hidden group-hover:block bg-gray-900 text-sm text-gray-300 p-2 rounded-md top-full mt-2 w-full z-50">
              {skill.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
