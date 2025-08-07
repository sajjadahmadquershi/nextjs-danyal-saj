"use client"
import Image from "next/image"
import Whatsapp from "../../../public/whatsapp.svg"
import fiver from "../../../public/fiverr-1.svg"
import { TypeAnimation } from "react-type-animation"
import { motion } from "framer-motion"
import Link from "next/link"
import HeroImage from "./HeroImg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
// import { faFiverr } from '@fortawesome/free-brands-svg-icons';

const HeroSection = ({ heroImage, heroText, type }) => {
  return (
    <>
      <style jsx>{`
        .hero-background {
          background: #000000;
          position: relative;
        }

        .hero-background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.05) 0%, transparent 50%);
        }

        .floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(2px);
          animation: float 8s ease-in-out infinite;
        }

        .floating-orb:nth-child(1) {
          top: 15%;
          left: 10%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
          animation-delay: 0s;
        }

        .floating-orb:nth-child(2) {
          top: 60%;
          right: 15%;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
          animation-delay: 3s;
        }

        .floating-orb:nth-child(3) {
          bottom: 25%;
          left: 60%;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%);
          animation-delay: 6s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }

        .gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .typing-gradient {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .professional-button {
          position: relative;
          background: rgba(15, 15, 15, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .professional-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.6s;
        }

        .professional-button:hover::before {
          left: 100%;
        }

        .professional-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .whatsapp-button {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.9) 0%, rgba(22, 163, 74, 0.9) 100%);
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .whatsapp-button:hover {
          background: linear-gradient(135deg, rgba(34, 197, 94, 1) 0%, rgba(22, 163, 74, 1) 100%);
          box-shadow: 0 25px 50px rgba(34, 197, 94, 0.3);
          border-color: rgba(34, 197, 94, 0.5);
        }

        .fiverr-button {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(37, 99, 235, 0.9) 100%);
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .fiverr-button:hover {
          background: linear-gradient(135deg, rgba(59, 130, 246, 1) 0%, rgba(37, 99, 235, 1) 100%);
          box-shadow: 0 25px 50px rgba(59, 130, 246, 0.3);
          border-color: rgba(59, 130, 246, 0.5);
        }

        .button-icon {
          transition: all 0.3s ease;
        }

        .professional-button:hover .button-icon {
          transform: scale(1.2) rotate(10deg);
        }

        .text-description {
          color: #e2e8f0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .image-glow {
          position: absolute;
          inset: -30px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
          border-radius: 50%;
          filter: blur(40px);
          animation: pulse-glow 5s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }

        .decorative-dots {
          position: absolute;
          width: 3px;
          height: 3px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 50%;
          animation: twinkle 4s ease-in-out infinite;
        }

        .decorative-dots:nth-child(1) {
          top: 20%;
          left: 15%;
          animation-delay: 0s;
        }

        .decorative-dots:nth-child(2) {
          top: 70%;
          right: 20%;
          animation-delay: 1.5s;
        }

        .decorative-dots:nth-child(3) {
          bottom: 30%;
          left: 10%;
          animation-delay: 3s;
        }

        .decorative-dots:nth-child(4) {
          top: 40%;
          right: 10%;
          animation-delay: 2s;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(2); }
        }

        .grid-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: grid-move 20s linear infinite;
        }

        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .hero-background {
            width: 100vw;
            margin-left: calc(50% - 50vw);
            margin-right: calc(50% - 50vw);
            left: 0;
            right: 0;
          }

          .floating-orb:nth-child(1) {
            width: 120px;
            height: 120px;
          }
          .floating-orb:nth-child(2) {
            width: 100px;
            height: 100px;
          }
          .floating-orb:nth-child(3) {
            width: 80px;
            height: 80px;
          }

          .mobile-content {
            padding-left: 8px;
            padding-right: 8px;
          }
        }
      `}</style>

      <section className="hero-background w-full py-8 sm:py-12 lg:py-16 relative overflow-hidden min-h-screen flex items-center">
        {/* Subtle grid pattern */}
        <div className="grid-pattern"></div>

        {/* Floating background orbs */}
        <div className="floating-orb"></div>
        <div className="floating-orb"></div>
        <div className="floating-orb"></div>

        {/* Decorative dots */}
        <div className="decorative-dots"></div>
        <div className="decorative-dots"></div>
        <div className="decorative-dots"></div>
        <div className="decorative-dots"></div>

        <div className="w-full mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 w-full gap-4 sm:gap-8 lg:gap-12 items-center mobile-content">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="col-span-1 lg:col-span-7 w-full text-center lg:text-left order-2 lg:order-1"
            >
              {type === "web" ? (
                <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight lg:leading-normal font-extrabold">
                  <motion.span
                    className="gradient-text drop-shadow-lg"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Hello, I&apos;m into{" "}
                  </motion.span>
                  <br />
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative"
                  >
                    <TypeAnimation
                      sequence={[
                        "Web Developer",
                        1000,
                        "React / Next.js",
                        1000,
                        "Firebase",
                        1000,
                        "Supabase",
                        1000,
                        "Laravel",
                        1000,
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Number.POSITIVE_INFINITY}
                      className="typing-gradient drop-shadow-lg"
                    />
                  </motion.div>
                </h1>
              ) : (
                <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight lg:leading-normal font-extrabold">
                  <motion.span
                    className="gradient-text drop-shadow-lg"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Hello, I&apos;m a{" "}
                  </motion.span>
                  <br />
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative"
                  >
                    <TypeAnimation
                      sequence={[
                        "2d design",
                        1000,
                        "3d design",
                        1000,
                        "3d rendering",
                        1000,
                        ".fbx, .stl, .dxf etc",
                        1000,
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Number.POSITIVE_INFINITY}
                      className="typing-gradient drop-shadow-lg"
                    />
                  </motion.div>
                </h1>
              )}

              <motion.p
                className="text-description text-sm sm:text-base lg:text-lg xl:text-xl mb-6 sm:mb-8 max-w-full leading-relaxed mx-auto lg:mx-0"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {heroText}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start items-center sm:items-stretch"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link
                  href="https://wa.me/message/FYPCUDSRLRNFG1"
                  aria-label="WhatsApp profile"
                  className="professional-button whatsapp-button group px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2 sm:gap-3 text-white font-semibold text-sm sm:text-base lg:text-lg w-full sm:w-auto sm:min-w-[180px] lg:min-w-[200px]"
                >
                  <div className="flex border bg-white border-white p-2 sm:p-3 lg:p-4 rounded-full hover:bg-gray-400 transition-colors">
                    <button className="relative z-10 flex items-center gap-1 sm:gap-2">
                      <span className="text-xs sm:text-sm lg:text-base">Hire on WhatsApp</span>
                      <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" style={{color: "#63E6BE"}} />
                    </button>
                  </div>
                </Link>

                <Link
                  href="https://www.fiverr.com/s/K2BYm2"
                  aria-label="Fiverr profile"
                  className="professional-button fiverr-button group px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2 sm:gap-3 text-white font-semibold text-sm sm:text-base lg:text-lg w-full sm:w-auto sm:min-w-[180px] lg:min-w-[200px]"
                >
                  <div className="flex border bg-transparent border-white p-2 sm:p-3 lg:p-4 rounded-full hover:bg-black transition-colors">
                    <span className="relative z-10 text-xs sm:text-sm lg:text-base">Hire on Fiverr</span>
                    <Image
                      className="button-icon w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 relative z-10 ml-1 sm:ml-2"
                      loading="lazy"
                      src={fiver || "/placeholder.svg?height=24&width=24"}
                      alt="Fiverr Icon"
                      width={24}
                      height={24}
                    />
                  </div>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="col-span-1 lg:col-span-5 place-self-center mt-4 sm:mt-6 lg:mt-0 relative order-1 lg:order-2 w-full max-w-md sm:max-w-lg lg:max-w-none mx-auto"
            >
              <div className="relative">
                {/* Professional glow effect */}
                <div className="image-glow"></div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="relative z-10">
                  <HeroImage heroImage={heroImage} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
export default HeroSection