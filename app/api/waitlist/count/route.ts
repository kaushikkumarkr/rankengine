import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // Cache this route's response for 60 seconds

export async function GET() {
    try {
        const { count, error } = await supabase
            .from("waitlist")
            .select("*", { count: "exact", head: true });

        if (error) {
            throw error;
        }

        // Default to at least 400 for placeholder social proof, per instructions
        const displayCount = Math.max((count || 0), 400);

        return NextResponse.json({ count: displayCount });
    } catch (error) {
        console.error("Error fetching waitlist count:", error);
        // Return the hardcoded base number if Database is not yet connected
        return NextResponse.json({ count: 400 });
    }
}
