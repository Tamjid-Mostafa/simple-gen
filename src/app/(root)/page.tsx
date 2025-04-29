import { Navbar } from "@/components/landing-page/navbar";
import { Hero } from "@/components/landing-page/hero";
import { FeatureSection } from "@/components/landing-page/feature-section";
import { ProofSection } from "@/components/landing-page/proof-section";
import { Footer } from "@/components/landing-page/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShowcaseVideo } from "@/components/landing-page/showcase-video";

export default function HomePage() {
  return (
    <div className="flex-1">
      {/* <Hero /> */}
      <ShowcaseVideo/>
      <FeatureSection />
      <ProofSection />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-2">FAQ's</h1>
            <p className="text-lg text-slate-600">
              Top questions about SimpleGen
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-b border-slate-200">
              <AccordionTrigger className="text-left py-5 font-medium">
                What is the difference between ChatGPT and SimpleGen?
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-slate-600">
                While ChatGPT is a general-purpose AI assistant, SimpleGen
                is specifically designed for creating engaging social media
                content. Our platform is optimized for generating
                high-performing posts with features tailored to content creators
                and marketers.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-slate-200">
              <AccordionTrigger className="text-left py-5 font-medium">
                How often should I post on LinkedIn to see results?
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-slate-600">
                For optimal results, we recommend posting 3-5 times per week on
                LinkedIn. Consistency is key, and our platform helps you
                maintain a regular posting schedule without sacrificing quality.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b border-slate-200">
              <AccordionTrigger className="text-left py-5 font-medium">
                What is the best timing to post on LinkedIn?
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-slate-600">
                The best times to post on LinkedIn are typically Tuesday through
                Thursday between 8am-10am and 1pm-2pm. However, this can vary
                based on your specific audience. Our analytics feature helps you
                determine the optimal posting times for your network.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-slate-200">
              <AccordionTrigger className="text-left py-5 font-medium">
                Should I pay for LinkedIn Premium?
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-slate-600">
                LinkedIn Premium can be beneficial if you're actively job
                searching or need advanced networking features. However, for
                content creation and engagement, our platform provides all the
                tools you need without requiring a LinkedIn Premium
                subscription.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-b border-slate-200">
              <AccordionTrigger className="text-left py-5 font-medium">
                How is SimpleGen better than a ghostwriter?
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-slate-600">
                SimpleGen offers several advantages over traditional
                ghostwriters: it's available 24/7, costs significantly less, can
                generate content in seconds rather than days, and learns from
                your style over time. Plus, you maintain complete control over
                editing and publishing.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
