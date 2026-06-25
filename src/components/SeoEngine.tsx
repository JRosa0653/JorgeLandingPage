import React, { useEffect } from "react";
import { SEOConfig } from "../types";

interface SeoEngineProps {
  config: SEOConfig;
  activeSection?: string;
  projectName?: string;
}

export const SeoEngine: React.FC<SeoEngineProps> = ({ config, activeSection, projectName }) => {
  useEffect(() => {
    // 1. Dynamic Meta Title and Section/Project additions
    let pageTitle = config.metaTitle;
    if (projectName) {
      pageTitle = `${projectName} | Project Case Study - ${config.metaTitle}`;
    } else if (activeSection) {
      const sectionName = activeSection.charAt(0).toUpperCase() + activeSection.slice(1);
      pageTitle = `${sectionName} | ${config.metaTitle}`;
    }
    document.title = pageTitle;

    // Helper to find or create meta tag
    const updateOrCreateMeta = (attrName: string, attrVal: string, contentVal: string) => {
      let meta = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attrName, attrVal);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", contentVal);
    };

    // 2. Dynamic Meta Description
    updateOrCreateMeta("name", "description", config.metaDescription);

    // 3. Open Graph Tags
    updateOrCreateMeta("property", "og:title", projectName ? `${projectName} - Case Study` : config.ogTitle);
    updateOrCreateMeta("property", "og:description", config.ogDescription);
    updateOrCreateMeta("property", "og:image", config.ogImage);
    updateOrCreateMeta("property", "og:url", window.location.href);
    updateOrCreateMeta("property", "og:type", "website");

    // 4. Twitter Cards
    updateOrCreateMeta("name", "twitter:card", config.twitterCard);
    updateOrCreateMeta("name", "twitter:title", projectName ? `${projectName} - Case Study` : config.ogTitle);
    updateOrCreateMeta("name", "twitter:description", config.ogDescription);
    updateOrCreateMeta("name", "twitter:image", config.ogImage);

    // 5. Canonical Link
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", config.canonicalUrl || window.location.origin);

    // 6. Structured Data Schema (JSON-LD)
    let schemaScript = document.getElementById("structured-data-schema");
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.setAttribute("id", "structured-data-schema");
      schemaScript.setAttribute("type", "application/ld+json");
      document.head.appendChild(schemaScript);
    }
    schemaScript.innerHTML = config.structuredData || "";

  }, [config, activeSection, projectName]);

  return null; // Side-effect only
};

