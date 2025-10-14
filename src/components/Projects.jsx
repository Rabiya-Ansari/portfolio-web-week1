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
      <h2 className="text-3xl font-bold text-center mb-6">Projects</h2>

      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setVisibleCount(3);
            }}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300
    ${activeCategory === cat
                ? "bg-[var(--button)] text-white border-[var(--accent)]"
                : "bg-transparent border-gray-500 text-gray-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>


      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-800 shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition"
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
              <p className="text-sm text-gray-400">{project.category}</p>
            </div>
          </div>
        ))}
      </div>


      {visibleCount < filteredProjects.length && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            className="bg-[var(--button)] border-gray-500 text-gray-300 hover:border-[var(--accent)] hover:text-[var(--accent)] px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300"
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
