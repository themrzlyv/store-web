import { BioService } from "../services/bio.service";

export async function GET() {
  const bioService = new BioService();
  return await bioService.getBio();
}

export async function PUT(req: Request) {
  const bioService = new BioService();
  return await bioService.updateBio(req);
}
