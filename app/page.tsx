import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Features from "@/components/landing/Features";
import WaitlistForm from "@/components/landing/WaitlistForm";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Problem />
      <Features />
      <WaitlistForm />
    </div>
  );
}
