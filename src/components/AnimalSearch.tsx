"use client";

import { useState, useMemo, useEffect } from "react";
import { animals as staticAnimals, categories, Animal } from "@/lib/animals";
import AnimalCard from "./AnimalCard";

export default function AnimalSearch() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = useMemo(() => {
    return staticAnimals.filter((animal) => {
      const matchesSearch =
        search === "" ||
        animal.name.toLowerCase().includes(search.toLowerCase()) ||
        animal.scientificName.toLowerCase().includes(search.toLowerCase()) ||
        animal.description.toLowerCase().includes(search.toLowerCase()) ||
        animal.mapRegion.toLowerCase().includes(search.toLowerCase()) ||
        animal.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" || animal.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div>
      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-green-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search animals by name, habitat, region..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-green-700 text-white shadow-md"
                    : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600 text-sm">
          Showing{" "}
          <span className="font-semibold text-green-700">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "animal" : "animals"}
          {search && (
            <span>
              {" "}
              for &ldquo;<span className="font-medium">{search}</span>&rdquo;
            </span>
          )}
        </p>
        {(search || selectedCategory !== "All") && (
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="text-sm text-green-600 hover:text-green-800 underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Animal Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((animal) => (
            <div key={animal.id} className="relative">
              <AnimalCard animal={animal} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block">🔍</span>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No animals found</h3>
          <p className="text-gray-500">Try a different search term or category.</p>
        </div>
      )}
    </div>
  );
}
