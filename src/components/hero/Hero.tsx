import React, { useEffect, useState } from "react";

const HERO_IMAGES = [
  "https://c.pxhere.com/photos/f7/ce/apple_fruits_fruit_harvest_time_frisch_harvest_yield_fuji-1054761.jpg!d",
  "https://upload.wikimedia.org/wikipedia/commons/9/93/Producci%C3%B3n_de_C%C3%ADtricos_en_Veinticinco_de_Diciembre.jpg",
  "https://static.eldiario.es/clip/607dea5a-1c91-42bd-859b-43600699c34f_16-9-discover-aspect-ratio_default_0.jpg",
];

const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${HERO_IMAGES[index]})`,
      }}
    >
      <div className="hero-content">
        <span>Explora nuestros productos frescos y orgánicos</span>
        <h1>Huerto Hogar te provee de lo que más necesitas</h1>
        <p>Manten una vida saludable a raíz de nuestra selección para ti</p>
      </div>
    </section>
  );
};

export default Hero;
