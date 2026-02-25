"use client";

import { useEffect, useState } from "react";

const heroImages = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/1280px-African_Bush_Elephant.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Tiger_in_Ranthambhore.jpg/1280px-Tiger_in_Ranthambhore.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/SnowLeopard_wikimedia.jpg/1280px-SnowLeopard_wikimedia.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1280px-Grosser_Panda.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Humpback_Whale_underwater_shot.jpg/1280px-Humpback_Whale_underwater_shot.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Golden_Eagle_in_flight_-_5.jpg/1280px-Golden_Eagle_in_flight_-_5.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Arctic_wolf_1.jpg/1280px-Arctic_wolf_1.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Monarch_In_May.jpg/1280px-Monarch_In_May.jpg",
];

export default function HeroSlideshow({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % heroImages.length);
        setNext((prev) => (prev + 1) % heroImages.length);
        setTransitioning(false);
      }, 1000);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden" style={{ minHeight: "520px" }}>
      {/* Background images */}
      {heroImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: i === current ? (transitioning ? 0 : 1) : i === next && transitioning ? 1 : 0,
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(6px) brightness(0.45)",
            transform: "scale(1.05)",
          }}
        />
      ))}
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-green-900/40" />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
