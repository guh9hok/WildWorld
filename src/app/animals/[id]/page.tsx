import { animals, conservationColors } from "@/lib/animals";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AnimalMap from "@/components/AnimalMap";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return animals.map((animal) => ({ id: animal.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const animal = animals.find((a) => a.id === id);
  if (!animal) return { title: "Creature Not Found" };
  return {
    title: `${animal.name} — Creature Codex`,
    description: animal.description.slice(0, 160),
  };
}

export default async function AnimalPage({ params }: PageProps) {
  const { id } = await params;
  const animal = animals.find((a) => a.id === id);

  if (!animal) notFound();

  const relatedAnimals = animals
    .filter((a) => a.id !== animal.id && (a.category === animal.category || a.mapRegion === animal.mapRegion))
    .slice(0, 3);

  const infoItems = [
    { label: "Scientific Name", value: animal.scientificName, icon: "🔬" },
    { label: "Category", value: animal.category, icon: "📋" },
    { label: "Subcategory", value: animal.subcategory || "N/A", icon: "📁" },
    { label: "Habitat", value: animal.habitat, icon: "🌿" },
    { label: "Diet", value: animal.diet, icon: "🍃" },
    { label: "Lifespan", value: animal.lifespan, icon: "⏳" },
    { label: "Weight", value: animal.weight, icon: "⚖️" },
    { label: "Size/Height", value: animal.length, icon: "📏" },
    { label: "Region", value: animal.mapRegion, icon: "🌍" },
  ];

  const taxonomyItems = [
    { label: "Kingdom", value: animal.taxonomy?.kingdom },
    { label: "Phylum", value: animal.taxonomy?.phylum },
    { label: "Class", value: animal.taxonomy?.class },
    { label: "Order", value: animal.taxonomy?.order },
    { label: "Family", value: animal.taxonomy?.family },
    { label: "Genus", value: animal.taxonomy?.genus },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-green-700 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/" className="hover:text-green-700 transition-colors">
          Animals
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">{animal.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl h-80 sm:h-96 bg-green-100">
            <Image
              src={animal.imageUrl}
              alt={animal.name}
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">{animal.name}</h1>
                  <p className="text-green-200 italic text-lg">{animal.scientificName}</p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <span className="bg-green-700 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    {animal.category}
                  </span>
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${conservationColors[animal.conservationStatus]}`}
                  >
                    {animal.conservationStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-green-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📖</span> About
            </h2>
            <p className="text-gray-700 leading-relaxed text-base mb-4">{animal.description}</p>
            {animal.behavior && (
              <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-100">
                <h3 className="text-sm font-bold text-green-800 uppercase tracking-wide mb-2">Behavior</h3>
                <p className="text-gray-700">{animal.behavior}</p>
              </div>
            )}
          </div>

          {/* Taxonomy Section */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-green-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>🧬</span> Biological Classification
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {taxonomyItems.map((item) => (
                <div key={item.label} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{item.label}</p>
                  <p className="text-sm text-gray-800 font-bold">{item.value || "N/A"}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Video */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-green-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>🎬</span> Watch
            </h2>
            <div className="relative rounded-xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${animal.videoId}`}
                title={`${animal.name} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full rounded-xl"
              />
            </div>
          </div>

          {/* Fun Facts */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-green-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>💡</span> Fun Facts
            </h2>
            <ul className="space-y-3">
              {animal.funFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed">{fact}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <AnimalMap animal={animal} />
        </div>

        {/* Right Column — Info Panel */}
        <div className="space-y-6">
          {/* Quick Info */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-green-100 sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📊</span> Quick Facts
            </h2>
            <div className="space-y-3">
              {infoItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                      {item.label}
                    </p>
                    <p className="text-sm text-gray-800 font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Conservation Status Badge */}
            <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-100">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                Conservation Status
              </p>
              <span
                className={`inline-block text-sm font-bold px-3 py-1 rounded-full ${conservationColors[animal.conservationStatus]}`}
              >
                {animal.conservationStatus}
              </span>
            </div>

            {/* Tags */}
            <div className="mt-4">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {animal.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-green-50 text-green-700 border border-green-200 text-xs px-2.5 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Animals */}
      {relatedAnimals.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Animals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedAnimals.map((related) => (
              <Link
                key={related.id}
                href={`/animals/${related.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-green-100 hover:-translate-y-1"
              >
                <div className="relative h-40 overflow-hidden bg-green-50">
                  <Image
                    src={related.imageUrl}
                    alt={related.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                    {related.name}
                  </h3>
                  <p className="text-xs text-gray-500 italic">{related.scientificName}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back Button */}
      <div className="mt-10 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-green-700 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-600 transition-colors shadow-md"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Animals
        </Link>
      </div>
    </div>
  );
}
