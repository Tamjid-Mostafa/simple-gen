"use server";
import axios from "axios";
import * as cheerio from "cheerio";

interface Author {
  name: string;
  image: {
    url: string;
    "@type": string;
  };
  url: string;
  "@type": string;
  interactionStatistic: {
    "@type": string;
    interactionType: string;
    userInteractionCount: number;
  };
}

interface ImageObject {
  url: string;
  "@type": string;
}

interface Comment {
  "@type": string;
  datePublished: string;
  text: string;
  author: { "@type": string; name: string };
  interactionStatistic: {
    "@type": string;
    interactionType: string;
    userInteractionCount: number;
  };
}

interface LinkedInPost {
  "@context": string;
  "@type": string;
  "@id": string;
  datePublished: string;
  headline: string;
  comments: Comment[];
  image: ImageObject;
  articleBody: string;
  author: Author;
  sharedContent: {
    "@type": string;
  };
  hasPart: {
    "@type": string;
    isAccessibleForFree: boolean;
    cssSelector: string;
  };
}

/**
 * Fetches and parses the LinkedIn post JSON data from a given URL.
 * @param {string} url - The LinkedIn post URL.
 * @returns {Promise<LinkedInPost>} - The structured JSON data.
 */
export async function fetchLinkedInPostData(url: string): Promise<LinkedInPost> {
  try {
    // Make a GET request to the LinkedIn URL
    const response = await axios.get(url);

    // Load the HTML content with Cheerio
    const $ = cheerio.load(response.data);

    // Extract the JSON-LD data embedded in the <script> tag
    const jsonLdData = $("script[type='application/ld+json']").html();

    if (!jsonLdData) {
      throw new Error("No JSON-LD data found in the page");
    }

    // Parse the JSON-LD data
    const postData = JSON.parse(jsonLdData);

    // Destructure relevant fields from the JSON-LD data
    const {
      datePublished,
      headline,
      comment = [],
      image,
      articleBody,
      author,
      sharedContent,
      hasPart,
    } = postData;

    // Process author data with defaults
    const authorData: Author = {
      name: author?.name || "Unknown Author",
      image: {
        url: author?.image?.url || "default-image-url",
        "@type": "ImageObject",
      },
      url: author?.url || url,
      "@type": "Person",
      interactionStatistic: {
        "@type": "InteractionCounter",
        interactionType: "http://schema.org/FollowAction",
        userInteractionCount: author?.interactionStatistic?.userInteractionCount || 0,
      },
    };

    // Process comments if they exist
    const comments: Comment[] = comment.map((com: any) => ({
      "@type": "Comment",
      datePublished: com.datePublished || new Date().toISOString(),
      text: com.text || "No comment text",
      author: {
        "@type": "Person",
        name: com.author?.name || "Unknown Author",
      },
      interactionStatistic: {
        "@type": "InteractionCounter",
        interactionType: "http://schema.org/LikeAction",
        userInteractionCount: com.interactionStatistic?.userInteractionCount || 0,
      },
    }));

    // Prepare the final LinkedIn post data
    const jsonData: LinkedInPost = {
      "@context": "http://schema.org",
      "@type": "DiscussionForumPosting",
      "@id": url,
      datePublished: datePublished || new Date().toISOString(),
      headline: headline || "",
      comments: comments,
      image: {
        url: image?.url || "default-image-url",
        "@type": "ImageObject",
      },
      articleBody: articleBody || "No article body available",
      author: authorData,
      sharedContent: {
        "@type": "WebPage",
      },
      hasPart: {
        "@type": "WebPageElement",
        isAccessibleForFree: hasPart?.isAccessibleForFree || false,
        cssSelector: hasPart?.cssSelector || ".details", // Customize as per the actual structure
      },
    };

    return jsonData;
  } catch (error:any) {
    throw new Error(`Failed to fetch or parse the LinkedIn post content: ${error.message}`);
  }
}
