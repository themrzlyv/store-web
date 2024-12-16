import prisma from "@/lib/prisma";
import { projectFormSchema } from "@/modules/projects/interface/data/form-schemas";
import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

export class ProjectService {
  async getProjects(req: NextRequest) {
    try {
      const params = req.nextUrl.searchParams;

      const isPublished = params.get("isPublished");

      const projects = await prisma.project.findMany({
        where: {
          ...(isPublished ? { published: isPublished === "true" } : {}),
        },
      });

      return NextResponse.json({ projects }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: (error as Error).message },
        { status: 500 }
      );
    }
  }

  async createProject(req: NextRequest) {
    try {
      const octokit = new Octokit();
      const body = await req.json();
      const { image, title, content, sourceUrl } =
        projectFormSchema.parse(body);

      const urlParts = sourceUrl && sourceUrl.split("/");
      const owner = urlParts && urlParts[3];
      const repo = urlParts && urlParts[4];

      const {
        data: { stargazers_count },
      } =
        owner && repo
          ? await octokit.request("GET /repos/{owner}/{repo}", {
              owner: owner,
              repo: repo,
            })
          : { data: { stargazers_count: 0 } };

      await prisma.project.create({
        data: {
          title,
          content,
          image,
          sourceUrl,
          stars: stargazers_count,
        },
      });

      return NextResponse.json(
        {
          message: "Post created successfully!",
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

  async updateProject(req: NextRequest) {
    try {
      const body = await req.json();
      const { image, id, published, stars, title, content, sourceUrl } =
        projectFormSchema.parse(body);

      const project = await prisma.project.update({
        where: { id },
        data: {
          title,
          content,
          published,
          stars,
          image,
          sourceUrl,
        },
      });

      return NextResponse.json(
        { project, message: "Project updated successfully" },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: (error as Error).message },
        { status: 500 }
      );
    }
  }

  async deleteProject(req: NextRequest) {
    try {
      const { ids } = await req.json();

      await prisma.project.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      return NextResponse.json({ message: "Project(s) deleted successfully" });
    } catch (error) {
      return NextResponse.json(
        { message: (error as Error).message },
        { status: 500 }
      );
    }
  }
}
