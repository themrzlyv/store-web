import prisma from "@/lib/prisma";
import { upload } from "@/lib/upload";
import { parseFormData } from "@/lib/utils";
import { BioInformationFormInputType } from "@/modules/bio/infra/types/update-bio.input";
import { DEFAULT_BIO_KEY } from "@/shared/data/constants";
import { NextResponse } from "next/server";

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

  async updateBio (req: Request) {
    try {
      const formData = await req.formData();
      const {
        image,
        imageUrl,
        bio,
        profession,
        firstName,
        lastName,
        social,
        skill,
        skillId,
      } = await parseFormData<BioInformationFormInputType>(formData);

      const imageFile = !!image
        ? typeof image === "string"
          ? image
          : await upload(image)
        : imageUrl;

      const bioInformation = await prisma.bio.update({
        where: { identifier: DEFAULT_BIO_KEY },
        data: {
          bio,
          profession,
          firstName,
          lastName,
          image: imageFile,
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
