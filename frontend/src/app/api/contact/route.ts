import { NextResponse } from "next/server";
import { contactSchema } from "@/shared/lib/validation/contact";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // TODO: Integrar email/CRM. Por ahora, simular OK.
    await new Promise((r) => setTimeout(r, 500));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
