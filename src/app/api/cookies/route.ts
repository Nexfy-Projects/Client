import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Cookie API is working" });
}

export async function POST(request: Request) {
  try {
    const { name, value, options } = await request.json();

    // レスポンスを作成
    const response = NextResponse.json(
      { success: true, message: `Cookie ${name} set successfully` },
      { status: 200 },
    );

    // Cookie をセット
    if (name && value) {
      response.cookies.set(name, value, options || {});
    }

    return response;
  } catch (error) {
    console.error("Cookie setting error:", error);
    return NextResponse.json(
      { error: "Failed to set cookie" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { name } = await request.json();

    const response = NextResponse.json(
      { success: true, message: `Cookie ${name} deleted successfully` },
      { status: 200 },
    );

    if (name) {
      response.cookies.delete(name);
    }

    return response;
  } catch (error) {
    console.error("Cookie deletion error:", error);
    return NextResponse.json(
      { error: "Failed to delete cookie" },
      { status: 500 },
    );
  }
}
