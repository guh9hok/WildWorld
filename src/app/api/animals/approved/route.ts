import { NextResponse } from "next/server";
import { db } from "@/db";
import { submittedAnimals } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const approved = await db
      .select()
      .from(submittedAnimals)
      .where(eq(submittedAnimals.status, "approved"));

    return NextResponse.json({ animals: approved });
  } catch (error) {
    console.error("Error fetching approved animals:", error);
    return NextResponse.json({ error: "Failed to fetch approved animals" }, { status: 500 });
  }
}
