import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Fetching babies for user:", userId);

    const client = await pool.connect();

    const result = await client.query(
      "SELECT id, name, user_id FROM baby WHERE user_id = $1 ORDER BY id DESC",
      [userId],
    );
    client.release();

    console.log("Query result:", result.rows);

    return NextResponse.json({
      success: true,
      babies: result.rows,
    });
  } catch (error) {
    console.error("Database error details:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch babies",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name } = await request.json();

    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    console.log("Creating baby for user:", userId, { name });

    const client = await pool.connect();

    const result = await client.query(
      "INSERT INTO baby (user_id, name) VALUES ($1, $2) RETURNING *",
      [userId, name.trim()],
    );
    client.release();

    return NextResponse.json({
      success: true,
      baby: result.rows[0],
    });
  } catch (error) {
    console.error("Database error details:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create baby",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
