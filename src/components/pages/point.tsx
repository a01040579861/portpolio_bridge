import { Mail, Github, Instagram } from "lucide-react";

const CONTACTS = [
  {
    icon: <Github size={40} />, // lucide-react
    label: "GitHub",
    value: "LSI",
    link: "https://github.com/a01040579861",
  },
  {
    icon: <Mail size={40} />,
    label: "Gmail",
    value: "a01040579861@gmail.com",
    link: "mailto:a01040579861@gmail.com",
  },
  {
    icon: <Instagram size={40} />,
    label: "Instagram",
    value: "@184_ll",
    link: "https://instagram.com/184_ll",
  },
];

const Point = () => {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-[var(--light)] px-6 bg-transparent">
      <h2
        className="text-5xl md:text-7xl font-extrabold mb-12 text-center drop-shadow-[0_0_16px_#a259ff] cursor-default"
        style={{
          textShadow: "0 0 16px #a259ff, 0 0 32px #fff, 0 0 2px #fff",
        }}
      >
        Contact
      </h2>
      <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-center">
        {CONTACTS.map((item) => (
          <a
            key={item.label}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center p-8 rounded-2xl bg-[rgba(30,0,50,0.4)] border-2 border-[var(--sub2)] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_32px_8px_#a259ff]"
            style={{ minWidth: 200 }}
          >
            <span className="mb-4 text-[var(--sub2)] drop-shadow-[0_0_8px_#a259ff] transition-all duration-300 group-hover:text-[#fff] group-hover:drop-shadow-[0_0_16px_#a259ff]">
              {item.icon}
            </span>
            <span className="text-2xl font-bold mb-2 text-[var(--sub2)] tracking-wider">
              {item.label}
            </span>
            <span
              className="text-lg text-[var(--light)] opacity-80 group-hover:opacity-100 select-all"
              style={{
                textShadow: "0 0 8px #a259ff, 0 0 16px #fff, 0 0 2px #fff",
              }}
            >
              {item.value}
            </span>
          </a>
        ))}
      </div>
      <div className="mt-16 text-center text-[var(--sub2)] opacity-70 text-lg select-none">
        © {new Date().getFullYear()} Seongil Lee. All rights reserved.
      </div>
    </section>
  );
};

export default Point;
