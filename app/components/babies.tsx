"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

interface Baby {
  id: number;
  user_id: string;
  name: string;
  birth_date: string;
  created_at: string;
}

const Babies = () => {
  const { user, isLoaded } = useUser();
  const [babies, setBabies] = useState<Baby[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      fetchBabies();
    }
  }, [isLoaded, user]);

  const fetchBabies = async () => {
    try {
      const response = await fetch("/api/babies");
      const data = await response.json();

      if (data.success) {
        setBabies(data.babies || []);
      }
    } catch (error) {
      console.error("Failed to fetch babies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBaby = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsAdding(true);
    try {
      const response = await fetch("/api/babies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setBabies((prev) => [data.baby, ...prev]);
        setName("");
      }
    } catch (error) {
      console.error("Failed to add baby:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString();
  };

  if (!isLoaded) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="p-4 text-center">Please sign in to manage babies.</div>
    );
  }

  if (loading) {
    return <div className="p-4 text-center">Loading your babies...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Your Babies</h2>

      {babies.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {babies.map((baby) => (
            <div key={baby.id} className="p-4 border rounded-lg bg-card">
              <h3 className="font-semibold text-lg">{baby.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>No babies added yet.</p>
        </div>
      )}

      <form
        onSubmit={handleAddBaby}
        className="mb-6 p-4 border rounded-lg bg-card"
      >
        <h3 className="font-semibold mb-3">Add New Baby</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Baby's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 border rounded-md flex-1"
            required
          />

          <button
            type="submit"
            disabled={isAdding || !name.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isAdding ? "Adding..." : "Add Baby"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Babies;
