import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { submittedAnimals, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || (session.user as any).role !== "moderator") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, action } = body;

    if (!id || !action || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const status = action === "approve" ? "approved" : "rejected";
    const moderatorId = parseInt((session.user as any).id);

    if (action === "approve") {
      // Add moderator earnings ($2 = 200 cents)
      const moderatorEarnings = await db
        .select({ earnings: users.earnings })
        .from(users)
        .where(eq(users.id, moderatorId))
        .limit(1);

      if (moderatorEarnings.length > 0) {
        await db
          .update(users)
          .set({ earnings: moderatorEarnings[0].earnings + 200 })
          .where(eq(users.id, moderatorId));
      }

      await db
        .update(submittedAnimals)
        .set({ status, approvedBy: moderatorId })
        .where(eq(submittedAnimals.id, id));
    } else {
      await db
        .update(submittedAnimals)
        .set({ status })
        .where(eq(submittedAnimals.id, id));
    }

    return NextResponse.json({ success: true, status });
  } catch (error) {
    console.error("Error moderating animal:", error);
    return NextResponse.json({ error: "Failed to moderate animal" }, { status: 500 });
  }
}
