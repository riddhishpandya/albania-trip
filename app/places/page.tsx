import Link from "next/link";
import { ArrowLeft, MapPinned } from "lucide-react";
import { mustGoSpots } from "@/lib/trip-data";

export default function PlacesPage() {
  return (
    <main className="subPage">
      <div className="subPageHeader">
        <Link href="/" className="textLink">
          <ArrowLeft size={16} />
          Back to home
        </Link>
        <h1>Places</h1>
        <p>Must-go spots, beaches, viewpoints, and UNESCO sites along the route.</p>
      </div>

      <section>
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Must-visit</p>
            <h2>Top Spots</h2>
          </div>
        </div>
        <div className="spotGrid">
          {mustGoSpots.map((spot) => (
            <article className="spotCard" key={spot.title}>
              <img className="spotImage" src={spot.image} alt={`${spot.title} in ${spot.area}`} />
              <div className="spotContent">
                <div>
                  <div className="spotTop">
                    <span>{spot.kind}</span>
                    <strong>{spot.area}</strong>
                  </div>
                  <h3>{spot.title}</h3>
                  <p>{spot.why}</p>
                </div>
                <div className="spotFooter">
                  <MapPinned size={16} />
                  {spot.bestFor}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
