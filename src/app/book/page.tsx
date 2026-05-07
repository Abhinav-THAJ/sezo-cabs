import type { Metadata } from "next";
import BookPageClient from "./BookPageClient";

export const metadata: Metadata = {
  title: "Book a Cab & Driver Registration | Sezo Cabz",
  description:
    "Book a premium cab or register as a driver with Sezo Cabz. Instant WhatsApp confirmation.",
};

export default function BookPage() {
  return <BookPageClient />;
}
