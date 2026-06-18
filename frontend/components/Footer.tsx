import Link from "next/link";

const footerLinks = [
  { label: "FAQ", href: "#" },
  { label: "Help Center", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Cookie Preferences", href: "#" },
  { label: "Corporate Information", href: "#" },
];

export default function Footer() {
  return (
    <footer className="mt-12 sm:mt-16 px-4 sm:px-6 lg:px-10 py-8 sm:py-10 border-t border-zinc-800">
      <p className="text-sm text-zinc-500 mb-4">
        Questions? Call 1-844-396-3388
      </p>

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-3 gap-x-6 mb-6">
        {footerLinks.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-zinc-500 hover:underline hover:text-zinc-400"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <p className="text-xs text-zinc-600">
        © {new Date().getFullYear()} NetStream, Inc.
      </p>
    </footer>
  );
}
