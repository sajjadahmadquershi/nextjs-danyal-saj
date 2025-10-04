
import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script';
import { AuthProvider } from "@/context/AuthContext";
import "@/lib/fontawesome";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL("https://unisol-sajjad.vercel.app"),
  title: "Unisol Sajjad CNC & Web Solutions",
  description: "Expert in CNC 2D/3D DXF & SVG designs and modern web development. High precision artwork for laser cutting, engraving, and digital solutions.",
  keywords: ["CNC design", "DXF", "SVG", "laser cutting", "engraving", "2D design", "3D design", "web development", "Next.js", "React"],
  openGraph: {
    title: "Unisol Sajjad | CNC & Web Design",
    description: "Portfolio showcasing CNC 2D/3D designs and modern responsive websites by Sajjad Ahmad.",
    url: "https://unisol-sajjad.vercel.app",
    siteName: "Unisol Sajjad",
    images: [
      {
        url: "https://unisol-sajjad.vercel.app/images/cnc-laser-2d-design.png",
        width: 1200,
        height: 630,
        alt: "CNC and Web Design Work by Sajjad Ahmad",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unisol Sajjad CNC & Web Design",
    description: "Explore CNC design and web development services by Sajjad Ahmad.",
    creator: "@sajjad_cnc",
    images: ["https://unisol-sajjad.vercel.app/images/cnc-laser-2d-design.png"],
  },
  icons: {
    icon: "/sajjad-2d-3d-cnc-dxf-svg.svg",
    shortcut: "/sajjad-2d-3d-cnc-dxf-svg.svg",
    apple: "/sajjad-2d-3d-cnc-dxf-svg.svg",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ GTM Head Script using next/script */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5QSLDLXL');
            `,
          }}
        />
        <meta name="google-site-verification" content="XJP44XTs6xw1zsn_--eV5LX4ogJhEAZstOF8Nm4EXZk" />
        {/* ✅ Schema.org JSON-LD Structured Data */}
        <link rel="canonical" href="https://unisol-sajjad.vercel.app" />

        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "name": "Unisol Sajjad CNC & Web Solutions",
                  "url": "https://unisol-sajjad.vercel.app",
                  "logo": "https://unisol-sajjad.vercel.app/sajjad-2d-3d-cnc-dxf-svg.svg",
                  "sameAs": [
                    "https://wa.me/923215302092",
                    // "https://www.facebook.com/YOUR_PAGE",
                    "https://www.instagram.com/unisoftsolution/",
                    // "https://www.linkedin.com/in/YOUR_PROFILE"
                  ]
                },
                {
                  "@type": "WebSite",
                  "name": "Unisol Sajjad",
                  "url": "https://unisol-sajjad.vercel.app",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://unisol-sajjad.vercel.app/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            })
          }}
        />

      </head>
      <body className={inter.className}>
        {/* ✅ GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5QSLDLXL"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: '#4aed88',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
