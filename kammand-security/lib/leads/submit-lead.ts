import type { ContactLead } from "./config";
import { deliverContactLead } from "./provider";

export async function submitContactLead(lead: ContactLead) {
  return deliverContactLead(lead);
}
