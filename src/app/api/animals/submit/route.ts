import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { submittedAnimals } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      scientificName,
      category,
      description,
      habitat,
      diet,
      lifespan,
      weight,
      length,
      conservationStatus,
      imageUrl,
      videoId,
      funFacts,
      locations,
      mapRegion,
      tags,
      submittedBy,
    } = body;

    if (!name || !scientificName || !category || !description || !habitat || !diet || !conservationStatus || !mapRegion) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await db.insert(submittedAnimals).values({
      name,
      scientificName,
      category,
      description,
      habitat,
      diet,
      lifespan: lifespan || "Unknown",
      weight: weight || "Unknown",
      length: length || "Unknown",
      conservationStatus,
      imageUrl: imageUrl || "",
      videoId: videoId || "",
      funFacts: JSON.stringify(funFacts || []),
      locations: JSON.stringify(locations || []),
      mapRegion,
      tags: JSON.stringify(tags || []),
      status: "pending",
      submittedBy: submittedBy || "Anonymous",
    }).returning();

    return NextResponse.json({ success: true, animal: result[0] });
  } catch (error) {
    console.error("Error submitting animal:", error);
    return NextResponse.json({ error: "Failed to submit animal" }, { status: 500 });
  }
}
