import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [toc, setToc] = useState([]);
  const [readingTime, setReadingTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const articleRef = useRef(null);


  useEffect(() => {
    let mounted = true;
    fetch("/data/blogData.json")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        const found = data.find((b) => String(b.id) === String(id));
        setPost(found || null);
      })
      .catch((err) => {
        console.error("Error loading blog data:", err);
      });
    return () => { mounted = false; };
  }, [id]);

  useEffect(() => {
    if (!post) return;


    const textForCount = (post.content || "") + " " + (post.excerpt || "");
    const words = textForCount.trim().split(/\s+/).filter(Boolean).length;
    setReadingTime(Math.max(1, Math.round(words / 200)));

    const content = post.content || "";
    const hasH2 = /<h2[^>]*>/.test(content);

    if (hasH2) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const headers = Array.from(doc.querySelectorAll("h2"));
      const newToc = headers.map((h, idx) => {
        const text = h.textContent.trim();
        const anchor = `toc-${idx}`;
        h.setAttribute("id", anchor);
        return { id: anchor, text };
      });
      setToc(newToc);

      setPost((prev) => ({ ...prev, content: doc.body.innerHTML }));
      return;
    }

    const parts = content.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    if (parts.length > 1) {
      const newToc = parts.map((p, idx) => ({ id: `part-${idx}`, text: `Part ${idx + 1}` }));
      setToc(newToc);

      const html = parts.map((p, idx) => `<h2 id="part-${idx}">Part ${idx + 1}</h2><p>${p}</p>`).join("");
      setPost((prev) => ({ ...prev, content: html }));
      return;
    }

    setToc([]);
  }, [post]);

  useEffect(() => {
    function onScroll() {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY - (el.offsetTop - document.querySelector("header")?.offsetHeight || 0);
      const pct = Math.max(0, Math.min(100, (scrolled / total) * 100));
      setProgress(isFinite(pct) ? pct : 0);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [post]);

  if (post === null) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-black text-white">
        <div>
          <p className="text-center text-gray-400">Post not found.</p>
          <div className="text-center mt-4">
            <button onClick={() => navigate(-1)} className="px-4 py-2 bg-blue-600 rounded text-white">Go back</button>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {

    return (
      <div
        className="min-h-[60vh] flex items-center justify-center bg-black text-white">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <main
      style={{
        backgroundImage: "url('/media/bg-image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="bg-gradient-to-b from-[#302b63] to-[#0f0c29] text-white min-h-screen">


      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold uppercase tracking-wider 
  bg-transparent border border-white text-white text-sm md:text-base 
  transition-all duration-300 
  hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,170,255,0.3)] 
  hover:border-[#27A5DE] hover:text-[#27A5DE]"
        >
          ← Back
        </button>

      </div>

      {/* Hero / Banner */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded overflow-hidden shadow-lg">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            srcSet={`${post.image} 1200w, ${post.image} 800w`}
            sizes="(max-width: 768px) 100vw, 800px"
            className="w-full h-64 object-cover rounded"
          />
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-3 text-lg  text-white bg-clip-text text-transparent bg-gradient-to-r from-[#135169] via-[#25F3FA]">
            {post.category}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mt-3">{post.title}</h1>
          <div className="mt-2 text-sm text-gray-300">
            <span>⏱ {readingTime} min read</span>
          </div>
        </div>
      </header>


      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 grid md:grid-cols-[220px_1fr] gap-8">

        {toc.length > 0 && (
          <aside className="hidden md:block sticky top-24 h-fit self-start">
            <div className="bg-[#0f0c29]/90 p-4 rounded-md text-sm text-gray-300">
              <strong className="block mb-2 text-white">Contents</strong>
              <ul className="space-y-2">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const target = document.getElementById(t.id);
                        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className="hover:text-gradient hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-[#135169] hover:via-[#25F3FA] transition"
                    >
                      {t.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}

        <article ref={articleRef} className="prose prose-invert max-w-none text-gray-100">
          {/<[a-z][\s\S]*>/i.test(post.content || "") ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            (post.content || "").split(/\n\s*\n/).map((p, idx) => (
              <p key={idx} className="mb-4 text-gray-200">{p}</p>
            ))
          )}
        </article>
      </div>
    </main>

  );
};

export default BlogDetail;
