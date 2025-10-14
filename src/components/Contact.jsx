import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form Submitted Successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white">
          Contact Me
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white resize-none"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
            >
              Send Message
            </button>
          </form>


          <div className="space-y-6">
            <div className="w-full h-128 overflow-hidden rounded-xl shadow-lg">
              <iframe
                title="Google Map"
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.9345!2d67.0470!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDUxJzM4LjUiTiA2N8KwMDInNTYuMCJF!5e0!3m2!1sen!2s!4v0000000000"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            <div className="flex space-x-6 justify-center md:justify-start">
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 text-2xl hover:text-blue-500 transition"
              >
                <i class="ri-global-line"></i>
              </a>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 text-2xl hover:text-pink-500 transition"
              >
              <i class="ri-instagram-line"></i>
              </a>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 text-2xl hover:text-blue-400 transition"
              >
               <i class="ri-linkedin-box-line"></i>
              </a>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 text-2xl hover:text-red-500 transition"
              >
                <i class="ri-mail-line"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
