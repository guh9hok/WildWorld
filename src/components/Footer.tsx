export default function Footer() {
  return (
    <footer className="bg-green-900 text-green-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌿</span>
              <span className="text-xl font-bold text-white">WildWorld</span>
            </div>
            <p className="text-green-300 text-sm leading-relaxed">
              A comprehensive database of animals from around the world. Explore species, learn about
              their habitats, and discover the incredible diversity of life on Earth.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Conservation Status</h3>
            <ul className="space-y-2 text-sm text-green-300">
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span>
                Least Concern
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
                Vulnerable
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-400 inline-block"></span>
                Endangered
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
                Critically Endangered
              </li>
            </ul>
          </div>
          <div id="about">
            <h3 className="text-white font-semibold mb-4">About WildWorld</h3>
            <p className="text-green-300 text-sm leading-relaxed">
              WildWorld is dedicated to educating people about the incredible animals that share our
              planet. Our mission is to inspire conservation through knowledge and wonder.
            </p>
            <p className="text-green-400 text-xs mt-4">
              Data sourced from Wikipedia and public domain resources.
            </p>
          </div>
        </div>
        <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-400 text-sm">
          <p>© 2024 WildWorld Animal Database. Built with ❤️ for wildlife conservation.</p>
        </div>
      </div>
    </footer>
  );
}
