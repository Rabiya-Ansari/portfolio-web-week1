import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const categories = ["All", "Web", "UI", "Apps"];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/data/projects.json");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section className="py-12 px-6 md:px-16  text-[var(--text)]" id="projects">
      <h2
        className="text-4xl text-center font-extrabold mb-6 text-[#27A5DE]
  drop-shadow-[0_0_8px_rgba(39,165,222,0.9)]
  animate-pulse"
      >
        Projects
      </h2>

      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setVisibleCount(3);
            }}
            className={`px-5 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide border transition-all duration-300
    ${activeCategory === cat
                ? "border-[#27A5DE] text-[#27A5DE] shadow-[0_10px_20px_rgba(0,170,255,0.3)] -translate-y-1"
                : "border-white text-white hover:border-[#27A5DE] hover:text-[#27A5DE] hover:shadow-[0_10px_20px_rgba(0,170,255,0.3)] hover:-translate-y-1"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>


      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-aos="fade-up">
        {visibleProjects.map((project) => (
          <div
            key={project.id}
            className="bg-[var(--button)] shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition"
            onClick={() => openModal(project)}
          >
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">
                {project.title}
              </h3>
              <p className="text-sm text-gray-900">{project.category}</p>
            </div>
          </div>
        ))}
      </div>


      {visibleCount < filteredProjects.length && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            className="inline-block px-8 py-3 rounded-xl font-semibold uppercase tracking-wider 
  bg-transparent border border-white text-white text-sm md:text-base 
  transition-all duration-300 
  hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,170,255,0.3)] 
  hover:border-[#27A5DE] hover:text-[#27A5DE]"
          >
            Load More
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 w-full max-w-2xl p-6 rounded-lg relative text-white">
            <button
              className="absolute top-3 right-3 text-xl"
              onClick={closeModal}
            >
              <i class="ri-close-fill"></i>
            </button>
            <h3 className="text-2xl font-bold mb-4">
              {selectedProject.title}
            </h3>

            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={10}
              className="mb-4"
            >
              {selectedProject.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`Slide ${index}`}
                    className="w-full h-64 object-cover rounded-md"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <p className="text-gray-300">{selectedProject.description}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
