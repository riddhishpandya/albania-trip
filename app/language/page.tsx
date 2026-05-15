"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Languages, Volume2 } from "lucide-react";
import { albanianPhrases } from "@/lib/trip-data";

function getPhraseAudioPath(phrase: string) {
  const fileName = phrase
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `/audio/albanian/${fileName}.mp3`;
}

export default function LanguagePage() {
  const [activeCategory, setActiveCategory] = useState(albanianPhrases[0].category);
  const [spokenPhrase, setSpokenPhrase] = useState<string | null>(null);

  const activePhraseGroup = albanianPhrases.find((category) => category.category === activeCategory);

  const speakPhrase = (phrase: string) => {
    setSpokenPhrase(phrase);

    const phraseAudio = new Audio(getPhraseAudioPath(phrase));
    const fallbackToDeviceVoice = () => {
      if (!("speechSynthesis" in window)) {
        setSpokenPhrase(null);
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = "sq-AL";
      utterance.rate = 0.86;

      utterance.onend = () => setSpokenPhrase(null);
      utterance.onerror = () => setSpokenPhrase(null);

      window.speechSynthesis.speak(utterance);
    };

    phraseAudio.onended = () => setSpokenPhrase(null);
    phraseAudio.onerror = fallbackToDeviceVoice;

    phraseAudio.play().catch(() => {
      fallbackToDeviceVoice();
    });
  };

  return (
    <main className="subPage">
      <div className="subPageHeader">
        <Link href="/" className="textLink">
          <ArrowLeft size={16} />
          Back to home
        </Link>
        <h1>Language</h1>
        <p>Tap any phrase to hear it spoken in Albanian.</p>
      </div>

      <section>
        <div className="sectionHeader">
          <div>
            <p className="sectionKicker">Learn</p>
            <h2>Albanian Phrases</h2>
          </div>
        </div>

        <div className="hubTabs phraseTabs" role="tablist" aria-label="Phrase categories">
          {albanianPhrases.map((category) => (
            <button
              key={category.category}
              role="tab"
              aria-selected={activeCategory === category.category}
              className={activeCategory === category.category ? "hubTabButton active" : "hubTabButton"}
              type="button"
              onClick={() => setActiveCategory(category.category)}
            >
              {category.category}
            </button>
          ))}
        </div>

        <div className="phraseList">
          {activePhraseGroup?.phrases.map((phrase) => (
            <button
              className={spokenPhrase === phrase.albanian ? "phraseCard speaking" : "phraseCard"}
              key={`${phrase.albanian}-${phrase.english}`}
              type="button"
              onClick={() => speakPhrase(phrase.albanian)}
              aria-label={`Hear ${phrase.albanian}, ${phrase.english}`}
            >
              <div>
                <strong>{phrase.albanian}</strong>
                <p className="pronunciation">{phrase.pronunciation}</p>
              </div>
              <div className="phraseMeaning">
                <Volume2 size={18} />
                <p>{phrase.english}</p>
                {phrase.note ? <p className="phraseNote">{phrase.note}</p> : null}
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
