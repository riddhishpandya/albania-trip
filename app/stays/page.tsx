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
          <article className="stayCard" key={stay.id}>
            <img className="stayHero" src={stay.images[0]} alt={`${stay.name} exterior`} />
            <div className="stayContent">
              <div className="stayTopline">
                <h3>{stay.name}</h3>
                <span className={`stayStatus ${stay.status}`}>{stayStatusLabels[stay.status]}</span>
              </div>
              <p>{stay.location}</p>
              <p>{stay.dates}</p>
              {stay.note ? <p className="stayNote">{stay.note}</p> : null}
              <div className="stayActions">
                <a href={stay.url} target="_blank" rel="noreferrer">
                  <ExternalLink size={16} />
                  View stay
                </a>
              </div>
              {stay.images.length > 1 ? (
                <div className="stayGallery">
                  {stay.images.slice(1, 4).map((img, idx) => (
                    <img key={idx} src={img} alt={`${stay.name} photo ${idx + 2}`} />
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
