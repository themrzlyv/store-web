import prisma from "@/lib/prisma";
import { upload } from "@/lib/upload";
import { parseFormData } from "@/lib/utils";
import { ExperienceFormInputType } from "@/modules/experiences/infra/types/experience-form.input";
import { NextRequest, NextResponse } from "next/server";

export class ExperienceService {
  async getExperiences() {
    try {
      const experiences = await prisma.experience.findMany();

      return NextResponse.json({ experiences }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: (error as Error).message },
        { status: 500 }
      );
    }
  }

  async createExperience(req: Request) {
    try {
      const formData = await req.formData();
      const { image, company, position, companyUrl, startDate, endDate } =
        await parseFormData<ExperienceFormInputType>(formData);
      const imageUrl = image && (await upload(image));

      await prisma.experience.create({
        data: {
          company,
          position,
          image: imageUrl,
          companyUrl: companyUrl,
          startDate,
          endDate,
        },
      });

      return NextResponse.json(
        {
          message: "Experience created successfully!",
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

  async updateExperience(req: Request) {
    try {
      const formData = await req.formData();
      const {
        image,
        id,
        company,
        position,
        companyUrl,
        startDate,
        imageUrl,
        endDate,
      } = await parseFormData<ExperienceFormInputType>(formData);

      const imageFile = !!image
        ? typeof image === "string"
          ? image
          : await upload(image)
        : imageUrl;

      const experience = await prisma.experience.update({
        where: { id },
        data: {
          company,
          position,
          companyUrl,
          startDate,
          endDate,
          image: imageFile,
        },
      });

      return NextResponse.json(
        { experience, message: "Experience updated successfully" },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: (error as Error).message },
        { status: 500 }
      );
    }
  }

  async deleteExperience(req: NextRequest) {
    try {
      const { ids } = await req.json();

      await prisma.experience.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      return NextResponse.json({
        message: "Experience(s) deleted successfully",
      });
    } catch (error) {
      return NextResponse.json(
        { message: (error as Error).message },
        { status: 500 }
      );
    }
  }
}
