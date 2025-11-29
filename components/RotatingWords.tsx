"use client";

import { useEffect, useState } from "react";

const WORDS = ["tiempo", "mente", "vida"];

export default function RotatingWords() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2000); // cambia cada 2 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      key={WORDS[index]}
      style={{ color: "#0bb37a" }}
      className="inline-block animate-[recobra-fade_0.5s_ease-out]"
    >
      {WORDS[index]}
    </span>
  );
}