import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const categories = ["All", "Frontend", "UI"];

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/data/blogData.json")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error loading blogs:", err));
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      activeCategory === "All" || blog.category === activeCategory;
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-16 px-6 md:px-20 text-white" id="blog">
      <h2
        className="text-4xl text-center font-extrabold mb-6 text-[#27A5DE]
  drop-shadow-[0_0_8px_rgba(39,165,222,0.9)]
  animate-pulse"
      >
        Blogs
      </h2>


      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search blog..."
          className="w-full md:w-1/2 p-3 rounded-md  border border-[#27A5DE]  "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>


      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
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
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-[var(--button)] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/blog/${blog.id}`)}
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <span className="text-lg text-white">{blog.category}</span>
              <h3 className="text-lg font-semibold mt-2">{blog.title}</h3>
              <p className="text-gray-900 text-sm mt-1">{blog.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
