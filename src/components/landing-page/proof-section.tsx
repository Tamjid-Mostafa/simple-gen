"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, StarHalf } from "lucide-react";

// Single array of reviews with all types
const reviews = [
  // Small reviews
  {
    id: 1,
    name: "Alex Johnson",
    content:
      "SimpleGen has completely transformed my LinkedIn presence. The post generator creates engaging content that resonates with my network!",
    rating: 5,
    type: "small",
  },
  {
    id: 2,
    name: "Sarah Williams",
    content:
      "I was skeptical at first, but SimpleGen proved me wrong. It's intuitive and powerful for creating LinkedIn content.",
    rating: 4.5,
    type: "small",
  },
  {
    id: 3,
    name: "Michael Brown",
    content:
      "The customer support team is incredible. They helped me optimize my LinkedIn strategy in minutes.",
    rating: 5,
    type: "small",
  },
  {
    id: 4,
    name: "Emily Davis",
    content:
      "SimpleGen saved me countless hours of thinking about what to post. My engagement has doubled!",
    rating: 5,
    type: "small",
  },
  {
    id: 5,
    name: "David Wilson",
    content:
      "The AI comment suggestions are mind-blowing. It's like having a LinkedIn expert by my side.",
    rating: 4.5,
    type: "small",
  },
  {
    id: 6,
    name: "Jessica Martinez",
    content:
      "I've tried many LinkedIn tools, but SimpleGen stands out for its ease of use and powerful post generation.",
    rating: 5,
    type: "small",
  },
  {
    id: 7,
    name: "Ryan Taylor",
    content:
      "SimpleGen has become an essential part of my daily LinkedIn routine. Can't imagine networking without it.",
    rating: 5,
    type: "small",
  },
  {
    id: 8,
    name: "Olivia Anderson",
    content:
      "The time-saving automation features alone make this worth it. My LinkedIn engagement has never been higher!",
    rating: 4.5,
    type: "small",
  },
  {
    id: 9,
    name: "Daniel Thomas",
    content:
      "As a small business owner, SimpleGen has been a game-changer for our LinkedIn marketing strategy.",
    rating: 5,
    type: "small",
  },
  {
    id: 10,
    name: "Sophia Garcia",
    content:
      "I'm impressed by how intuitive the interface is. Even LinkedIn beginners can create professional-looking posts.",
    rating: 4.5,
    type: "small",
  },
  {
    id: 11,
    name: "James Rodriguez",
    content:
      "The AI capabilities are truly next-level. It's like having a LinkedIn content strategist on demand.",
    rating: 5,
    type: "small",
  },
  {
    id: 12,
    name: "Emma Wilson",
    content:
      "SimpleGen has streamlined my LinkedIn content creation process. I'm posting consistently now.",
    rating: 5,
    type: "small",
  },
  {
    id: 13,
    name: "Matthew Lee",
    content:
      "The integration with LinkedIn was seamless. Great job by the SimpleGen team!",
    rating: 4.5,
    type: "small",
  },
  {
    id: 14,
    name: "Ava Harris",
    content:
      "I've recommended SimpleGen to all my colleagues. It's essential for LinkedIn networking.",
    rating: 5,
    type: "small",
  },
  {
    id: 15,
    name: "Ethan Clark",
    content:
      "The ROI on SimpleGen was immediate. I saw engagement improvements within the first week of posting.",
    rating: 5,
    type: "small",
  },
  {
    id: 16,
    name: "Isabella Lewis",
    content:
      "As a content creator, SimpleGen has been invaluable for generating LinkedIn post ideas.",
    rating: 4.5,
    type: "small",
  },
  {
    id: 17,
    name: "Noah Walker",
    content:
      "The accuracy of the AI is impressive. It understands LinkedIn's professional tone perfectly.",
    rating: 5,
    type: "small",
  },

  // Medium reviews
  {
    id: 18,
    name: "Charlotte Hall",
    content:
      "SimpleGen's customer service is top-notch. They're always quick to respond and helpful. The onboarding process was smooth, and I was creating engaging LinkedIn posts in no time. I appreciate how they take user feedback seriously and continuously improve the platform.",
    rating: 5,
    type: "medium",
  },
  {
    id: 19,
    name: "Benjamin Young",
    content:
      "We've been able to scale our LinkedIn presence thanks to SimpleGen. It's been a crucial tool for our growth. The automation features have allowed us to maintain consistent posting without increasing our team size. The engagement analytics have helped us refine our LinkedIn strategy.",
    rating: 4.5,
    type: "medium",
  },
  {
    id: 20,
    name: "Amelia King",
    content:
      "The learning curve is minimal, but the features are robust. Perfect balance! Our team was able to start using SimpleGen effectively from day one, yet we're still discovering new ways to optimize our LinkedIn content. The post templates are excellent for maintaining consistency.",
    rating: 5,
    type: "medium",
  },
  {
    id: 21,
    name: "William Wright",
    content:
      "SimpleGen has exceeded our expectations in every way. Truly a revolutionary product for LinkedIn marketing. We've tried similar tools in the past, but none have delivered the same level of quality and ease of use. The comment suggestion features are particularly impressive.",
    rating: 5,
    type: "medium",
  },
  {
    id: 22,
    name: "Abigail Scott",
    content:
      "The time and resources we've saved with SimpleGen have allowed us to focus on strategic LinkedIn initiatives. Our content production has increased by 40% while maintaining high quality. The consistency across all our team members' profiles has improved dramatically.",
    rating: 4.5,
    type: "medium",
  },
  {
    id: 23,
    name: "Henry Adams",
    content:
      "I was up and running with SimpleGen in minutes. The onboarding experience is fantastic. The interface is intuitive, and the help documentation is comprehensive. Whenever I've had questions about optimizing my LinkedIn strategy, the support team has been responsive.",
    rating: 5,
    type: "medium",
  },
  {
    id: 24,
    name: "Elizabeth Baker",
    content:
      "SimpleGen has helped us maintain consistency across all our LinkedIn content. It's been a lifesaver. Our brand voice is now uniform across all team members' posts, which has strengthened our brand identity. The templates and AI suggestions are spot-on.",
    rating: 5,
    type: "medium",
  },
  {
    id: 25,
    name: "Alexander Nelson",
    content:
      "The customization options are extensive. SimpleGen adapts to our LinkedIn strategy, not the other way around. We've been able to create custom post templates that perfectly match our brand voice. The flexibility in scheduling and post types is unmatched.",
    rating: 4.5,
    type: "medium",
  },
  {
    id: 26,
    name: "Sofia Carter",
    content:
      "As someone who was skeptical of AI tools, SimpleGen has completely changed my perspective. The quality of the LinkedIn posts it generates is remarkable, and it feels like the system actually understands our industry and audience. I'm now a believer in what AI can do.",
    rating: 5,
    type: "medium",
  },
  {
    id: 27,
    name: "Joseph Mitchell",
    content:
      "The value for money is exceptional. SimpleGen delivers on all its promises. We've calculated that it saves each team member about 5 hours per week on LinkedIn content creation, which more than justifies the cost. The continuous updates and new features add even more value.",
    rating: 5,
    type: "medium",
  },
  {
    id: 28,
    name: "Mia Perez",
    content:
      "Our team's LinkedIn engagement has increased by 40% since implementing SimpleGen. The numbers speak for themselves. We're able to produce more content with fewer resources, and the quality has actually improved. Our connection requests and message response rates are up.",
    rating: 4.5,
    type: "medium",
  },
  {
    id: 29,
    name: "Samuel Roberts",
    content:
      "The AI suggestions for comments are surprisingly accurate and helpful. It's like having a mind reader! SimpleGen seems to understand what would resonate with my network and offers relevant suggestions that enhance my engagement. The learning algorithm keeps getting better too.",
    rating: 5,
    type: "medium",
  },
  {
    id: 30,
    name: "Evelyn Turner",
    content:
      "SimpleGen has become an essential part of our LinkedIn strategy. We rely on it daily. From brainstorming post ideas to scheduling content, it supports every stage of our process. The collaboration features make team coordination seamless for consistent brand messaging.",
    rating: 5,
    type: "medium",
  },
  {
    id: 31,
    name: "Jacob Phillips",
    content:
      "The continuous improvements and updates show that the SimpleGen team is committed to excellence. Every month brings new features and refinements that make the platform even more powerful for LinkedIn marketing. They clearly listen to user feedback and act on it quickly.",
    rating: 4.5,
    type: "medium",
  },
  {
    id: 32,
    name: "Scarlett Campbell",
    content:
      "SimpleGen has helped us maintain a consistent brand voice across all our LinkedIn communications. This has been crucial as our team has grown and expanded globally. New team members can quickly understand our tone and style thanks to the AI guidance.",
    rating: 5,
    type: "medium",
  },
  {
    id: 33,
    name: "Gabriel Parker",
    content:
      "The collaborative features have improved our team's LinkedIn efficiency tremendously. We can now work on content simultaneously, provide feedback in real-time, and track engagement metrics effectively. The approval workflows have streamlined our review process significantly.",
    rating: 5,
    type: "medium",
  },

  // Large reviews
  {
    id: 34,
    name: "Victoria Evans",
    content:
      "As a marketing director, I appreciate how SimpleGen helps us maintain quality while scaling our LinkedIn content production. Before implementing SimpleGen, we struggled to keep up with consistent posting while maintaining our professional standards. Now, we're able to produce twice the LinkedIn content with the same team size, and our engagement metrics have actually improved. The AI suggestions are remarkably on-brand, and the quality control features catch issues before they go live. The analytics dashboard gives us valuable insights into what types of posts perform best with our audience. I can't imagine managing our LinkedIn presence without it now.",
    rating: 4.5,
    type: "large",
  },
  {
    id: 35,
    name: "Owen Edwards",
    content:
      "The analytics features provide valuable insights that help us continuously improve our LinkedIn strategy. We can now see exactly which posts perform best with our network and why. This data-driven approach has transformed how we plan our content calendar. SimpleGen doesn't just help us create content—it helps us create better content that resonates with our professional audience. The trend analysis and performance predictions have been surprisingly accurate, allowing us to stay ahead of LinkedIn algorithm changes. The ROI tracking features also make it easy to demonstrate the value of our LinkedIn marketing efforts to stakeholders.",
    rating: 5,
    type: "large",
  },
  {
    id: 36,
    name: "Audrey Collins",
    content:
      "SimpleGen's interface is intuitive and user-friendly. Even our least tech-savvy team members love it. The learning curve is minimal, which meant we saw productivity benefits almost immediately after implementation. The contextual help and tooltips are thoughtfully designed, providing guidance exactly when needed without being intrusive. The customizable dashboard allows each team member to focus on the LinkedIn metrics that matter most to them. The mobile app is equally well-designed, allowing us to respond to comments and messages on the go. The recent UI update made the system even more streamlined and pleasant to use.",
    rating: 5,
    type: "large",
  },
  {
    id: 37,
    name: "Leo Stewart",
    content:
      "The quality of LinkedIn content from SimpleGen is consistently high. It's become our secret weapon. Our competitors are constantly asking how we manage to produce so much high-quality content with our team size. The AI seems to understand our industry terminology and audience preferences intuitively. We've been able to expand our LinkedIn content strategy into new formats like polls, carousels, and newsletters without sacrificing quality or consistency. The plagiarism detection and fact-checking features give us confidence that our content is original and accurate. The SEO optimization suggestions have helped improve our discoverability significantly.",
    rating: 4.5,
    type: "large",
  },
  {
    id: 38,
    name: "Lily Sanchez",
    content:
      "We've cut our LinkedIn content production time in half thanks to SimpleGen. Incredible tool! The automated research features save hours of manual work, pulling relevant industry information from trusted sources. The template system allows us to maintain consistency while still creating fresh posts. The revision process is streamlined with intelligent suggestions that actually improve the quality. We've been able to take on more clients for LinkedIn management without expanding our team, which has significantly improved our profitability. The content calendar and scheduling features ensure we maintain a consistent publishing cadence.",
    rating: 5,
    type: "large",
  },
  {
    id: 39,
    name: "Julian Morris",
    content:
      "The personalization capabilities of SimpleGen have helped us connect better with our LinkedIn audience. We can now create dynamic content that adapts based on industry, job role, and company size. Our engagement rates have increased by 35% since implementing these personalized approaches. The audience segmentation tools are powerful yet easy to use, allowing us to target content with precision. The A/B testing features help us continuously refine our messaging for different professional audiences. We've seen a significant increase in qualified leads as a result of this more personalized approach to LinkedIn content creation.",
    rating: 5,
    type: "large",
  },
  {
    id: 40,
    name: "Hannah Rogers",
    content:
      "SimpleGen understands our industry-specific terminology, which was a pleasant surprise. We work in a niche B2B field with specialized vocabulary, and previous tools we tried couldn't handle our technical LinkedIn content. SimpleGen not only understands our terminology but offers relevant suggestions that demonstrate knowledge of our industry. The custom dictionary feature allows us to add company-specific terms and style preferences. The content it generates requires minimal editing, even for our most technical topics. This has been particularly valuable for our thought leadership content on LinkedIn.",
    rating: 4.5,
    type: "large",
  },
  {
    id: 41,
    name: "Christopher Reed",
    content:
      "The consistency of SimpleGen's output is remarkable. It maintains our brand voice perfectly across all LinkedIn posts. Before SimpleGen, our content varied noticeably depending on which team member created it. Now, everything we publish has a unified voice and style that strengthens our brand identity. The style guide integration ensures all content adheres to our established guidelines. The tone analyzer helps us maintain the appropriate voice for different types of LinkedIn content, from thought leadership to company announcements. We've received positive feedback from long-time connections who have noticed and appreciated the improved consistency.",
    rating: 5,
    type: "large",
  },
  {
    id: 42,
    name: "Zoey Cook",
    content:
      "As a small team, SimpleGen has allowed us to produce LinkedIn content at the scale of much larger organizations. We're now competing effectively with companies that have social media teams three times our size. The automation features handle routine tasks like comment suggestions and engagement monitoring, freeing us to focus on strategy and creative direction. The content repurposing tools help us maximize the value of every piece we create by adapting it for different LinkedIn formats. The scheduling and distribution features ensure we maintain a consistent presence. Our LinkedIn audience growth has accelerated significantly.",
    rating: 5,
    type: "large",
  },
  {
    id: 43,
    name: "Caleb Morgan",
    content:
      "The time we save with SimpleGen allows us to focus on LinkedIn strategy rather than execution. Before SimpleGen, our team spent most of their time on content production tasks. Now, they can dedicate more energy to developing innovative campaign concepts and exploring new content directions. The automated post generation handles routine updates and variations, while our team focuses on high-impact creative work. The content performance analytics help us identify what's working on LinkedIn and refine our approach continuously. We've been able to launch several successful new initiatives that wouldn't have been possible with our previous resource constraints.",
    rating: 4.5,
    type: "large",
  },
  {
    id: 44,
    name: "Penelope Bell",
    content:
      "SimpleGen has helped us maintain a consistent LinkedIn publishing schedule, which has boosted our professional visibility significantly. LinkedIn's algorithm rewards consistency, and SimpleGen makes it easy to plan and execute a regular content calendar. The keyword research and optimization features ensure our content is discoverable by our target audience. We've seen our profile views and connection requests increase by 65% in the six months since fully implementing SimpleGen. The content gap analysis helps us identify opportunities to create posts that address trending topics in our industry. The hashtag suggestions have improved our content discoverability substantially.",
    rating: 5,
    type: "large",
  },
  {
    id: 45,
    name: "Miles Murphy",
    content:
      "The variety of LinkedIn content SimpleGen can help with is impressive. It's versatile and adaptable. We use it for everything from short text posts to in-depth articles, polls to carousel posts. The quality is consistently high across all formats. The tone and style adjustments make it easy to create appropriate content for different purposes, from hiring announcements to thought leadership. The multimedia content suggestions help us create more engaging and varied posts. We've been able to experiment with new content types that we previously didn't have the resources to explore, expanding our reach to new audience segments on LinkedIn.",
    rating: 5,
    type: "large",
  },
  {
    id: 46,
    name: "Nora Bailey",
    content:
      "Our LinkedIn conversion rates have improved since implementing SimpleGen in our content strategy. The AI helps us create more persuasive posts that guide users through the professional relationship journey effectively. The call-to-action suggestions are particularly effective, increasing our message and connection request acceptance rates significantly. The emotional intelligence of the content resonates with our audience on a deeper level than our previous approach. We've seen a 28% increase in qualified leads from our LinkedIn efforts. The funnel-specific content recommendations help us address the right pain points and objections at each stage of the B2B buyer's journey.",
    rating: 4.5,
    type: "large",
  },
  {
    id: 47,
    name: "Eli Rivera",
    content:
      "SimpleGen feels like it was designed specifically for our LinkedIn workflow. It fits in perfectly. The customization options allowed us to adapt the platform to our existing processes rather than forcing us to change how we work. The integration with our other marketing tools created a seamless ecosystem that eliminated manual data transfer and duplicate work. The flexible permission system ensures team members have access to the features they need while maintaining appropriate content governance. The automation workflows can be customized to match our approval processes and publication requirements. It truly feels like a tailored LinkedIn solution rather than a one-size-fits-all product.",
    rating: 5,
    type: "large",
  },
  {
    id: 48,
    name: "Grace Cooper",
    content:
      "The support documentation is comprehensive and helpful. It made onboarding to SimpleGen a breeze. The video tutorials cover every LinkedIn feature in detail, with practical examples that demonstrate real-world usage. The knowledge base is well-organized and searchable, making it easy to find answers to specific questions about LinkedIn best practices. The regular webinars provide valuable insights on maximizing the platform's capabilities and keeping up with LinkedIn algorithm changes. The community forum allows users to share tips and best practices. When we have needed direct support, the team has been responsive and knowledgeable.",
    rating: 5,
    type: "large",
  },
  {
    id: 49,
    name: "Levi Richardson",
    content:
      "SimpleGen has helped us create more engaging LinkedIn content that resonates with our professional audience. The engagement metrics across all our team members' profiles have improved significantly since we implemented the platform. The emotional intelligence features help us craft content that connects on a human level while still maintaining professional standards. The readability analysis ensures our content is accessible to our target audience. The headline and first-line suggestions have improved our post visibility and click-through rates. We've received more positive feedback from our LinkedIn network about our content in the last six months than in the previous two years combined.",
    rating: 4.5,
    type: "large",
  },
  {
    id: 50,
    name: "Stella Cox",
    content:
      "I can't imagine going back to our old LinkedIn workflow after experiencing the efficiency of SimpleGen. The platform has transformed how we approach content creation and management on LinkedIn. What used to take days now takes hours, and the quality has improved rather than suffered. The collaborative features have strengthened our team's communication and coordination around our LinkedIn strategy. The analytics provide insights that continuously help us refine our approach and execution. The ROI has been clear and significant, making it easy to justify the investment to our leadership team. SimpleGen has become an indispensable part of our professional networking and marketing technology stack.",
    rating: 5,
    type: "large",
  },
];

