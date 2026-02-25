import Link from "next/link";
import Image from "next/image";
import { Animal, conservationColors } from "@/lib/animals";

interface AnimalCardProps {
  animal: Animal;
}

export default function AnimalCard({ animal }: AnimalCardProps) {
  return (
    <Link href={`/animals/${animal.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 border border-green-100">
        <div className="relative h-52 overflow-hidden bg-green-50">
          <Image
            src={animal.imageUrl}
            alt={animal.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
          <div className="absolute top-3 left-3">
            <span className="bg-green-700 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {animal.category}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${conservationColors[animal.conservationStatus]}`}
            >
              {animal.conservationStatus}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors">
            {animal.name}
          </h3>
          <p className="text-sm text-gray-500 italic mb-3">{animal.scientificName}</p>
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{animal.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>📍</span>
              <span>{animal.mapRegion}</span>
            </div>
            <span className="text-green-600 text-sm font-medium group-hover:text-green-700 flex items-center gap-1">
              Learn more
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
