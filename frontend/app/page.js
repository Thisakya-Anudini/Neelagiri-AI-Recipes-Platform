import { Button } from "@/components/ui/button";
import PricingSection from "@/components/PricingSection";




export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 ">
      <section className="pt-32 pb-20 px-4" >
      <Button variant="default" size="xl">Subscribe to Neelagiri </Button>
      <PricingSection />
      </section>
    </div>
    

  );
}
