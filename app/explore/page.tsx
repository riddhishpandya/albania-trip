import Link from "next/link";
import { ArrowLeft, MapPinned } from "lucide-react";
import { foodQuest, mustGoSpots } from "@/lib/trip-data";

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
              <div className="spotTop">
                <span>{spot.kind}</span>
                <strong>{spot.area}</strong>
              </div>
              <h3>{spot.title}</h3>
              <p>{spot.why}</p>
              <div className="spotFooter">
                <MapPinned size={16} />
                {spot.bestFor}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mustSection" id="food">
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Food quest</p>
            <h2>Vegetarian Highlights</h2>
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
      </section>
    </main>
  );
}
