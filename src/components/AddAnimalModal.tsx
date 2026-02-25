"use client";

import { useState } from "react";
import { categories } from "@/lib/animals";

interface AddAnimalModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const conservationOptions = [
  "Least Concern",
  "Near Threatened",
  "Vulnerable",
  "Endangered",
  "Critically Endangered",
  "Extinct in the Wild",
  "Extinct",
];

export default function AddAnimalModal({ onClose, onSuccess }: AddAnimalModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    scientificName: "",
    category: "Mammal",
    description: "",
    habitat: "",
    diet: "",
    lifespan: "",
    weight: "",
    length: "",
    conservationStatus: "Least Concern",
    imageUrl: "",
    videoId: "",
    mapRegion: "",
    funFact1: "",
    funFact2: "",
    funFact3: "",
    tags: "",
    submittedBy: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const funFacts = [form.funFact1, form.funFact2, form.funFact3].filter(Boolean);
    const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);

    try {
      const res = await fetch("/api/animals/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          scientificName: form.scientificName,
          category: form.category,
          description: form.description,
          habitat: form.habitat,
          diet: form.diet,
          lifespan: form.lifespan,
          weight: form.weight,
          length: form.length,
          conservationStatus: form.conservationStatus,
          imageUrl: form.imageUrl,
          videoId: form.videoId,
          mapRegion: form.mapRegion,
          funFacts,
          locations: [],
          tags,
          submittedBy: form.submittedBy || "Anonymous",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit");
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-green-700 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-xl font-bold">Add a New Animal Record</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-gray-500 bg-amber-50 border border-amber-200 rounded-lg p-3">
            Your submission will be reviewed by a moderator before appearing in the database.
          </p>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Common Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="e.g. African Elephant"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scientific Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="scientificName"
                value={form.scientificName}
                onChange={handleChange}
                required
                placeholder="e.g. Loxodonta africana"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {categories.filter((c) => c !== "All").map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Conservation Status <span className="text-red-500">*</span>
              </label>
              <select
                name="conservationStatus"
                value={form.conservationStatus}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {conservationOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Describe the animal..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Habitat <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="habitat"
                value={form.habitat}
                onChange={handleChange}
                required
                placeholder="e.g. Tropical rainforests"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="diet"
                value={form.diet}
                onChange={handleChange}
                required
                placeholder="e.g. Herbivore — leaves and fruit"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lifespan</label>
              <input
                type="text"
                name="lifespan"
                value={form.lifespan}
                onChange={handleChange}
                placeholder="e.g. 20–30 years"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
              <input
                type="text"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                placeholder="e.g. 50–100 kg"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Length / Size</label>
              <input
                type="text"
                name="length"
                value={form.length}
                onChange={handleChange}
                placeholder="e.g. 1–2 m"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Map Region <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="mapRegion"
                value={form.mapRegion}
                onChange={handleChange}
                required
                placeholder="e.g. Sub-Saharan Africa"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fun Facts (up to 3)</label>
            <div className="space-y-2">
              {[1, 2, 3].map((n) => (
                <input
                  key={n}
                  type="text"
                  name={`funFact${n}`}
                  value={form[`funFact${n}` as keyof typeof form]}
                  onChange={handleChange}
                  placeholder={`Fun fact ${n}...`}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="e.g. mammal, africa, endangered"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name (optional)</label>
            <input
              type="text"
              name="submittedBy"
              value={form.submittedBy}
              onChange={handleChange}
              placeholder="Anonymous"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-700 text-white font-medium py-2.5 rounded-xl hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit for Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
