import prisma from "@/lib/prisma";
import { bioInformationFormSchema } from "@/modules/bio/interface/data/form-schemas";
import { DEFAULT_BIO_KEY } from "@/shared/data/constants";
import { NextRequest, NextResponse } from "next/server";

export class BioService {
  async getBio() {
    try {
      let bio = await prisma.bio.findUnique({
        where: { identifier: DEFAULT_BIO_KEY },
        include: {
          skills: true,
          social: true,
        },
      });

      if (!bio) {
        bio = await prisma.bio.create({
          include: { skills: true, social: true },
        });
      }

      return NextResponse.json({ bio }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: (error as Error).message },
        { status: 500 }
      );
    }
  }

  async updateBio(req: NextRequest) {
    try {
      const body = await req.json();
      const {
        image,
        bio,
        profession,
        firstName,
        lastName,
        social,
        skill,
        skillId,
        about,
      } = bioInformationFormSchema.parse(body);

      const bioInformation = await prisma.bio.update({
        where: { identifier: DEFAULT_BIO_KEY },
        data: {
          bio,
          profession,
          firstName,
          lastName,
          image,
          about,
          skills: {
            ...(skill ? { create: { name: skill } } : {}),
            ...(skillId ? { delete: { id: Number(skillId) } } : {}),
          },
          social: {
            upsert: {
              create: {
                ...social,
              },
              update: {
                ...social,
              },
            },
          },
        },
      });

      return NextResponse.json(
        { bioInformation, message: "Bio information updated successfully" },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: (error as Error).message },
        { status: 500 }
      );
    }
  }
}
