"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  MapPinned,
  Sparkles,
  X
} from "lucide-react";
import {
  heroImages,
  hypeMoments,
  quickLinks,
  sourceLinks,
  spotBacklog,
  statCards,
  stays,
  topQuestions,
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
  const activeMomentDetail = hypeMoments.find((moment) => moment.title === activeMomentTitle) ?? null;
  const nextStay = stays[0];

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
              <a key={section.href} href={section.href}>
                {section.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="heroContent">
          <p className="eyebrow">May 15-24, 2026 · friends trip</p>
          <h1>Albania Trip Hub</h1>
          <p className="heroCopy">Home is a launcher. Tap into each section for full details.</p>
          <div className="heroActions" aria-label="Primary actions">
            <a href="/itinerary" className="primaryButton">
              <CalendarDays size={18} />
              Open Itinerary
            </a>
            <a href="/stays" className="secondaryButton">
              <BookOpen size={18} />
              Open Stays
            </a>
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
              className={activeTab === tab.id ? "hubTabButton active" : "hubTabButton"}
              type="button"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "itinerary" ? (
          <article className="hubPanel" role="tabpanel">
            <span className="smallLabel">Route + day plans</span>
            <h3>Itinerary</h3>
            <p>
              Includes the Trip route, Route Overview map, and all daily plans from {tripDays[0]?.shortDate} to{" "}
              {tripDays[tripDays.length - 1]?.shortDate}.
            </p>
            <div className="hubActions">
              <a href="/itinerary" className="cardActionButton">
                Open itinerary <ArrowRight size={16} />
              </a>
            </div>
          </article>
        ) : null}

        {activeTab === "stays" ? (
          <article className="hubPanel" role="tabpanel">
            <span className="smallLabel">Lodging</span>
            <h3>Stays</h3>
            <p>
              Current first stop: {nextStay?.name} in {nextStay?.location}. All stay links and images are in the Stays
              page.
            </p>
            <div className="hubActions">
              <a href="/stays" className="cardActionButton">
                Open stays <ArrowRight size={16} />
              </a>
            </div>
          </article>
        ) : null}

        {activeTab === "explore" ? (
          <article className="hubPanel" role="tabpanel">
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
              <a href="/explore" className="cardActionButton">
                Open explore <ArrowRight size={16} />
              </a>
            </div>
          </article>
        ) : null}

        {activeTab === "decisions" ? (
          <article className="hubPanel" role="tabpanel">
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
