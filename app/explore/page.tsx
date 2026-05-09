import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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

      <div className="subPageGrid">
        {mustGoSpots.map((spot) => (
          <article className="subCard" key={spot.title}>
            <span className="smallLabel">
              {spot.area} · {spot.kind}
            </span>
            <h3>{spot.title}</h3>
            <p>{spot.why}</p>
            <p>{spot.bestFor}</p>
          </article>
        ))}
      </div>

      <div className="subPageGrid">
        {foodQuest.map((food) => (
          <article className="subCard" key={food.dish}>
            <img className="subCardImage" src={food.image} alt="" />
            <span className="smallLabel">{food.area}</span>
            <h3>{food.dish}</h3>
            <p>{food.why}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
