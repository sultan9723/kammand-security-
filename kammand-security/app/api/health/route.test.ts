import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/health", () => {
  it("returns minimal availability status only", async () => {
    const response = GET();
    const body = (await response.json()) as Record<string, unknown>;

    expect(response.status).toBe(200);
    expect(body).toEqual({ status: "ok" });
    expect(body).not.toHaveProperty("env");
    expect(body).not.toHaveProperty("version");
  });
});
