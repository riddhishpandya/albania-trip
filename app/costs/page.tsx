"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, DollarSign, RefreshCw } from "lucide-react";
import { moneyInfo } from "@/lib/trip-data";

export default function CostsPage() {
  const [mode, setMode] = useState<"lek-to-usd" | "usd-to-lek">("lek-to-usd");
  const [lekAmount, setLekAmount] = useState<number>(1000);
  const [usdAmount, setUsdAmount] = useState<number>(10);

  const rate = moneyInfo.currency.usdRate;

  const convertedLek = mode === "usd-to-lek" ? Math.round(usdAmount / rate) : lekAmount;
  const convertedUsd = mode === "lek-to-usd" ? (lekAmount * rate).toFixed(2) : usdAmount;

  const toggleMode = () => {
    setMode(mode === "lek-to-usd" ? "usd-to-lek" : "lek-to-usd");
  };

  return (
    <main className="subPage">
      <div className="subPageHeader">
        <Link href="/" className="textLink">
          <ArrowLeft size={16} />
          Back to home
        </Link>
        <h1>Costs</h1>
        <p>Currency converter and price reference for your trip.</p>
      </div>

      <section>
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Converter</p>
            <h2>Currency Calculator</h2>
          </div>
        </div>

        <div className="converterCard">
          <div className="converterHeader">
            <DollarSign size={20} />
            <span>{mode === "lek-to-usd" ? "LEK to USD" : "USD to LEK"}</span>
            <button className="toggleButton" onClick={toggleMode} type="button" aria-label="Switch conversion direction">
              <RefreshCw size={16} />
            </button>
          </div>

          <div className="converterBody">
            {mode === "lek-to-usd" ? (
              <>
                <div className="converterInput">
                  <input
                    type="number"
                    value={lekAmount}
                    onChange={(e) => setLekAmount(Number(e.target.value))}
                    min="0"
                    step="100"
                  />
                  <span className="currencyLabel">LEK</span>
                </div>
                <div className="converterArrow">→</div>
                <div className="converterResult">
                  <strong>${convertedUsd}</strong>
                  <span className="currencyLabel">USD</span>
                </div>
              </>
            ) : (
              <>
                <div className="converterInput">
                  <input
                    type="number"
                    value={usdAmount}
                    onChange={(e) => setUsdAmount(Number(e.target.value))}
                    min="0"
                    step="1"
                  />
                  <span className="currencyLabel">USD</span>
                </div>
                <div className="converterArrow">→</div>
                <div className="converterResult">
                  <strong>{convertedLek.toLocaleString()}</strong>
                  <span className="currencyLabel">LEK</span>
                </div>
              </>
            )}
          </div>

          <p className="exchangeRate">
            Rate: 1 USD ≈ {Math.round(1 / rate)} LEK
          </p>
        </div>
      </section>

      <section>
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Reference</p>
            <h2>Typical Prices</h2>
          </div>
        </div>

        <div className="costsList">
          {moneyInfo.typicalCosts.map((cost, idx) => (
            <div className="costItem" key={idx}>
              <span className="costName">{cost.item}</span>
              <div className="costValues">
                <strong>{cost.lek} LEK</strong>
                <span className="costUsd">≈ ${(cost.lek * rate).toFixed(2)} USD</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Tips</p>
            <h2>Money Notes</h2>
          </div>
        </div>

        <ul className="moneyTipsList">
          {moneyInfo.tips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
