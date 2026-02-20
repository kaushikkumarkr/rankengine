import { NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/validations";
import { supabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = waitlistSchema.parse(body);

        // Check if email already exists
        const { data: existingUser } = await supabase
            .from("waitlist")
            .select("id")
            .eq("email", validatedData.email)
            .single();

        if (existingUser) {
            return NextResponse.json(
                { success: false, message: "You are already on the waitlist!" },
                { status: 400 }
            );
        }

        // Get current count to determine position
        const { count } = await supabase
            .from("waitlist")
            .select("*", { count: "exact", head: true });

        const position = (count || 0) + 1;

        // Insert new entry
        const { data: insertedData, error: insertError } = await supabase
            .from("waitlist")
            .insert([
                {
                    ...validatedData,
                    position,
                    source: "landing_page",
                },
            ]);

        if (insertError) {
            console.error("Supabase Error:", insertError);
            return NextResponse.json(
                { success: false, message: "Failed to join waitlist. Please try again later." },
                { status: 500 }
            );
        }

        // Send confirmation email
        try {
            if (process.env.RESEND_API_KEY) {
                const firstName = validatedData.full_name.split(" ")[0] || "there";

                await resend.emails.send({
                    from: process.env.RESEND_FROM_EMAIL || "RankEngine <waitlist@rankengine.com>", // You'll need to verify this domain in Resend
                    to: validatedData.email,
                    subject: "You're on the RankEngine waitlist — here's what happens next",
                    html: `
            <div style="font-family: sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 24px;">
              <h2 style="color: #000000; margin-bottom: 24px;">Welcome to RankEngine</h2>
              <p style="margin-bottom: 16px; font-size: 16px;">Hey ${firstName}, you're <strong>#${position}</strong> on the waitlist.</p>
              <p style="margin-bottom: 16px; font-size: 16px;">Here's what you've unlocked as an early member:</p>
              <ul style="margin-bottom: 24px; font-size: 16px; padding-left: 20px;">
                <li style="margin-bottom: 8px;">3 months free on launch</li>
                <li style="margin-bottom: 8px;">Locked-in early pricing</li>
                <li style="margin-bottom: 8px;">Direct input on feature roadmap</li>
              </ul>
              <p style="margin-bottom: 24px; font-size: 16px;">We'll email you personally when your access is ready. No mass blasts.</p>
              <p style="margin-bottom: 32px; font-size: 16px;">In the meantime, follow our build journey on Twitter: <a href="https://twitter.com/rankengine" style="color: #6366f1;">@RankEngine</a></p>
              
              <div style="text-align: left; margin-top: 32px;">
                <a href="https://twitter.com/rankengine" style="background-color: #0a0a0a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Follow our progress →</a>
              </div>
            </div>
          `,
                });
            }
        } catch (emailError) {
            console.error("Email Error:", emailError);
            // Don't fail the request if email fails
        }

        return NextResponse.json({
            success: true,
            position,
            message: "Successfully joined the waitlist!",
        });
    } catch (error: any) {
        if (error.name === "ZodError") {
            return NextResponse.json(
                { success: false, message: error.errors[0].message },
                { status: 400 }
            );
        }

        console.error("Waitlist API Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
