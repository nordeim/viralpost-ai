import { describe, expect, it } from "vitest";

import {
  activeRoute,
  BRAND,
  GUMROAD_URL,
  NAV_ROUTES,
  SOCIAL_LINKS,
} from "@/components/marketing/nav-config";

// The navigation vocabulary — the reference's route surface (capitalized
// paths), the Gumroad product link, and the active-route resolver.

describe("nav-config: the route surface", () => {
  it("carries the reference's four destinations with its capitalized hrefs", () => {
    expect(NAV_ROUTES.map((r) => r.href)).toEqual(["/Home", "/Tool", "/Pricing", "/Contact"]);
    expect(NAV_ROUTES.map((r) => r.label)).toEqual(["Home", "Tool", "Pricing", "Contact"]);
  });

  it("Home's canonical is the bare / (the alias redirects)", () => {
    expect(NAV_ROUTES[0].canonical).toBe("/");
  });

  it("the Gumroad link is the reference's product page", () => {
    expect(GUMROAD_URL).toBe("https://templixco.gumroad.com/l/znzbnd");
  });
});

describe("nav-config: the active-route resolver", () => {
  it("lights Home on / and /Home", () => {
    expect(activeRoute("/")).toBe("home");
    expect(activeRoute("/Home")).toBe("home");
  });

  it("lights the inner routes on their prefixes", () => {
    expect(activeRoute("/Tool")).toBe("tool");
    expect(activeRoute("/Pricing")).toBe("pricing");
    expect(activeRoute("/Contact")).toBe("contact");
  });

  it("defaults to home on unknown paths", () => {
    expect(activeRoute("/whatever")).toBe("home");
    expect(activeRoute("")).toBe("home");
  });
});

describe("nav-config: brand + socials", () => {
  it("carries the brand strings", () => {
    expect(BRAND.name).toBe("ViralPost AI");
    expect(BRAND.description).toContain("AI-powered social media generator");
    expect(BRAND.tagline).toContain("viral-ready social media posts");
  });

  it("ships the five social chips with real platform homepages (the dead-stub fix)", () => {
    expect(SOCIAL_LINKS.map((s) => s.label)).toEqual([
      "Instagram",
      "Twitter",
      "LinkedIn",
      "YouTube",
      "Facebook",
    ]);
    for (const s of SOCIAL_LINKS) {
      expect(s.href).toMatch(/^https:\/\//);
      expect(s.href).not.toBe("#");
    }
  });
});
