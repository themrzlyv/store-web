import { NextRequest } from "next/server";
import { ProjectService } from "../services/project.service";

export async function GET(req: NextRequest) {
  const projectService = new ProjectService();
  return await projectService.getProjects(req);
}

export async function POST(req: NextRequest) {
  const projectService = new ProjectService();
  return await projectService.createProject(req);
}

export async function PUT(req: NextRequest) {
  const projectService = new ProjectService();
  return await projectService.updateProject(req);
}

export async function DELETE(req: NextRequest) {
  const projectService = new ProjectService();
  return await projectService.deleteProject(req);
}
