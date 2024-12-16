import prisma from "@/lib/prisma";
import { experienceFormSchema } from "@/modules/experiences/interface/data/form-schemas";
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

  async createExperience(req: NextRequest) {
    try {
      const body = await req.json();
      body.startDate = body?.startDate ? new Date(body.startDate) : undefined;
      body.endDate = body?.endDate ? new Date(body.endDate) : undefined;
      const { image, company, position, companyUrl, startDate, endDate } =
        experienceFormSchema.parse(body);

      await prisma.experience.create({
        data: {
          company,
          position,
          image: image || "",
          companyUrl: companyUrl,
          startDate: startDate || "",
          endDate: endDate,
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

  async updateExperience(req: NextRequest) {
    try {
      const body = await req.json();
      body.startDate = body?.startDate ? new Date(body.startDate) : undefined;
      body.endDate = body?.endDate ? new Date(body.endDate) : undefined;
      const { image, id, company, position, companyUrl, startDate, endDate } =
        experienceFormSchema.parse(body);

      const experience = await prisma.experience.update({
        where: { id },
        data: {
          company,
          position,
          companyUrl,
          startDate,
          endDate,
          image,
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
