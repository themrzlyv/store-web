import { upload } from "@/lib/upload";
import { parseFormData } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const { image } = await parseFormData<{ image: File }>(formData);
    const imageUrl = image && (await upload(image));
    return NextResponse.json(
      {
        imageUrl,
        message: "Image uploaded successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
