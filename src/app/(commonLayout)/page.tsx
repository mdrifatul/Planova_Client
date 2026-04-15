import { Banner } from "@/components/modules/homepage/Banner";
import { CommunityFeedback } from "@/components/modules/homepage/CommunityFeedback";
import { EmpowerSection } from "@/components/modules/homepage/EmpowerSection";
import { EventsSection } from "@/components/modules/homepage/EventsSection";
import { HowItWorks } from "@/components/modules/homepage/HowItWorks";

export default function Home() {
  return (
    <main>
      <Banner />
      <EventsSection />
      <EmpowerSection />
      <HowItWorks />
      <CommunityFeedback />
    </main>
  );
}
