"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { funFacts, culturalFacts } from "@/lib/trip-data";

type FunFact = {
  title: string;
  text: string;
  note?: string;
  emoji?: string;
};

const allFunFacts: FunFact[] = [
  ...funFacts.map((fact) => ({ title: "Albania Fact", text: fact })),
  ...culturalFacts.map((fact) => ({
    title: fact.title,
    text: fact.text,
    note: fact.context,
    emoji: fact.emoji
  }))
];

function getRandomFunFact() {
  return allFunFacts[Math.floor(Math.random() * allFunFacts.length)];
}

export default function FactsPage() {
  const [currentFact, setCurrentFact] = useState<FunFact>(getRandomFunFact());

  return (
    <main className="subPage">
      <div className="subPageHeader">
        <Link href="/" className="textLink">
          <ArrowLeft size={16} />
          Back to home
        </Link>
        <h1>Fun Facts</h1>
        <p>Cultural context and random facts about Albania.</p>
      </div>

      <section>
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Random fact</p>
            <h2>{currentFact.emoji ? `${currentFact.emoji} ` : ""}{currentFact.title}</h2>
          </div>
        </div>

        <div className="funFactCallout factPageCallout">
          <Sparkles size={24} />
          <div>
            <p>{currentFact.text}</p>
            {currentFact.note ? <strong>{currentFact.note}</strong> : null}
          </div>
        </div>

        <button
          className="cardActionButton"
          type="button"
          onClick={() => setCurrentFact(getRandomFunFact())}
          style={{ marginTop: "20px" }}
        >
          <Sparkles size={14} />
          Show another
        </button>
      </section>

      <section>
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">All facts</p>
            <h2>Complete List</h2>
          </div>
        </div>

        <div className="factsList">
          {allFunFacts.map((fact, idx) => (
            <article className="factCard" key={idx}>
              <h3>{fact.emoji ? `${fact.emoji} ` : ""}{fact.title}</h3>
              <p>{fact.text}</p>
              {fact.note ? <strong>{fact.note}</strong> : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
