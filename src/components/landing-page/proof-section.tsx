import { Button } from "@/components/ui/button"

export function ProofSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">
            In case you need more <span className="text-teal-500">proof</span>.
          </h2>
          <p className="text-muted-foreground mt-2">We're grateful for our SimpleGen community.</p>
          <Button className="bg-teal-500 hover:bg-teal-600 mt-4">Try SimpleGen Today</Button>
        </div>
      </div>
    </section>
  )
}
