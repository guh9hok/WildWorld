import AnimalSearch from "@/components/AnimalSearch";
import { animals } from "@/lib/animals";

const stats = [
  { label: "Species", value: animals.length.toString(), icon: "🦁" },
  { label: "Categories", value: "5", icon: "📋" },
  { label: "Endangered", value: animals.filter((a) => a.conservationStatus === "Endangered" || a.conservationStatus === "Critically Endangered").length.toString(), icon: "⚠️" },
  { label: "Continents", value: "7", icon: "🌍" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="text-6xl mb-6">🌍</div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Discover the World&apos;s
              <span className="block text-green-200">Amazing Animals</span>
            </h1>
            <p className="text-lg text-green-100 mb-8 leading-relaxed">
              Explore our comprehensive database of animals from every corner of the globe.
              Learn about their habitats, behaviours, conservation status, and the incredible
              stories that make each species unique.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="#animals"
                className="bg-white text-green-800 font-semibold px-6 py-3 rounded-full hover:bg-green-50 transition-colors shadow-lg"
              >
                Explore Animals
              </a>
              <a
                href="#categories"
                className="border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-green-800 transition-colors"
              >
                Browse Categories
              </a>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-green-900/40 backdrop-blur-sm border-t border-green-600/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-green-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Highlights */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12">
          {[
            { name: "Mammals", icon: "🦁", color: "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100" },
            { name: "Birds", icon: "🦅", color: "bg-sky-50 border-sky-200 text-sky-800 hover:bg-sky-100" },
            { name: "Fish", icon: "🦈", color: "bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100" },
            { name: "Reptiles", icon: "🦎", color: "bg-green-50 border-green-200 text-green-800 hover:bg-green-100" },
            { name: "Amphibians", icon: "🐸", color: "bg-teal-50 border-teal-200 text-teal-800 hover:bg-teal-100" },
          ].map((cat) => (
            <div
              key={cat.name}
              className={`border-2 rounded-2xl p-4 text-center cursor-pointer transition-all ${cat.color}`}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="font-semibold text-sm">{cat.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Animal Grid with Search */}
      <section id="animals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All Animals</h2>
          <span className="text-sm text-gray-500 bg-white border border-green-200 px-3 py-1 rounded-full">
            {animals.length} species
          </span>
        </div>
        <AnimalSearch />
      </section>

      {/* Conservation Banner */}
      <section className="bg-gradient-to-r from-green-700 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="text-4xl mb-4">🌱</div>
          <h2 className="text-2xl font-bold mb-3">Protecting Wildlife Together</h2>
          <p className="text-green-100 max-w-2xl mx-auto leading-relaxed">
            Many of the animals in our database face threats from habitat loss, climate change, and
            poaching. Learning about these incredible creatures is the first step toward protecting them.
          </p>
        </div>
      </section>
    </div>
  );
}
