import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://likdevsec.my.id"),
  title: {
    default: "Malik Ibrahim — Full-Stack Developer & Cybersecurity Enthusiast | Depok, Indonesia",
    template: "%s | Malik Ibrahim — Portfolio",
  },
  description:
    "Portfolio Malik Ibrahim — Full-Stack Developer & Cybersecurity Enthusiast di Depok, Indonesia. Lihat project, sertifikasi, tech stack, dan terminal interaktif.",
  keywords: [
    "Malik Ibrahim",
    "Full-Stack Developer",
    "Cybersecurity",
    "Web Security",
    "React",
    "TypeScript",
    "Node.js",
    "Portfolio",
    "Ethical Hacking",
    "Developer Depok",
    "Indonesia Developer",
    "Web Developer Indonesia",
    "Cybersecurity Indonesia",
    "Programmer Indonesia",
    "Freelance Developer",
  ],
  authors: [{ name: "Malik Ibrahim" }],
  creator: "Malik Ibrahim",
  publisher: "Malik Ibrahim",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://likdevsec.my.id",
    siteName: "Malik Ibrahim Portfolio",
    title: "Malik Ibrahim — Full-Stack Developer & Cybersecurity Enthusiast",
    description:
      "Portfolio Malik Ibrahim — Full-Stack Developer & Cybersecurity Enthusiast di Depok, Indonesia. Project, sertifikasi, tech stack, dan terminal interaktif.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Malik Ibrahim — Full-Stack Developer & Cybersecurity Enthusiast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Malik Ibrahim — Full-Stack Developer & Cybersecurity Enthusiast",
    description:
      "Portfolio Malik Ibrahim — Full-Stack Developer & Cybersecurity Enthusiast di Depok, Indonesia.",
    images: ["/og-image.png"],
    creator: "@malikibrahim",
  },
  alternates: {
    canonical: "https://likdevsec.my.id",
    languages: {
      "id-ID": "https://likdevsec.my.id",
      "en-US": "https://likdevsec.my.id",
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  other: {
    "theme-color": "#1769E8",
    "msapplication-TileColor": "#1769E8",
    "application-name": "Malik Ibrahim Portfolio",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Malik Ibrahim",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Malik Ibrahim",
    alternateName: "Malik",
    url: "https://likdevsec.my.id",
    image: "https://likdevsec.my.id/og-image.png",
    jobTitle: "Full-Stack Developer & Cybersecurity Enthusiast",
    description:
      "Full-Stack Developer & Cybersecurity Enthusiast di Depok, Indonesia. Berfokus pada web development dan keamanan siber.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Depok",
      addressRegion: "Jawa Barat",
      addressCountry: "ID",
    },
    email: "malik.ibrahim.dev@gmail.com",
    sameAs: [
      "https://github.com/Manglikkz",
      "https://instagram.com/malik.ibrahim",
    ],
    knowsAbout: [
      "Full-Stack Development",
      "Cybersecurity",
      "Web Security",
      "React",
      "TypeScript",
      "Node.js",
      "Ethical Hacking",
    ],
    alumniOf: "SMA",
    nationality: {
      "@type": "Country",
      name: "Indonesia",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Malik Ibrahim Portfolio",
    url: "https://likdevsec.my.id",
    description:
      "Portfolio Malik Ibrahim — Full-Stack Developer & Cybersecurity Enthusiast di Depok, Indonesia.",
    inLanguage: ["id", "en"],
    publisher: {
      "@type": "Person",
      name: "Malik Ibrahim",
    },
  };

  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
