import Link from "next/link";
import { ArrowLeft, ChevronRight, CircleDot, ClipboardList, ExternalLink, Plane } from "lucide-react";
import { topQuestions, tripDays } from "@/lib/trip-data";
import { RouteMap } from "../components/RouteMap";

export default function ItineraryPage() {
  return (
    <main className="subPage">
      <div className="subPageHeader">
        <Link href="/" className="textLink">
          <ArrowLeft size={16} />
          Back to home
        </Link>
        <h1>Itinerary</h1>
        <p>Day-by-day plan in one focused view.</p>
      </div>

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

      <div className="timeline">
        {tripDays.map((day) => (
          <article className="dayCard" key={day.id}>
            <div className="datePill">
              <span>{day.weekday}</span>
              <strong>{day.shortDate}</strong>
            </div>
            <div className="dayBody">
              <div className="dayTopline">
                <h3>{day.location}</h3>
                {day.status ? (
                  <span className={`status ${day.status.replace(" ", "-")}`}>{day.status}</span>
                ) : null}
              </div>
              <p>{day.date}</p>
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
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
