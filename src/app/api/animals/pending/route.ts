import { NextResponse } from "next/server";
import { db } from "@/db";
import { submittedAnimals } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const pending = await db
      .select()
      .from(submittedAnimals)
      .where(eq(submittedAnimals.status, "pending"));

    return NextResponse.json({ animals: pending });
  } catch (error) {
    console.error("Error fetching pending animals:", error);
    return NextResponse.json({ error: "Failed to fetch pending animals" }, { status: 500 });
  }
}
