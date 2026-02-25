"use client";

import { useState, useEffect, useCallback } from "react";
import { isModerator, loginAsModerator, logoutModerator } from "@/lib/moderator";

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
  mapRegion: string;
  funFacts: string;
  tags: string;
  status: string;
  submittedBy: string;
  createdAt: number | null;
}

export default function ModeratorPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [animals, setAnimals] = useState<SubmittedAnimal[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setIsLoggedIn(isModerator());
  }, []);

  const fetchPending = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/animals/pending");
      const data = await res.json();
      setAnimals(data.animals || []);
    } catch {
      setMessage("Failed to load pending animals.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchPending();
    }
  }, [isLoggedIn, fetchPending]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAsModerator(password);
    if (success) {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Incorrect password. Please try again.");
    }
  };

  const handleLogout = () => {
    logoutModerator();
    setIsLoggedIn(false);
    setAnimals([]);
  };

  const handleModerate = async (id: number, action: "approve" | "reject") => {
    setActionLoading(id);
    try {
      const res = await fetch("/api/animals/moderate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      if (!res.ok) throw new Error("Failed");
      setMessage(`Animal ${action === "approve" ? "approved" : "rejected"} successfully.`);
      setAnimals((prev) => prev.filter((a) => a.id !== id));
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage("Action failed. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Moderator Login</h1>
            <p className="text-gray-500 text-sm mt-1">Enter your moderator password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter moderator password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {loginError && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-green-700 text-white font-semibold py-3 rounded-xl hover:bg-green-800 transition-colors"
            >
              Login as Moderator
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4">
            This page is for moderators only. Regular users cannot access this area.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Moderator Dashboard</h1>
            <p className="text-green-200 text-sm mt-1">Review and approve animal submissions</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 text-sm font-medium">
            {message}
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Pending Submissions
            <span className="ml-2 bg-amber-100 text-amber-800 text-sm font-semibold px-2.5 py-0.5 rounded-full">
              {animals.length}
            </span>
          </h2>
          <button
            onClick={fetchPending}
            className="text-sm text-green-700 hover:text-green-900 font-medium flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading submissions...</div>
        ) : animals.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700">All caught up!</h3>
            <p className="text-gray-500 text-sm mt-1">No pending submissions to review.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {animals.map((animal) => {
              let funFacts: string[] = [];
              try { funFacts = JSON.parse(animal.funFacts); } catch { /* ignore */ }
              let tags: string[] = [];
              try { tags = JSON.parse(animal.tags); } catch { /* ignore */ }

              return (
                <div key={animal.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-lg font-bold text-gray-900">{animal.name}</h3>
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                            {animal.category}
                          </span>
                          <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                            {animal.conservationStatus}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 italic mb-2">{animal.scientificName}</p>
                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{animal.description}</p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-gray-600 mb-3">
                          <div><span className="font-medium">Habitat:</span> {animal.habitat}</div>
                          <div><span className="font-medium">Diet:</span> {animal.diet}</div>
                          <div><span className="font-medium">Region:</span> {animal.mapRegion}</div>
                          {animal.lifespan && <div><span className="font-medium">Lifespan:</span> {animal.lifespan}</div>}
                          {animal.weight && <div><span className="font-medium">Weight:</span> {animal.weight}</div>}
                          {animal.length && <div><span className="font-medium">Length:</span> {animal.length}</div>}
                        </div>

                        {funFacts.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs font-medium text-gray-700 mb-1">Fun Facts:</p>
                            <ul className="list-disc list-inside text-xs text-gray-600 space-y-0.5">
                              {funFacts.map((fact, i) => <li key={i}>{fact}</li>)}
                            </ul>
                          </div>
                        )}

                        {tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {tags.map((tag) => (
                              <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {animal.imageUrl && (
                          <p className="text-xs text-gray-400 truncate">
                            Image: <a href={animal.imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{animal.imageUrl}</a>
                          </p>
                        )}

                        <p className="text-xs text-gray-400 mt-1">
                          Submitted by: <span className="font-medium text-gray-600">{animal.submittedBy}</span>
                          {animal.createdAt && (
                            <span className="ml-2">
                              on {new Date(animal.createdAt * 1000).toLocaleDateString()}
                            </span>
                          )}
                        </p>
                      </div>

                      {animal.imageUrl && (
                        <div className="hidden sm:block w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={animal.imageUrl}
                            alt={animal.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => handleModerate(animal.id, "approve")}
                        disabled={actionLoading === animal.id}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl transition-colors disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {actionLoading === animal.id ? "Processing..." : "Approve"}
                      </button>
                      <button
                        onClick={() => handleModerate(animal.id, "reject")}
                        disabled={actionLoading === animal.id}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-xl transition-colors disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {actionLoading === animal.id ? "Processing..." : "Reject"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
