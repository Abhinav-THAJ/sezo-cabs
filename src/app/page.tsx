import Hero from "@/components/home/Hero";
import ServicesOverview from "@/components/home/ServicesOverview";
import PackagesOverview from "@/components/home/PackagesOverview";
import VehicleShowcase from "@/components/home/VehicleShowcase";
import CTAs from "@/components/home/CTAs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ServicesOverview />
      <VehicleShowcase />
      <PackagesOverview />
      <CTAs />
    </div>
  );
}
