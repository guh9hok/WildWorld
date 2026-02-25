import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { submittedAnimals } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, action } = body;

    if (!id || !action || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const status = action === "approve" ? "approved" : "rejected";

    await db
      .update(submittedAnimals)
      .set({ status })
      .where(eq(submittedAnimals.id, id));

    return NextResponse.json({ success: true, status });
  } catch (error) {
    console.error("Error moderating animal:", error);
    return NextResponse.json({ error: "Failed to moderate animal" }, { status: 500 });
  }
}
