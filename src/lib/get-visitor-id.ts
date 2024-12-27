import { VISITOR_ID_KEY } from "@/shared/data/constants";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export async function getVisitorId() {
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    visitorId = result.visitorId;
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  return visitorId;
}
