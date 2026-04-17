import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-50 dark:bg-gray-950 border-t border-zinc-200 dark:border-zinc-800/50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <span>
                <Image src={"/logo1.png"} width={32} height={32} alt={"Logo"} />
              </span>
              <span className="text-3xl font-black tracking-widest bg-clip-text text-teal-600 drop-shadow-sm">
                PLANOVA
              </span>
            </Link>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xs">
              Elevating your event experience with seamless planning and
              unforgettable moments. Join the community of elite event
              organizers.
            </p>
            {/* <div className="flex items-center gap-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" },
              ].map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-600 dark:hover:text-white transition-all duration-300"
                >
                  <social.icon size={18} />
                </Link>
              ))}
            </div> */}
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Find Events", href: "/#" },
                { label: "Browse Organizers", href: "/#" },
                { label: "How it Works", href: "/#" },
                { label: "Pricing Plan", href: "/#" },
                { label: "Success Stories", href: "/#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600/30" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              Support
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Help Center", href: "/#" },
                { label: "Safety Center", href: "/#" },
                { label: "Community Guidelines", href: "/#" },
                { label: "Terms of Service", href: "/#" },
                { label: "Privacy Policy", href: "/#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              Contact Us
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-600/10 flex items-center justify-center text-teal-600 shrink-0">
                  <MapPin size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                    Our Office
                  </span>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    123 Event Plaza, New York, NY 10001
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-600/10 flex items-center justify-center text-teal-600 shrink-0">
                  <Phone size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                    Phone Number
                  </span>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    +1 (555) 000-0000
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-600/10 flex items-center justify-center text-teal-600 shrink-0">
                  <Mail size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                    Email Address
                  </span>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    support@planova.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-500 dark:text-zinc-500 text-sm">
            © {currentYear}{" "}
            <span className="text-teal-600 font-bold">PLANOVA</span>. All rights
            reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link
              href="/terms"
              className="text-sm text-zinc-500 hover:text-teal-600 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-zinc-500 hover:text-teal-600 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-zinc-500 hover:text-teal-600 transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
