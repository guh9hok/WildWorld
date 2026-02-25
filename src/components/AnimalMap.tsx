"use client";

import { Animal } from "@/lib/animals";

interface AnimalMapProps {
  animal: Animal;
}

export default function AnimalMap({ animal }: AnimalMapProps) {
  // Use OpenStreetMap embed via iframe with markers
  // We'll use a static map approach with OpenStreetMap
  const center = animal.locations[0];
  const zoom = 3;

  // Build an OpenStreetMap URL with the first location as center
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${center.lng - 20},${center.lat - 15},${center.lng + 20},${center.lat + 15}&layer=mapnik&marker=${center.lat},${center.lng}`;

  return (
    <div className="rounded-2xl overflow-hidden border border-green-200 shadow-md">
      <div className="bg-green-700 text-white px-4 py-3 flex items-center gap-2">
        <span className="text-lg">🗺️</span>
        <div>
          <h3 className="font-semibold text-sm">Habitat Range</h3>
          <p className="text-green-200 text-xs">{animal.mapRegion}</p>
        </div>
      </div>
      <div className="relative">
        <iframe
          src={mapUrl}
          width="100%"
          height="350"
          style={{ border: 0 }}
          title={`Map showing habitat of ${animal.name}`}
          loading="lazy"
        />
      </div>
      <div className="bg-green-50 px-4 py-3 border-t border-green-100">
        <p className="text-xs text-gray-500 mb-2 font-medium">Known locations:</p>
        <div className="flex flex-wrap gap-2">
          {animal.locations.map((loc) => (
            <a
              key={loc.name}
              href={`https://www.openstreetmap.org/?mlat=${loc.lat}&mlon=${loc.lng}&zoom=8`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-white border border-green-200 text-green-700 text-xs px-2.5 py-1 rounded-full hover:bg-green-100 transition-colors"
            >
              <span>📍</span>
              {loc.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
