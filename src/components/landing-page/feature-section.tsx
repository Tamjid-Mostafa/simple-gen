import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FeatureSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex lg:flex-row flex-col-reverse gap-8 items-center justify-center">
          <div className="flex justify-center">
            <div className="relative w-full max-w-2xl aspect-video shadow-lg overflow-hidden">
              <video autoPlay loop muted playsInline className="w-full h-full">
                <source
                  src="https://cdn.prod.website-files.com/65c3a67cde56d79febb2fb8c%2F66f2f2ea593903215d3b1cd5_Scrollcapture%202024-09-24%20At%20130259-transcode.mp4"
                  type="video/mp4"
                />
                <source
                  src="https://cdn.prod.website-files.com/65c3a67cde56d79febb2fb8c%2F66f2f2ea593903215d3b1cd5_Scrollcapture%202024-09-24%20At%20130259-transcode.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="space-y-4 max-w-sm">
            <h2 className="text-5xl md:text-3xl font-bold">
              Start generating for <br />
              <span className="text-teal-500">free</span> with SimpleGen.
            </h2>
            <p className="text-muted-foreground">
              Generate your first 10 posts free! After that, unlock full
              features for just $19.99/month — less than a cup of coffee to
              power your daily LinkedIn posts.
            </p>
            <Link href="/dashboard" className="">
              <Button className="bg-teal-500 hover:bg-teal-600 mt-5">
                Try SimpleGen Today
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
