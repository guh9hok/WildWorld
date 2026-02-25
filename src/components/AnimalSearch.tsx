"use client";

import { useState, useMemo, useEffect } from "react";
import { animals as staticAnimals, categories, Animal } from "@/lib/animals";
import AnimalCard from "./AnimalCard";
import AddAnimalModal from "./AddAnimalModal";

interface SubmittedAnimal {
  id: number;
  name: string;
  scientificName: string;
  category: string;
  description: string;
  habitat: string;
  diet: string;
  lifespan: string;
  weight: string;
  length: string;
  conservationStatus: string;
  imageUrl: string;
  videoId: string;
  funFacts: string;
  locations: string;
  mapRegion: string;
  tags: string;
  status: string;
  submittedBy: string;
}

function dbAnimalToAnimal(a: SubmittedAnimal): Animal {
  let funFacts: string[] = [];
  try { funFacts = JSON.parse(a.funFacts); } catch { /* ignore */ }
  let locations: Animal["locations"] = [];
  try { locations = JSON.parse(a.locations); } catch { /* ignore */ }
  let tags: string[] = [];
  try { tags = JSON.parse(a.tags); } catch { /* ignore */ }

  return {
    id: `submitted-${a.id}`,
    name: a.name,
    scientificName: a.scientificName,
    category: a.category,
    description: a.description,
    habitat: a.habitat,
    diet: a.diet,
    lifespan: a.lifespan,
    weight: a.weight,
    length: a.length,
    conservationStatus: a.conservationStatus as Animal["conservationStatus"],
    imageUrl: a.imageUrl,
    videoId: a.videoId || "",
    funFacts,
    locations,
    mapRegion: a.mapRegion,
    tags,
    approved: true,
    submittedBy: a.submittedBy,
  };
}

function dbPendingToAnimal(a: SubmittedAnimal): Animal {
  const base = dbAnimalToAnimal(a);
  return { ...base, id: `pending-${a.id}`, approved: false };
}

const allCategories = [...categories, "Pending"];

export default function AnimalSearch() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [approvedSubmissions, setApprovedSubmissions] = useState<Animal[]>([]);
  const [pendingSubmissions, setPendingSubmissions] = useState<Animal[]>([]);
  const [isMod] = useState(() =>
    typeof window !== "undefined" && localStorage.getItem("wildworld_role") === "moderator"
  );

  useEffect(() => {
    // Fetch approved user-submitted animals
    fetch("/api/animals/approved")
      .then((r) => r.json())
      .then((data) => {
        if (data.animals) {
          setApprovedSubmissions(data.animals.map(dbAnimalToAnimal));
        }
      })
      .catch(() => {/* ignore */});
  }, []);

  useEffect(() => {
    // Fetch pending animals for moderators
    if (isMod) {
      fetch("/api/animals/pending")
        .then((r) => r.json())
        .then((data) => {
          if (data.animals) {
            setPendingSubmissions(data.animals.map(dbPendingToAnimal));
          }
        })
        .catch(() => {/* ignore */});
    }
  }, [isMod]);

  const allAnimals = useMemo(() => {
    return [...staticAnimals, ...approvedSubmissions];
  }, [approvedSubmissions]);

  const visibleCategories = useMemo(() => {
    if (isMod) return allCategories;
    return categories;
  }, [isMod]);

  const filtered = useMemo(() => {
    // "Pending" category only for moderators
    if (selectedCategory === "Pending") {
      if (!isMod) return [];
      return pendingSubmissions.filter((animal) => {
        if (search === "") return true;
        return (
          animal.name.toLowerCase().includes(search.toLowerCase()) ||
          animal.scientificName.toLowerCase().includes(search.toLowerCase()) ||
          animal.description.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    return allAnimals.filter((animal) => {
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
  }, [search, selectedCategory, allAnimals, pendingSubmissions, isMod]);

  const handleAddSuccess = () => {
    setShowAddModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

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
            {visibleCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? cat === "Pending"
                      ? "bg-amber-600 text-white shadow-md"
                      : "bg-green-700 text-white shadow-md"
                    : cat === "Pending"
                    ? "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
                    : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                }`}
              >
                {cat}
                {cat === "Pending" && pendingSubmissions.length > 0 && (
                  <span className="ml-1.5 bg-amber-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {pendingSubmissions.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Success message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 text-sm font-medium flex items-center gap-2">
          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Your animal has been submitted for review! A moderator will approve it shortly.
        </div>
      )}

      {/* Results Count + Add Button */}
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
          {selectedCategory === "Pending" && (
            <span className="ml-2 text-amber-600 font-medium">(Pending Review)</span>
          )}
        </p>
        <div className="flex items-center gap-3">
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
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            +Add Record
          </button>
        </div>
      </div>

      {/* Pending notice for moderators */}
      {selectedCategory === "Pending" && isMod && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Moderator view:</strong> These animals are pending approval. Visit the{" "}
          <a href="/moderator" className="underline font-medium">Moderator Dashboard</a> to approve or reject them.
        </div>
      )}

      {/* Animal Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((animal) => (
            <div key={animal.id} className="relative">
              {animal.approved === false && (
                <div className="absolute top-2 left-2 z-10 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Pending
                </div>
              )}
              {animal.submittedBy && animal.approved !== false && (
                <div className="absolute top-2 left-2 z-10 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Community
                </div>
              )}
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

      {/* Add Animal Modal */}
      {showAddModal && (
        <AddAnimalModal
          onClose={() => setShowAddModal(false)}
          onSuccess={handleAddSuccess}
        />
      )}
    </div>
  );
}
