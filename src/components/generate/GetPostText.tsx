"use server";

import axios from "axios";
import * as cheerio from "cheerio";
import * as he from "he";

export async function fetchLinkedInPostData(url: string) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0", // Helps bypass bot detection
      },
    });

    if (!data.includes("<html")) {
      throw new Error("The page may be blocked or returned invalid content.");
    }

    const $ = cheerio.load(data);

    const authorName =
      $("a[data-tracking-control-name='public_post_feed-actor-name']")
        .text()
        .trim() ||
      $("a[aria-label^='View profile for']").text().trim() ||
      "Unknown";

    const authorImage =
      $("img[alt^='View profile for']").attr("src") ||
      $("img[alt^='View profile for']").attr("data-delayed-url") ||
      $("img[alt^='View profile for']").attr("data-ghost-url") ||
      null;
    const rawTitle =
      $("p.text-color-text-low-emphasis.truncate").text().trim() ||
      $(
        "div[data-test-id='main-feed-activity-card__entity-lockup'] p.text-color-text-low-emphasis"
      )
        .text()
        .trim();
    const authorTitle = he.decode(rawTitle || "Unknown");

    const datePublished = $("time").first().text().trim() || "Unknown";
    const rawContent =
      $("meta[name='description']").attr("content")?.trim() ||
      $("p[data-test-id='main-feed-activity-card__commentary']").text().trim();

    const articleBody = he.decode(rawContent || "No content found");

    const postImage =
      $("meta[property='og:image']").attr("content")?.trim() || null;

    return {
      author: {
        name: authorName,
        title: authorTitle,
        imageUrl: authorImage,
      },
      post: {
        publishedAt: datePublished,
        content: articleBody,
        imageUrl: postImage,
      },
    };
  } catch (error: any) {
    throw new Error(`❌ Failed to fetch LinkedIn post: ${error.message}`);
  }
}
