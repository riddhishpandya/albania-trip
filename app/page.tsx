"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertCircle,
  Anchor,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Car,
  CheckCircle2,
  CircleDot,
  ClipboardList,
  Coffee,
  DollarSign,
  ExternalLink,
  Heart,
  MapPinned,
  Shield,
  Sparkles,
  Triangle,
  Users,
  Waves,
  Wifi,
  X
} from "lucide-react";
import {
  albanianPhrases,
  culturalFacts,
  heroImages,
  hypeMoments,
  moneyInfo,
  quickLinks,
  sourceLinks,
  spotBacklog,
  statCards,
  stays,
  topQuestions,
  travelTips,
  tripDays
} from "@/lib/trip-data";

const sections = [
  { href: "/", label: "Home" },
  { href: "/itinerary", label: "Itinerary" },
  { href: "/stays", label: "Stays" },
  { href: "/explore", label: "Explore" }
];

const homeTabs = [
  { id: "itinerary", label: "Itinerary" },
  { id: "stays", label: "Stays" },
  { id: "explore", label: "Explore" },
  { id: "decisions", label: "Decisions" }
] as const;

type HomeTabId = (typeof homeTabs)[number]["id"];

export default function Home() {
  const [activeTab, setActiveTab] = useState<HomeTabId>("itinerary");
  const [activeMomentTitle, setActiveMomentTitle] = useState<string | null>(null);
  const [activePhraseCategory, setActivePhraseCategory] = useState<string>(albanianPhrases[0].category);
  const [lekAmount, setLekAmount] = useState<number>(1000);
  const activeMomentDetail = hypeMoments.find((moment) => moment.title === activeMomentTitle) ?? null;
  const nextStay = stays[0];

  const usdAmount = (lekAmount * moneyInfo.currency.usdRate).toFixed(2);

  // Close modal on Escape key
  if (typeof window !== "undefined") {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setActiveMomentTitle(null);
    });
  }

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
          <div className="navLinks">
            {sections.map((section) => (
              <Link key={section.href} href={section.href}>
                {section.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="heroContent">
          <p className="eyebrow">May 15-24, 2026 · friends trip</p>
          <h1>Albania Trip Hub</h1>
          <p className="heroCopy">Home is a launcher. Tap into each section for full details.</p>
          <div className="heroActions" aria-label="Primary actions">
            <Link href="/itinerary" className="primaryButton">
              <CalendarDays size={18} />
              Open Itinerary
            </Link>
            <Link href="/stays" className="secondaryButton">
              <BookOpen size={18} />
              Open Stays
            </Link>
          </div>
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

      <section className="quickStrip" aria-label="Quick categories">
        {quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <span key={item.label}>
              <Icon size={16} />
              {item.label}
            </span>
          );
        })}
      </section>

      <section className="section">
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Control center</p>
            <h2>Tap Instead Of Scroll</h2>
          </div>
        </div>

        <div className="hubTabs" role="tablist" aria-label="Home sections">
          {homeTabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              className={activeTab === tab.id ? "hubTabButton active" : "hubTabButton"}
              type="button"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "itinerary" ? (
          <article className="hubPanel" role="tabpanel" id="panel-itinerary">
            <span className="smallLabel">Route + day plans</span>
            <h3>Itinerary</h3>
            <p>
              Includes the Trip route, Route Overview map, and all daily plans from {tripDays[0]?.shortDate} to{" "}
              {tripDays[tripDays.length - 1]?.shortDate}.
            </p>
            <div className="hubActions">
              <Link href="/itinerary" className="cardActionButton">
                Open itinerary <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ) : null}

        {activeTab === "stays" ? (
          <article className="hubPanel" role="tabpanel" id="panel-stays">
            <span className="smallLabel">Lodging</span>
            <h3>Stays</h3>
            <p>
              Current first stop: {nextStay?.name} in {nextStay?.location}. All stay links and images are in the Stays
              page.
            </p>
            <div className="hubActions">
              <Link href="/stays" className="cardActionButton">
                Open stays <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ) : null}

        {activeTab === "explore" ? (
          <article className="hubPanel" role="tabpanel" id="panel-explore">
            <span className="smallLabel">Food + spots</span>
            <h3>Explore</h3>
            <p>Use Explore for must-go spots and vegetarian food targets.</p>
            <div className="miniTags">
              {hypeMoments.slice(0, 3).map((moment) => (
                <button className="cardActionButton" key={moment.title} type="button" onClick={() => setActiveMomentTitle(moment.title)}>
                  <Sparkles size={14} />
                  {moment.title}
                </button>
              ))}
            </div>
            <div className="hubActions">
              <Link href="/explore" className="cardActionButton">
                Open explore <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ) : null}

        {activeTab === "decisions" ? (
          <article className="hubPanel" role="tabpanel" id="panel-decisions">
            <span className="smallLabel">Open items</span>
            <h3>Decisions</h3>
            <ul className="modalList">
              {topQuestions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
            <div className="sourceList">
              <span className="smallLabel">Sources</span>
              {sourceLinks.slice(0, 4).map((source) => (
                <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
                  {source.label}
                  <ExternalLink size={14} />
                </a>
              ))}
            </div>
          </article>
        ) : null}
      </section>

      <section className="researchSection" id="research">
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Backlog</p>
            <h2>Next Decisions</h2>
          </div>
        </div>
        <div className="researchLayout compactResearch">
          <aside className="backlog">
            <div className="panelHeader">
              <ClipboardList size={20} />
              <span>Action list</span>
            </div>
            <ul>
              {spotBacklog.slice(0, 4).map((item) => (
                <li key={item}>
                  <CheckCircle2 size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Albanian Phrases Section */}
      <section className="section" id="phrases">
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Language</p>
            <h2>Essential Albanian Phrases</h2>
          </div>
        </div>
        <div className="hubTabs" role="tablist" aria-label="Phrase categories">
          {albanianPhrases.map((category) => (
            <button
              key={category.category}
              role="tab"
              className={activePhraseCategory === category.category ? "hubTabButton active" : "hubTabButton"}
              type="button"
              onClick={() => setActivePhraseCategory(category.category)}
            >
              {category.category}
            </button>
          ))}
        </div>
        <div className="hubPanel">
          <div className="phraseList">
            {albanianPhrases
              .find((c) => c.category === activePhraseCategory)
              ?.phrases.map((phrase, idx) => (
                <div className="phraseCard" key={idx}>
                  <div>
                    <strong>{phrase.albanian}</strong>
                    <p className="pronunciation">{phrase.pronunciation}</p>
                  </div>
                  <div className="phraseMeaning">
                    <p>{phrase.english}</p>
                    {phrase.note ? <p className="phraseNote">{phrase.note}</p> : null}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Cultural Context Section */}
      <section className="section" id="culture">
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Know Before You Go</p>
            <h2>Cultural Context</h2>
          </div>
        </div>
        <div className="cultureGrid">
          {culturalFacts.map((fact, idx) => {
            const IconComponent = {
              Shield,
              House: MapPinned,
              Coffee,
              CircleDot,
              Triangle: MapPinned,
              BookOpen
            }[fact.icon] || Shield;
            return (
              <article className="cultureCard" key={idx}>
                <div className="cultureIcon">
                  <IconComponent size={24} />
                </div>
                <h3>{fact.title}</h3>
                <p>{fact.text}</p>
                <p className="cultureContext">{fact.context}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Money Section with Calculator */}
      <section className="section" id="money">
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Budget</p>
            <h2>Money & Costs</h2>
          </div>
        </div>
        <div className="moneyLayout">
          <div className="moneyPanel">
            <div className="panelHeader">
              <DollarSign size={20} />
              <span>LEK to USD Converter</span>
            </div>
            <div className="calculator">
              <div className="calcInput">
                <input
                  type="number"
                  value={lekAmount}
                  onChange={(e) => setLekAmount(Number(e.target.value))}
                  min="0"
                  step="100"
                />
                <span className="currencyLabel">LEK</span>
              </div>
              <div className="calcResult">
                <strong>${usdAmount}</strong>
                <span className="currencyLabel">USD</span>
              </div>
            </div>
            <p className="exchangeRate">Rate: 1 USD ≈ 91 LEK</p>
          </div>
          <div className="costsPanel">
            <div className="panelHeader">
              <Coffee size={20} />
              <span>Typical Costs</span>
            </div>
            <ul className="costList">
              {moneyInfo.typicalCosts.slice(0, 6).map((cost, idx) => (
                <li key={idx}>
                  <span>{cost.item}</span>
                  <strong>~{cost.lek} LEK</strong>
                  <span className="usdCost">(~${(cost.lek * moneyInfo.currency.usdRate).toFixed(2)})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="moneyTips">
          {moneyInfo.tips.map((tip, idx) => (
            <span className="moneyTipBadge" key={idx}>
              <CheckCircle2 size={14} />
              {tip}
            </span>
          ))}
        </div>
      </section>

      {/* Travel Tips Section */}
      <section className="section" id="tips">
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Be Prepared</p>
            <h2>Travel Tips & Cautions</h2>
          </div>
        </div>
        <div className="tipsGrid">
          {travelTips.map((category, idx) => {
            const IconComponent = {
              DollarSign,
              Car,
              Users,
              AlertCircle,
              Waves,
              Anchor,
              Heart,
              Wifi
            }[category.icon] || AlertCircle;
            return (
              <article className={`tipCard ${category.warning ? "warning" : ""}`} key={idx}>
                <div className="tipHeader">
                  <IconComponent size={20} />
                  <h3>{category.category}</h3>
                </div>
                <ul>
                  {category.tips.map((tip, tipIdx) => (
                    <li key={tipIdx}>{tip}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      {activeMomentDetail ? (
        <div className="tripModalOverlay" role="dialog" aria-modal="true" aria-label="Preview details">
          <article className="tripModalCard">
            <button className="tripModalClose" type="button" onClick={() => setActiveMomentTitle(null)} aria-label="Close">
              <X size={18} />
            </button>
            <span className="smallLabel">
              {activeMomentDetail.date} · {activeMomentDetail.place}
            </span>
            <h3>{activeMomentDetail.title}</h3>
            <p>{activeMomentDetail.prompt}</p>
            <ul className="modalList">
              {activeMomentDetail.moves.map((move) => (
                <li key={move}>{move}</li>
              ))}
            </ul>
          </article>
        </div>
      ) : null}
    </main>
  );
}
