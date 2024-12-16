import { NextRequest } from "next/server";
import { ExperienceService } from "../services/experience.service";

export async function GET() {
  const experienceService = new ExperienceService();
  return await experienceService.getExperiences();
}

export async function POST(req: NextRequest) {
  const experienceService = new ExperienceService();
  return await experienceService.createExperience(req);
}

export async function PUT(req: NextRequest) {
  const experienceService = new ExperienceService();
  return await experienceService.updateExperience(req);
}

export async function DELETE(req: NextRequest) {
  const experienceService = new ExperienceService();
  return await experienceService.deleteExperience(req);
}