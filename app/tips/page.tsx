import Link from "next/link";
import { ArrowLeft, AlertCircle, Car, Users, Waves, Anchor, Heart, Wifi, DollarSign } from "lucide-react";
import { travelTips } from "@/lib/trip-data";

export default function TipsPage() {
  const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
    DollarSign,
    Car,
    Users,
    AlertCircle,
    Waves,
    Anchor,
    Heart,
    Wifi,
  };

  const goodToKnow = travelTips.filter((t) => !t.warning);
  const watchOut = travelTips.filter((t) => t.warning);

  return (
    <main className="subPage">
      <div className="subPageHeader">
        <Link href="/" className="textLink">
          <ArrowLeft size={16} />
          Back to home
        </Link>
        <h1>Tips</h1>
        <p>Travel cautions and helpful notes for your trip.</p>
      </div>

      <section>
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">General</p>
            <h2>Good to Know</h2>
          </div>
        </div>
        <div className="tipsGrid">
          {goodToKnow.map((category, idx) => {
            const Icon = iconMap[category.icon] || AlertCircle;
            return (
              <article className="tipCard" key={idx}>
                <div className="tipHeader">
                  <Icon size={20} />
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

      <section>
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Caution</p>
            <h2>Watch Out</h2>
          </div>
        </div>
        <div className="tipsGrid">
          {watchOut.map((category, idx) => {
            const Icon = iconMap[category.icon] || AlertCircle;
            return (
              <article className="tipCard warning" key={idx}>
                <div className="tipHeader">
                  <Icon size={20} />
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
    </main>
  );
}
