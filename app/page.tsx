"use client";

import Link from "next/link";
import {
  CalendarDays,
  BedDouble,
  MapPinned,
  Utensils,
  Languages,
  Sparkles,
  DollarSign,
  AlertCircle,
  ClipboardList,
  Coffee
} from "lucide-react";
import {
  heroImages,
  statCards,
  funFacts,
  culturalFacts,
  topQuestions,
  moneyInfo,
  travelTips
} from "@/lib/trip-data";

const navCards = [
  {
    href: "/itinerary",
    label: "Itinerary",
    description: "Day-by-day route, map, and plans for the full 10-day trip.",
    icon: CalendarDays
  },
  {
    href: "/stays",
    label: "Stays",
    description: "All hotels and accommodations with booking links.",
    icon: BedDouble
  },
  {
    href: "/places",
    label: "Places",
    description: "Must-go spots: waterfalls, castles, beaches, and viewpoints.",
    icon: MapPinned
  },
  {
    href: "/food",
    label: "Food",
    description: "Vegetarian dishes to try and restaurant recommendations.",
    icon: Utensils
  },
  {
    href: "/language",
    label: "Language",
    description: "Tap to hear essential Albanian phrases spoken aloud.",
    icon: Languages
  },
  {
    href: "/facts",
    label: "Fun Facts",
    description: "Cultural context and random Albania facts.",
    icon: Sparkles
  },
  {
    href: "/costs",
    label: "Costs",
    description: "LEK to USD converter and typical price reference.",
    icon: DollarSign
  },
  {
    href: "/tips",
    label: "Tips",
    description: "Travel cautions and good-to-know notes.",
    icon: AlertCircle
  }
];

type FunFact = {
  title: string;
  text: string;
  note?: string;
};

const allFunFacts: FunFact[] = [
  ...funFacts.map((fact) => ({ title: "Albania Fun Fact", text: fact })),
  ...culturalFacts.map((fact) => ({
    title: fact.title,
    text: fact.text,
    note: fact.context
  }))
];

function getRandomFunFact() {
  return allFunFacts[Math.floor(Math.random() * allFunFacts.length)];
}

export default function Home() {
  const dailyFunFact = getRandomFunFact();

  return (
    <main>
      <section className="hero" id="top">
        <div className="heroMedia" aria-hidden="true">
          {heroImages.map((image) => (
            <img key={image.location} src={image.url} alt="" />
          ))}
        </div>
        <nav className="topNav" aria-label="Trip sections">
          <Link className="brand" href="/">
            <MapPinned size={20} />
            Albania 2026
          </Link>
        </nav>

        <div className="heroContent">
          <p className="eyebrow">May 15-24, 2026 · friends trip</p>
          <h1>Albania Trip Hub</h1>
          <p className="heroCopy">A pocket guide for the route, stays, food, phrases, and more.</p>
        </div>
      </section>

      <section className="statsBand" aria-label="Trip summary">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <article className="stat" key={stat.label}>
              <Icon size={20} />
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          );
        })}
      </section>

      <section className="section" id="navigation">
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Quick links</p>
            <h2>Trip Guide</h2>
          </div>
        </div>

        <div className="navGrid">
          {navCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link href={card.href} key={card.href} className="navCard">
                <Icon size={24} />
                <h3>{card.label}</h3>
                <p>{card.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section" id="preview">
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Today's learn</p>
            <h2>{dailyFunFact.title}</h2>
          </div>
        </div>
        <div className="funFactCallout">
          <Sparkles size={22} />
          <div>
            <p>{dailyFunFact.text}</p>
            {dailyFunFact.note ? <strong>{dailyFunFact.note}</strong> : null}
          </div>
        </div>
      </section>

      <section className="section" id="decisions">
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Still to decide</p>
            <h2>Open Questions</h2>
          </div>
        </div>
        <ul className="decisionList">
          {topQuestions.map((question) => (
            <li key={question}>
              <ClipboardList size={16} />
              {question}
            </li>
          ))}
        </ul>
      </section>

      <section className="section" id="quickref">
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">At a glance</p>
            <h2>Quick Reference</h2>
          </div>
        </div>

        <div className="quickRefGrid">
          <div className="quickRefCard">
            <DollarSign size={20} />
            <h3>Exchange Rate</h3>
            <p>1 USD ≈ {moneyInfo.currency.usdRate * 1000} LEK</p>
          </div>
          <div className="quickRefCard">
            <Coffee size={20} />
            <h3>Coffee Cost</h3>
            <p>~{moneyInfo.typicalCosts[0]?.lek} LEK per cup</p>
          </div>
          <div className="quickRefCard">
            <AlertCircle size={20} />
            <h3>Key Cautions</h3>
            <p>{travelTips.filter((t) => t.warning).length} warnings to know</p>
          </div>
        </div>
      </section>
    </main>
  );
}
