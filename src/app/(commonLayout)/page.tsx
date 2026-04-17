import { Banner } from "@/components/modules/homepage/Banner";
import { CommunityFeedback } from "@/components/modules/homepage/CommunityFeedback";
import { EmpowerSection } from "@/components/modules/homepage/EmpowerSection";
import { EventsSection } from "@/components/modules/homepage/EventsSection";
import { FAQSection } from "@/components/modules/homepage/FAQSection";
import { HowItWorks } from "@/components/modules/homepage/HowItWorks";
import { ImpactStats } from "@/components/modules/homepage/ImpactStats";
import { JoinCommunity } from "@/components/modules/homepage/JoinCommunity";

export default function Home() {
  return (
    <main>
      <Banner />
      <EventsSection />
      <ImpactStats />
      <EmpowerSection />
      <HowItWorks />
      <CommunityFeedback />
      <FAQSection />
      <JoinCommunity />
    </main>
  );
}
