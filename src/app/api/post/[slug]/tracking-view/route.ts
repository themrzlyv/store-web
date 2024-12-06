import { firestore } from "@/lib/firebase";
import prisma from "@/lib/prisma";
import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const postRef = doc(firestore, "views", slug);

    const postDoc = await getDoc(postRef);
    if (!postDoc.exists()) {
      await setDoc(postRef, { count: 1 });
    } else {
      await updateDoc(postRef, { count: increment(1) });
    }

    const updatedDoc = await getDoc(postRef);

    await prisma.post.update({
      where: { slug },
      data: { views: updatedDoc.exists() ? updatedDoc.data().count : 0 },
    });

    return NextResponse.json({ slug }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
