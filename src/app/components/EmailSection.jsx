"use client";
import fiver from "../../../public/fiverr-1.svg";
import Whatsapp from "../../../public/whatsapp.svg";
import Link from "next/link";
import Image from "next/image";
import "@/app/globals.css";

const EmailSection = () => {
  const contactMethods = [
    {
      name: "My Fiverr",
      href: "https://www.fiverr.com/s/K2BYm2",
      icon: fiver,
      description: "Hire me for freelance projects",
    },
    {
      name: "My WhatsApp",
      href: "https://wa.me/message/FYPCUDSRLRNFG1",
      icon: Whatsapp,
      description: "Quick chat and instant messaging",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Background gradient */}
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-1/4 -left-4 transform -translate-x-1/2 opacity-30"></div>

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
      <h2 className="text-4xl md:text-5xl font-bold text-textmain-100 mb-4">
  Let&apos;s Connect
</h2>
<p className="text-textmain-300 text-lg max-w-2xl mx-auto">
          Ready to bring your ideas to life? I&apos;m here to help with your next
          project. Let&apos;s discuss how we can work together to achieve your
          goals.
</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 relative z-10">
        {/* Left Column - Contact Info */}
        <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-textmain-100 mb-6">
              Get in Touch
            </h3>
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <Link key={index} href={method.href} className="block group">
                  <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/20">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Image
                          className="w-12 h-12 heartbeat group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                          src={method.icon}
                          alt={`${method.name} icon`}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-textmain-100 group-hover:text-primary-400 transition-colors">
                          {method.name}
                        </h4>
                        <p className="text-textmain-300 text-sm">
                          {method.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-textmain-300 group-hover:text-primary-400 group-hover:translate-x-1 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        {/* Right Column - Catchy Quote */}
        <div className="flex items-center justify-center px-6">
          <blockquote className="text-xl sm:text-2xl italic text-textmain-200 text-center">
            &ldquo;Great design is not just what it looks like and feels like.
            Great design is how it works — and I make sure it works for
            you.&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Footer note */}
      <div className="text-center mt-12 relative z-10">
        <p className="text-textmain-300 text-sm">
          I typically respond within 24 hours. Looking forward to hearing from you!
        </p>
      </div>
    </section>
  );
};

export default EmailSection;
