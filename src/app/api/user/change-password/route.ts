import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { currentPassword, newPassword, mock } = body || {};
    void currentPassword;

    // In mock mode, just simulate success
    if (mock) {
      await new Promise((r) => setTimeout(r, 200));
      return NextResponse.json({
        ok: true,
        message: "Contraseña actualizada (mock).",
      });
    }

    // Basic validation — in a real API we'd verify the currentPassword and update the user's password
    if (typeof newPassword !== "string" || newPassword.length < 8) {
      return NextResponse.json(
        {
          ok: false,
          message: "La nueva contraseña debe tener al menos 8 caracteres.",
        },
        { status: 400 },
      );
    }

    // TODO: implement real password change logic (DB, auth)
    await new Promise((r) => setTimeout(r, 300));

    return NextResponse.json({
      ok: true,
      message: "Contraseña actualizada correctamente.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Error en el servidor." },
      { status: 500 },
    );
  }
}
