"use client";

import Babies from "./components/babies";
import Welcome from "./components/welcome";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="">
        <div className="flex-row justify-center p-8  md:p-16">
          <Welcome />
          <Babies />
        </div>
      </main>
    </div>
  );
}
