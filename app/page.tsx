"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BedDouble,
  BookOpen,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  ClipboardList,
  Clock3,
  ExternalLink,
  MapPinned,
  Plane,
  Search,
  Sparkles,
  X,
  Utensils
} from "lucide-react";
import {
  foodQuest,
  funFacts,
  heroImages,
  hypeMoments,
  mustGoSpots,
  quickLinks,
  sourceLinks,
  spotBacklog,
  statCards,
  stays,
  topQuestions,
  tripDays
} from "@/lib/trip-data";
import { RouteMap } from "./components/RouteMap";

const statusLabels = {
  booked: "Booked",
  "needs-plan": "Needs plan",
  "travel-heavy": "Travel heavy",
  open: "Open"
};

const stayStatusLabels = {
  booked: "Booked",
  hold: "Held",
  planned: "Planned"
};

const sections = [
  { href: "/", label: "Home" },
  { href: "/itinerary", label: "Itinerary" },
  { href: "/stays", label: "Stays" },
  { href: "/explore", label: "Explore" },
  { href: "#research", label: "Sources" }
];

export default function Home() {
  const featuredDay = tripDays.find((day) => day.id === "may-17") ?? tripDays[0];
  const [activeMoment, setActiveMoment] = useState(0);
  const [expandedStay, setExpandedStay] = useState<string | null>(stays[0]?.id ?? null);
  const [activeDayId, setActiveDayId] = useState<string | null>(null);
  const [activeSpotTitle, setActiveSpotTitle] = useState<string | null>(null);
  const [activeMomentTitle, setActiveMomentTitle] = useState<string | null>(null);
  const selectedMoment = hypeMoments[activeMoment];
  const activeDay = tripDays.find((day) => day.id === activeDayId) ?? null;
  const activeSpot = mustGoSpots.find((spot) => spot.title === activeSpotTitle) ?? null;
  const activeMomentDetail = hypeMoments.find((moment) => moment.title === activeMomentTitle) ?? null;

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
          <p className="heroCopy">
            The route, stays, food ideas, open decisions, and a few trip previews everyone can poke through before
            we go.
          </p>
          <div className="heroActions" aria-label="Primary actions">
            <a href="#preview" className="primaryButton">
              <Sparkles size={18} />
              Trip Preview
            </a>
            <a href="#itinerary" className="secondaryButton">
              <CalendarDays size={18} />
              View Itinerary
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

      <section className="sectionGrid introGrid">
        <div>
          <p className="sectionKicker">Current focus</p>
          <h2>Make the open days easy to choose.</h2>
          <p>
            The route is mostly set. The useful part now is making the big choices visible: Theth logistics, Berat
            sunset, the Riviera beach day, Sarande/Ksamil/Gjirokaster, and the Corfu ferry.
          </p>
        </div>
        <article className="focusPanel">
          <div className="panelHeader">
            <Sparkles size={20} />
            <span>Featured Day</span>
          </div>
          <h3>
            {featuredDay.weekday} {featuredDay.shortDate}: {featuredDay.location}
          </h3>
          <ul>
            {featuredDay.plans.slice(0, 4).map((plan) => (
              <li key={plan}>
                <CheckCircle2 size={16} />
                {plan}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section" id="preview">
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Trip preview</p>
            <h2>Pick A Day To Preview</h2>
          </div>
          <a className="textLink" href="#food">
            Food quest <ArrowRight size={16} />
          </a>
        </div>

        <div className="momentExplorer">
          <div className="momentImage">
            <img src={selectedMoment.image} alt="" />
          </div>
          <div className="momentPanel">
            <span className="smallLabel">
              {selectedMoment.date} · {selectedMoment.place}
            </span>
            <h3>{selectedMoment.title}</h3>
            <p>{selectedMoment.why}</p>
            <div className="miniTags">
              {selectedMoment.moves.map((move) => (
                <span key={move}>{move}</span>
              ))}
            </div>
            <div className="momentNote">
              <ClipboardList size={18} />
              {selectedMoment.prompt}
            </div>
          </div>
          <div className="momentPicker" aria-label="Choose a trip preview">
            {hypeMoments.map((moment, index) => (
              <button
                className={index === activeMoment ? "active" : ""}
                key={moment.title}
                onClick={() => setActiveMoment(index)}
                type="button"
              >
                <span>{moment.date}</span>
                {moment.title}
              </button>
            ))}
          </div>
        </div>

        <div className="hypeGrid">
          {hypeMoments.map((moment) => (
            <article className="hypeCard" key={moment.title}>
              <img src={moment.image} alt="" />
              <div className="hypeContent">
                <span className="smallLabel">{moment.date} · {moment.place}</span>
                <h3>{moment.title}</h3>
                <p>{moment.why}</p>
                <div className="miniTags">
                  {moment.moves.map((move) => (
                    <span key={move}>{move}</span>
                  ))}
                </div>
                <button className="cardActionButton" type="button" onClick={() => setActiveMomentTitle(moment.title)}>
                  Open quick plan
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section mustSection">
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Researched shortlist</p>
            <h2>Must-Go Spots</h2>
          </div>
        </div>
        <div className="spotGrid">
          {mustGoSpots.map((spot) => (
            <article className="spotCard" key={`${spot.area}-${spot.title}`}>
              <div className="spotTop">
                <span>{spot.kind}</span>
                <strong>{spot.area}</strong>
              </div>
              <h3>{spot.title}</h3>
              <p>{spot.why}</p>
              <div className="spotFooter">
                <Sparkles size={16} />
                {spot.bestFor}
              </div>
              <button className="cardActionButton" type="button" onClick={() => setActiveSpotTitle(spot.title)}>
                Why this spot
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="section foodSection" id="food">
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Eat the itinerary</p>
            <h2>Food Quest</h2>
          </div>
        </div>
        <div className="foodLayout">
          <div className="foodGrid">
            {foodQuest.map((item) => (
              <article className="foodCard" key={`${item.area}-${item.dish}`}>
                <img src={item.image} alt="" />
                <div className="foodContent">
                  <span className="smallLabel">{item.area}</span>
                  <h3>{item.dish}</h3>
                  <p>{item.why}</p>
                  {item.target ? <strong>{item.target}</strong> : null}
                </div>
              </article>
            ))}
          </div>
          <aside className="factsPanel">
            <div className="panelHeader">
              <BookOpen size={20} />
              <span>Fun Facts</span>
            </div>
            <ul>
              {funFacts.map((fact) => (
                <li key={fact}>
                  <ChevronRight size={16} />
                  {fact}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section" id="itinerary">
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Day by day</p>
            <h2>Itinerary</h2>
          </div>
          <a className="textLink" href="#route">
            Route overview <ArrowRight size={16} />
          </a>
        </div>

        <div className="timeline">
          {tripDays.map((day) => (
            <article className="dayCard" key={day.id}>
              <div className="datePill">
                <span>{day.weekday}</span>
                <strong>{day.shortDate}</strong>
              </div>
              <div className="dayBody">
                <div className="dayTopline">
                  <div>
                    <h3>{day.location}</h3>
                    <p>{day.date}</p>
                  </div>
                  {day.status ? <span className={`status ${day.status}`}>{statusLabels[day.status]}</span> : null}
                </div>

                {day.stay ? (
                  <p className="detailLine">
                    <BedDouble size={16} />
                    {day.stay}
                  </p>
                ) : null}

                {day.transport?.map((item) => (
                  <p className="detailLine" key={item}>
                    <Plane size={16} />
                    {item}
                  </p>
                ))}

                <ul className="planList">
                  {day.plans.map((plan) => (
                    <li key={plan}>
                      <CircleDot size={14} />
                      {plan}
                    </li>
                  ))}
                </ul>

                {day.food?.length ? (
                  <div className="tagRow foodTags">
                    {day.food.map((food) => (
                      <span key={food}>
                        <Utensils size={14} />
                        {food}
                      </span>
                    ))}
                  </div>
                ) : null}

                {day.comments?.length ? (
                  <div className="notesBlock">
                    {day.comments.map((comment) => (
                      <p key={comment}>
                        <AlertTriangle size={15} />
                        {comment}
                      </p>
                    ))}
                  </div>
                ) : null}

                <button className="cardActionButton" type="button" onClick={() => setActiveDayId(day.id)}>
                  Open day details
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="routeSection" id="route">
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Trip route</p>
            <h2>Route Overview</h2>
          </div>
          <a
            className="textLink"
            href="https://www.google.com/maps/dir/Tirana/Theth/Berat/Dhermi/Sarande/Tirana"
            target="_blank"
            rel="noreferrer"
          >
            Open in Maps <ExternalLink size={16} />
          </a>
        </div>
        <div className="routeLayout">
          <RouteMap />
          <div className="questionPanel">
            <div className="panelHeader">
              <ClipboardList size={20} />
              <span>Decisions To Make</span>
            </div>
            <div className="mapLegend">
              <span className="driveLine">Drive route</span>
              <span className="ferryLine">Ferry day trip</span>
            </div>
            <ul>
              {topQuestions.map((question) => (
                <li key={question}>
                  <ChevronRight size={16} />
                  {question}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="stays">
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Lodging</p>
            <h2>Stays</h2>
          </div>
        </div>
        <div className="stayGrid">
          {stays.map((stay) => (
            <article className="stayCard" key={stay.id}>
              <img className="stayHero" src={stay.images[0]} alt="" />
              <div className="stayContent">
                <div className="stayTopline">
                  <span className="smallLabel">{stay.dates}</span>
                  <span className={`stayStatus ${stay.status}`}>{stayStatusLabels[stay.status]}</span>
                </div>
                <h3>{stay.name}</h3>
                <p>{stay.location}</p>
                {stay.note ? <p className="stayNote">{stay.note}</p> : null}
                <div className="stayActions">
                  <button
                    type="button"
                    onClick={() => setExpandedStay(expandedStay === stay.id ? null : stay.id)}
                  >
                    <Camera size={16} />
                    {expandedStay === stay.id ? "Hide photos" : "View photos"}
                  </button>
                  <a href={stay.url} target="_blank" rel="noreferrer">
                    <ExternalLink size={16} />
                    Open link
                  </a>
                </div>
                {expandedStay === stay.id ? (
                  <div className="stayGallery">
                    {stay.images.map((image) => (
                      <img src={image} alt="" key={image} />
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="researchSection" id="research">
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Research and sources</p>
            <h2>Planning Board</h2>
          </div>
          <span className="researchBadge">
            <BookOpen size={16} />
            Researched May 8, 2026
          </span>
        </div>

        <div className="researchLayout compactResearch">
          <aside className="backlog">
            <div className="panelHeader">
              <Search size={20} />
              <span>Next Decisions</span>
            </div>
            <ul>
              {spotBacklog.map((item) => (
                <li key={item}>
                  <Clock3 size={16} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="sourceList">
              <span className="smallLabel">Sources</span>
              {sourceLinks.map((source) => (
                <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
                  {source.label}
                  <ExternalLink size={14} />
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {activeDay ? (
        <div className="tripModalOverlay" role="dialog" aria-modal="true" aria-label="Day details">
          <article className="tripModalCard">
            <button className="tripModalClose" type="button" onClick={() => setActiveDayId(null)} aria-label="Close">
              <X size={18} />
            </button>
            <span className="smallLabel">
              {activeDay.weekday} {activeDay.shortDate} · {activeDay.location}
            </span>
            <h3>{activeDay.date}</h3>
            <ul className="modalList">
              {activeDay.plans.map((plan) => (
                <li key={plan}>{plan}</li>
              ))}
            </ul>
            {activeDay.comments?.length ? (
              <ul className="modalList">
                {activeDay.comments.map((comment) => (
                  <li key={comment}>{comment}</li>
                ))}
              </ul>
            ) : null}
          </article>
        </div>
      ) : null}

      {activeSpot ? (
        <div className="tripModalOverlay" role="dialog" aria-modal="true" aria-label="Spot details">
          <article className="tripModalCard">
            <button className="tripModalClose" type="button" onClick={() => setActiveSpotTitle(null)} aria-label="Close">
              <X size={18} />
            </button>
            <span className="smallLabel">
              {activeSpot.area} · {activeSpot.kind}
            </span>
            <h3>{activeSpot.title}</h3>
            <p>{activeSpot.why}</p>
            <p>{activeSpot.bestFor}</p>
          </article>
        </div>
      ) : null}

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
