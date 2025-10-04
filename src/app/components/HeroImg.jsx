// components/HeroImage.jsx
import Image from "next/image";
import "@/app/globals.css"; // Ensure global styles are imported
import "@/styile/adminportfolio.css"; // Import specific styles for the component

const HeroImage = ({ heroImage }) => (
  <div className="hero rounded-full bg-[#e1cccc] md:w-[375px] md:h-[375px] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative overflow-hidden shake-horizontal">
    <Image
      src={heroImage}
      alt="Portfolio hero image"
      width={400}
      height={400}
      priority // ✅ Allowed here
      className="rounded-full object-cover"
      style={{ aspectRatio: "1/1" }}
    />
  </div>
);

export default HeroImage;
