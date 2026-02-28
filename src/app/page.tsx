import AnimalSearch from "@/components/AnimalSearch";
import HeroSlideshow from "@/components/HeroSlideshow";
import Quiz from "@/components/Quiz";
import { animals } from "@/lib/animals";

const stats = [
  { label: "Species", value: animals.length.toString() },
  { label: "Categories", value: "8" },
  { label: "Endangered", value: animals.filter((a) => a.conservationStatus === "Endangered" || a.conservationStatus === "Critically Endangered").length.toString() },
  { label: "Continents", value: "7" },
];

export default function HomePage() {
  return (
    <div>
      {/* About Section — at the top */}
      <section id="about" className="bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-3xl mx-auto text-center" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            <h2 className="text-2xl font-bold mb-3 text-white">About WildWorld</h2>
            <p className="text-green-200 leading-relaxed">
              WildWorld is dedicated to educating people about the incredible animals that share our
              planet. Our mission is to inspire conservation through knowledge and wonder. Explore
              species from every corner of the globe — learn about their habitats, behaviours,
              conservation status, and the remarkable stories that make each one unique.
            </p>
            <p className="text-green-400 text-sm mt-3">
              Data sourced from Wikipedia and public domain resources.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Section with blurred rotating animal image background */}
      <HeroSlideshow>
        <section className="text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center max-w-3xl mx-auto">
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
                  href="#quiz"
                  className="bg-green-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-500 transition-colors shadow-lg"
                >
                  Take Biology Quiz
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
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-green-300 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </HeroSlideshow>

      {/* Quiz Section */}
      <section id="quiz" className="bg-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Test Your Knowledge</h2>
            <p className="text-gray-600">Challenge yourself with our biology quiz and learn more about the animal kingdom.</p>
          </div>
          <Quiz />
        </div>
      </section>

      {/* Category Highlights */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
          {[
            { name: "Mammals", color: "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100" },
            { name: "Birds", color: "bg-sky-50 border-sky-200 text-sky-800 hover:bg-sky-100" },
            { name: "Fish", color: "bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100" },
            { name: "Reptiles", color: "bg-green-50 border-green-200 text-green-800 hover:bg-green-100" },
            { name: "Amphibians", color: "bg-teal-50 border-teal-200 text-teal-800 hover:bg-teal-100" },
            { name: "Extinct Animals", color: "bg-stone-50 border-stone-300 text-stone-800 hover:bg-stone-100" },
            { name: "Insects", color: "bg-blue-50 border-blue-300 text-blue-900 hover:bg-blue-100" },
            { name: "Microorganisms", color: "bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100" },
          ].map((cat) => (
            <div
              key={cat.name}
              className={`border-2 rounded-2xl p-4 text-center cursor-pointer transition-all ${cat.color}`}
            >
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
