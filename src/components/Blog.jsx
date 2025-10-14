import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const categories = ["All", "Frontend", "Backend", "UI/UX"];

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
      <h2 className="text-3xl font-bold text-center mb-6">Blog</h2>


      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search blog..."
          className="w-full md:w-1/2 p-3 rounded-md bg-gray-800 border border-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>


      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>


      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/blog/${blog.id}`)}
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <span className="text-sm text-blue-400">{blog.category}</span>
              <h3 className="text-lg font-semibold mt-2">{blog.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{blog.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
