export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Jeeson Franz",
    "url": "https://jeeson.in",
    "image": "https://jeeson.in/jeeson-franz.jpg", // Placeholder
    "jobTitle": "Magician & Mentalist",
    "description": "Professional magician and mentalist based in Bangalore, India, specializing in corporate events and private parties.",
    "telephone": "+91 7012 69 4870",
    "email": "jeesonfranz@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://youtube.com/@jeesonfranz",
      "https://instagram.com/jeesonef",
      "https://facebook.com/jeesonfranz" // Assuming URL structure
    ],
    "knowsAbout": ["Magic", "Mentalism", "Illusion", "Entertainment"],
    "performerIn": {
      "@type": "Event",
      "name": "Corporate Magic Show",
      "location": {
         "@type": "Place",
         "name": "Bangalore"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
