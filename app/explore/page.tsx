import Link from "next/link";
import { ArrowLeft, MapPinned, Utensils, ExternalLink } from "lucide-react";
import { foodQuest, mustGoSpots, restaurantRecs } from "@/lib/trip-data";

export default function ExplorePage() {
  return (
    <main className="subPage">
      <div className="subPageHeader">
        <Link href="/" className="textLink">
          <ArrowLeft size={16} />
          Back to home
        </Link>
        <h1>Explore</h1>
        <p>Must-go spots and vegetarian food highlights.</p>
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

      <section className="mustSection" id="food">
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Vegetarian food</p>
            <h2>Dishes to Try</h2>
          </div>
        </div>
        <div className="foodGrid">
          {foodQuest.map((food) => (
            <article className="foodCard" key={food.dish}>
              <img src={food.image} alt={`${food.dish} dish`} />
              <div className="foodContent">
                <span className="smallLabel">{food.area}</span>
                <h3>{food.dish}</h3>
                <p>{food.why}</p>
                {food.target ? <strong>{food.target}</strong> : null}
              </div>
            </article>
          ))}
        </div>

        <div className="sectionHeader" style={{ marginTop: "32px" }}>
          <div>
            <p className="sectionKicker">Where to eat</p>
            <h2>Restaurant Guide</h2>
          </div>
        </div>
        <div className="restaurantGrid">
          {restaurantRecs.map((rec) => (
            <article className="restaurantCard" key={`${rec.name}-${rec.city}`}>
              {rec.image && <img src={rec.image} alt={`${rec.name} in ${rec.city}`} />}
              <div className="restaurantContent">
                <div className="restaurantHeader">
                  <Utensils size={18} />
                  <div>
                    <h3>{rec.name}</h3>
                    <span className="smallLabel">{rec.city}</span>
                  </div>
                </div>
                <p className="restaurantVibe">{rec.vibe}</p>
                <p>{rec.why}</p>
                <div className="restaurantOrder">
                  <strong>Order:</strong> {rec.veggieOrder}
                </div>
                {rec.mapUrl && (
                  <a href={rec.mapUrl} target="_blank" rel="noopener noreferrer" className="restaurantMapLink">
                    <ExternalLink size={14} />
                    View on Google Maps
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
