import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const session = await auth();
    
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId } = await params;
    const { role } = await request.json();

    if (!role || !["user", "moderator", "admin"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const userIdNum = parseInt(userId);
    if (isNaN(userIdNum)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    await db
      .update(users)
      .set({ role })
      .where(eq(users.id, userIdNum));

    return NextResponse.json({ message: "Role updated successfully" });
  } catch (error) {
    console.error("Update role error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}