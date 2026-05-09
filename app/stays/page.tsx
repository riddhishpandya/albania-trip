import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { stays } from "@/lib/trip-data";

const stayStatusLabels = {
  booked: "Booked",
  hold: "Held",
  planned: "Planned"
};

export default function StaysPage() {
  return (
    <main className="subPage">
      <div className="subPageHeader">
        <Link href="/" className="textLink">
          <ArrowLeft size={16} />
          Back to home
        </Link>
        <h1>Stays</h1>
        <p>All lodging options with direct links.</p>
      </div>

      <div className="subPageGrid">
        {stays.map((stay) => (
          <article className="subCard" key={stay.id}>
            <img className="subCardImage" src={stay.images[0]} alt="" />
            <span className="smallLabel">{stay.dates}</span>
            <h3>{stay.name}</h3>
            <p>{stay.location}</p>
            <p>{stayStatusLabels[stay.status]}</p>
            {stay.note ? <p>{stay.note}</p> : null}
            <a href={stay.url} target="_blank" rel="noreferrer" className="cardActionButton">
              <ExternalLink size={16} />
              Open stay link
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}
