import type { Metadata } from "next";
import FareCalculatorClient from "./FareCalculatorClient";

export const metadata: Metadata = {
  title: "Fare Calculator | Sezo Cabz",
  description:
    "Instantly estimate your cab fare for Airport Pickup or Local Rides in Kerala. Transparent slab-based pricing with no hidden charges.",
};

export default function FareCalculatorPage() {
  return <FareCalculatorClient />;
}
