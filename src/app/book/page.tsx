import type { Metadata } from "next";
import BookPageClient from "./BookPageClient";

export const metadata: Metadata = {
  title: "Book a Cab | Sezo Cabz",
  description:
    "Book a premium cab with Sezo Cabz. Instant WhatsApp confirmation.",
};

export default function BookPage() {
  return <BookPageClient />;
}
