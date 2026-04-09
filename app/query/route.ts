import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const client = await pool.connect();

    const events = await client.query("SELECT * FROM events LIMIT 5");

    client.release();

    return NextResponse.json({
      success: true,
      events: events.rows,
      eventCount: events.rowCount,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { baby_id, food, foodamount, milkamount, poop, time, date } =
      await request.json();

    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO events (baby_id, food, foodamount, milkamount, poop, time, date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [baby_id, food, foodamount, milkamount, poop, time, date],
    );
    client.release();

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
