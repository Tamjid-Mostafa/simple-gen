export const ONBOARDING_STEPS = [
  "shareContent",
  "postPurpose",
  "writingStyle",
  "industry",
  "jobDescription",
  "fineTuning",
  "cta",
] as const;

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];

export const ONBOARDING_OPTIONS: Record<string, (string | { label: string; description: string })[]> = {  
  shareContent: [
    "Thought Leadership Strategies",
    "Career Tips",
    "Product Launches",
    "Company Updates",
    "Industry News",
    "Personal Achievements",
    "Case Studies",
    "Event Announcements",
    "Educational Content",
  ],
  postPurpose: [
    "Networking",
    "Building a personal brand",
    "Seeking new job opportunities",
    "Generating leads",
    "Sharing professional expertise",
    "Recruiting talent",
    "Learning new skills",
    "Promoting events or webinars",
    "Researching competitors",
  ],
  writingStyle: [
    { label: "Formal", description: "Traditional and corporate-friendly" },
    { label: "Casual", description: "Relaxed and approachable" },
    { label: "Inspirational", description: "Uplifting and motivating" },
    { label: "Analytical", description: "Data-focused and detailed" },
    { label: "Conversational", description: "Interactive and friendly" },
    { label: "Authoritative", description: "Expert and commanding" },
    { label: "Witty", description: "Humorous and clever" },
    { label: "Persuasive", description: "Convincing and compelling" },
    { label: "Educational", description: "Informative and instructive" },
  ],

  industry: [
    "AI & ML",
    "Coaching",
    "Design",
    "Finance",
    "IT",
    "Marketing",
    "Real Estate",
    "Sales",
    "Web3",
    "Web Development",
  ],
  jobDescription: [
    "Executive (CEO, CFO, CTO, etc.)",
    "Designer (Graphic, UI/UX, Product)",
    "Analyst (Business, Data, etc.)",
    "Developer (Web, Software, Mobile)",
    "Manager (Project, Sales, Marketing, etc.)",
    "Marketing Professional",
    "Consultant",
    "Writer/Editor",
    "Customer Service Representative",
  ],
};

export function getStepTitle(step: string): string {
  switch (step) {
    case "shareContent":
      return "What do you like to share on LinkedIn?";
    case "postPurpose":
      return "Why are you posting on LinkedIn?";
    case "writingStyle":
      return "What is your writing style?";
    case "industry":
      return "What is your industry?";
    case "jobDescription":
      return "What is your job description?";
    case "fineTuning":
      return "Fine tune your EasyGen";
    case "cta":
      return "Modify post CTA";
    default:
      return "";
  }
}

export function getStepDescription(step: string): string {
  switch (step) {
    case "shareContent":
      return "Select the types of content you want to share.";
    case "postPurpose":
      return "Select your primary goals for posting.";
    case "writingStyle":
      return "Choose your preferred tone and style.";
    case "industry":
      return "Select your primary industry.";
    case "jobDescription":
      return "Select your current role.";
    case "fineTuning":
      return "Write a short sentence describing what you do or who you help.";
    case "cta":
      return "Enter your CTA modifications...";
    default:
      return "";
  }
}