// Component for animated stars
const AnimatedStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center mb-2">
      {Array.from({ length: Math.floor(rating) }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
        >
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
        </motion.div>
      ))}
      {rating % 1 !== 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 + Math.floor(rating) * 0.1 }}
        >
          <StarHalf className="h-4 w-4 text-yellow-500 fill-yellow-500" />
        </motion.div>
      )}
    </div>
  );
};

// Function to interleave reviews of different types for better visual distribution
const interleaveReviews = () => {
  const smallReviews = reviews.filter((review) => review.type === "small");
  const mediumReviews = reviews.filter((review) => review.type === "medium");
  const largeReviews = reviews.filter((review) => review.type === "large");

  const result = [];
  const maxLength = Math.max(
    smallReviews.length,
    mediumReviews.length,
    largeReviews.length
  );

  for (let i = 0; i < maxLength; i++) {
    if (i < smallReviews.length) result.push(smallReviews[i]);
    if (i < mediumReviews.length) result.push(mediumReviews[i]);
    if (i < largeReviews.length) result.push(largeReviews[i]);
  }

  return result;
};

// Elegant Review Card with Border Animation
const ReviewCard = ({
  review,
  index,
}: {
  review: (typeof reviews)[0];
  index: number;
}) => {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, {
    once: true,
    amount: 0.2,
    margin: "100px",
  });
  const [isHovered, setIsHovered] = useState(false);

  // Get background color using shadcn color palette
  const getBackgroundColor = (index: number) => {
    const colors = [
      "bg-primary/5",
      "bg-secondary/5",
      "bg-muted/10",
      "bg-accent/5",
      "bg-primary/10",
      "bg-secondary/10",
      "bg-accent/10",
    ];
    return colors[index % colors.length];
  };

  // Set height based on review type
  const getCardHeight = () => {
    switch (review.type) {
      case "small":
        return "min-h-[150px]";
      case "medium":
        return "min-h-[250px]";
      case "large":
        return "min-h-[350px]";
      default:
        return "";
    }
  };

  // Border animation variants
  const borderVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.01 },
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      className={`rounded-lg p-4 shadow-sm ${getBackgroundColor(
        index
      )} break-inside-avoid mb-4 ${getCardHeight()} relative overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for elegant motion
                delay: index * 0.03,
              },
            }
          : { opacity: 0, y: 20 }
      }
      whileHover={{
        y: -5,
        transition: {
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated border SVG */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.rect
            x="0"
            y="0"
            width="100"
            height="100"
            rx="4"
            strokeWidth="0.5"
            stroke="currentColor"
            className="text-primary/30"
            variants={borderVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          />
        </svg>
      </div>

      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={
          inView
            ? {
                opacity: 1,
                transition: { delay: 0.3, duration: 0.8 },
              }
            : { opacity: 0 }
        }
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to right bottom, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.05) 100%)",
          }}
        />
      </motion.div>

      {/* Content with elegant fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={
          inView
            ? {
                opacity: 1,
                transition: {
                  delay: 0.5 + index * 0.05,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                },
              }
            : { opacity: 0 }
        }
      >
        <AnimatedStars rating={review.rating} />

        <motion.p
          className="text-sm mb-2"
          initial={{ opacity: 0 }}
          animate={
            inView
              ? {
                  opacity: 1,
                  transition: {
                    delay: 0.1 + index * 0.01,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }
              : { opacity: 0 }
          }
        >
          {review.content}
        </motion.p>

        <motion.p
          className="text-xs font-semibold"
          initial={{ opacity: 0 }}
          animate={
            inView
              ? {
                  opacity: 1,
                  transition: {
                    delay: 0.2 + index * 0.01,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }
              : { opacity: 0 }
          }
        >
          {review.name}
        </motion.p>
      </motion.div>

      {/* Elegant highlight effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
              }}
              animate={{
                left: ["-100%", "100%", ],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export function ProofSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Get interleaved reviews for better visual distribution
  const interleavedReviews = interleaveReviews();

  return (
    <section className="py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.2,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
          >
            In case you need more{" "}
            <motion.span
              className="text-teal-500 inline-block"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  delay: 0.4,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
            >
              proof
            </motion.span>
            .
          </motion.h2>

          <motion.p
            className="text-muted-foreground mt-2"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.6,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
          >
            We're grateful for our LinkedBoost community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.8,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
          >
            <Button className="bg-teal-500 hover:bg-teal-600 mt-4">
              Try LinkedBoost Today
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
              },
            },
          }}
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4"
        >
          {interleavedReviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
