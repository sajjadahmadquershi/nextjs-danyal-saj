"use client";
import fiver from "../../../public/fiverr-1.svg";
import Whatsapp from "../../../public/whatsapp.svg";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import '@/app/globals.css';

const Section = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add your form submission logic here
  };

  const contactMethods = [
    {
      name: "My Fiverr",
      href: "https://www.fiverr.com/s/K2BYm2",
      icon: fiver,
      description: "Hire me for freelance projects"
    },
    {
      name: "My WhatsApp",
      href: "https://wa.me/message/FYPCUDSRLRNFG1",
      icon: Whatsapp,
      description: "Quick chat and instant messaging"
    }
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
          Lets Connect
        </h2>
        <p className="text-textmain-300 text-lg max-w-2xl mx-auto">
          Ready to bring your ideas to life? I am here to help with your next project.
          Let us discuss how we can work together to achieve your goals.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 relative z-10">
        {/* Left Column - Contact Info */}
        <div className="space-y-8">
          {/* Contact Methods */}
          <div>
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
                        <svg className="w-5 h-5 text-textmain-300 group-hover:text-primary-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column - Contact Form */}
        <div>
          <h3 className="text-2xl font-semibold text-textmain-100 mb-6">
            Send a Message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-textmain-100 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-textmain-100 placeholder-textmain-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all duration-300"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-textmain-100 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-textmain-100 placeholder-textmain-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-textmain-100 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-textmain-100 placeholder-textmain-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all duration-300"
                placeholder="What is this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-textmain-100 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-textmain-100 placeholder-textmain-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all duration-300 resize-none"
                placeholder="Tell me about your project or question..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-textmain-100 font-medium py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/25 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            >
              Send Message
            </button>
          </form>
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

export default Section;