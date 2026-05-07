import type { Metadata } from "next";
import BookingClient from "./BookingClient";

export const metadata: Metadata = {
  title: "Book a Cab | Sezo Cabz",
  description:
    "Book a premium cab instantly in Kerala. Airport pickup, local rides, and outstation travel with professional chauffeurs. Confirm via WhatsApp.",
};

export default function BookPage() {
  return <BookingClient />;
}