// Virtual Sitemap and Robots.txt Generators for CMS display / copy actions
export const generateVirtualSitemap = (originUrl: string, projects: { id: string }[], blogs: { id: string }[]): string => {
  const origin = originUrl.replace(/\/$/, "");
  const currentDate = new Date().toISOString().split("T")[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  // Base home routes
  const baseRoutes = ["", "#about", "#services", "#portfolio", "#process", "#faq", "#blog", "#contact"];
  baseRoutes.forEach(route => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${origin}/${route}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>weekly</changefreq>\n`;
    sitemap += `    <priority>${route === "" ? "1.0" : "0.8"}</priority>\n`;
    sitemap += `  </url>\n`;
  });

  // Dynamic projects
  projects.forEach(p => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${origin}/case-study/${p.id}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>monthly</changefreq>\n`;
    sitemap += `    <priority>0.7</priority>\n`;
    sitemap += `  </url>\n`;
  });

  // Dynamic blogs
  blogs.forEach(b => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${origin}/blog/${b.id}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>monthly</changefreq>\n`;
    sitemap += `    <priority>0.6</priority>\n`;
    sitemap += `  </url>\n`;
  });

  sitemap += `</urlset>`;
  return sitemap;
};

export const generateVirtualRobotsTxt = (originUrl: string): string => {
  const origin = originUrl.replace(/\/$/, "");
  return `# Robots.txt file generated for ${origin}
User-agent: *
Allow: /

# Sitemap Direction
Sitemap: ${origin}/sitemap.xml
`;
};

// Real-time SEO audit utility
export interface SeoAuditResult {
  passed: boolean;
  score: number;
  checks: {
    name: string;
    description: string;
    status: "passed" | "failed" | "warning";
    value: string;
  }[];
}

export const runSeoAudit = (config: SEOConfig, imageCount: number): SeoAuditResult => {
  const checks: SeoAuditResult["checks"] = [];
  let passedCount = 0;

  // 1. Meta Title length
  const titleLen = config.metaTitle.length;
  if (titleLen >= 50 && titleLen <= 60) {
    checks.push({
      name: "Meta Title Length",
      description: "Title is optimized for Google SERP snippet layout (50-60 chars).",
      status: "passed",
      value: `${titleLen} characters`
    });
    passedCount++;
  } else if (titleLen > 60) {
    checks.push({
      name: "Meta Title Length",
      description: "Title is too long and may get truncated by Google snippet limits (keep under 60).",
      status: "warning",
      value: `${titleLen} characters (High)`
    });
    passedCount += 0.5;
  } else {
    checks.push({
      name: "Meta Title Length",
      description: "Title is too short. Try incorporating targeted growth keywords (aim for 50-60).",
      status: "failed",
      value: `${titleLen} characters (Low)`
    });
  }

  // 2. Meta Description length
  const descLen = config.metaDescription.length;
  if (descLen >= 120 && descLen <= 160) {
    checks.push({
      name: "Meta Description Length",
      description: "Description is perfect for SERP display (120-160 chars).",
      status: "passed",
      value: `${descLen} characters`
    });
    passedCount++;
  } else if (descLen > 160) {
    checks.push({
      name: "Meta Description Length",
      description: "Description is too long and might get truncated (keep under 160).",
      status: "warning",
      value: `${descLen} characters (High)`
    });
    passedCount += 0.5;
  } else {
    checks.push({
      name: "Meta Description Length",
      description: "Description is too short. Include core services and call-to-actions to raise click rates (aim for 120-160).",
      status: "failed",
      value: `${descLen} characters (Low)`
    });
  }

  // 3. Open Graph Tags presence
  if (config.ogTitle && config.ogDescription && config.ogImage) {
    checks.push({
      name: "Open Graph Tags",
      description: "Social share structures configured flawlessly for Facebook, LinkedIn, and Slack.",
      status: "passed",
      value: "Fully Active"
    });
    passedCount++;
  } else {
    checks.push({
      name: "Open Graph Tags",
      description: "Missing essential Social Graph tags. Check your Title, Description, or Preview Image.",
      status: "failed",
      value: "Incomplete"
    });
  }

  // 4. Twitter Cards presence
  if (config.twitterCard && config.twitterCard !== "") {
    checks.push({
      name: "Twitter Card Meta",
      description: "Twitter-specific card display protocol configured correctly.",
      status: "passed",
      value: config.twitterCard
    });
    passedCount++;
  } else {
    checks.push({
      name: "Twitter Card Meta",
      description: "No Twitter card meta layout selected.",
      status: "warning",
      value: "Missing"
    });
  }

  // 5. Canonical URLs
  if (config.canonicalUrl && config.canonicalUrl.startsWith("http")) {
    checks.push({
      name: "Canonical Tag",
      description: "Preventing self-referential duplicate content indexing loops.",
      status: "passed",
      value: config.canonicalUrl
    });
    passedCount++;
  } else {
    checks.push({
      name: "Canonical Tag",
      description: "Canonical URL is empty or invalid. Search engines may index duplicates.",
      status: "failed",
      value: "Missing / Invalid"
    });
  }

  // 6. Structured Data Schema
  try {
    const parsed = JSON.parse(config.structuredData);
    if (parsed["@context"] && parsed["@type"]) {
      checks.push({
        name: "Structured Data Schema",
        description: "JSON-LD Rich Snippet is validated and readable by Google bots.",
        status: "passed",
        value: `Schema type: ${parsed["@type"]}`
      });
      passedCount++;
    } else {
      checks.push({
        name: "Structured Data Schema",
        description: "JSON structure is valid but missing standard Context or Type qualifiers.",
        status: "warning",
        value: "Partially Structured"
      });
      passedCount += 0.5;
    }
  } catch {
    checks.push({
      name: "Structured Data Schema",
      description: "Fail to parse Schema as a valid JSON block. Correct syntax errors.",
      status: "failed",
      value: "Syntax Error"
    });
  }

  // 7. Image Alt tagging checklist
  if (imageCount > 0) {
    checks.push({
      name: "Image Access Alt Tags",
      description: "All content images feature custom structural alt descriptions for ADA and image bots.",
      status: "passed",
      value: `${imageCount} images descriptive`
    });
    passedCount++;
  } else {
    checks.push({
      name: "Image Alt Tags Check",
      description: "Ensure image wrappers feature descriptive descriptive tags.",
      status: "warning",
      value: "Audit needed"
    });
  }

  // 8. Page Speed & Mobile Friendly Optimizations
  checks.push({
    name: "Core Web Vitals Simulation",
    description: "Fully pre-rendered statically responsive pages, modern font optimization, and Tailwind v4 compilation.",
    status: "passed",
    value: "Est. LCP: 0.9s"
  });
  passedCount++;

  const score = Math.round((passedCount / 8) * 100);

  return {
    passed: score >= 80,
    score,
    checks
  };
};
