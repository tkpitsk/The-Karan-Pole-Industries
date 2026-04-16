import type { Metadata } from "next";
import SteelCalculator from "@/components/calculator/SteelCalculator";

export const metadata: Metadata = {
  title: "Steel Weight Calculator | Karan Pole Industries",
  description:
    "Instantly compute the theoretical mass and weight of various steel profiles including plates, pipes, bars, angles, and beams.",
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-background relative pt-24 pb-16">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-brand-primary/[0.03] to-transparent pointer-events-none"></div>
      
      <div className="relative z-10">
        <SteelCalculator />
      </div>
    </div>
  );
}
