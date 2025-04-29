import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MacbookScroll } from "../ui/macbook-scroll";

export function FeatureSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex lg:flex-row flex-col-reverse gap-8 items-center">
          <div className="flex justify-center">
            <div className="relative w-full max-w-2xl aspect-[4/3] rounded-lg  border shadow-lg">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="SimpleGen interface"
                width={400}
                height={500}
                className="object-cover"
              />
            </div>
          </div>
          <div className="space-y-4 max-w-sm">
            <h2 className="text-5xl md:text-3xl font-bold">
              Start generating for <br />{" "}
              <span className="text-teal-500">free</span> with SimpleGen.
            </h2>
            <p className="text-muted-foreground">
              Generate your first 10 posts free! After that, unlock full
              features for just $19.99/month — less than a cup of coffee to
              power your daily LinkedIn posts.
            </p>
            <Button className="bg-teal-500 hover:bg-teal-600">
              Try SimpleGen Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
