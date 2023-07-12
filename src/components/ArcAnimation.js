import React, { useEffect, useState } from 'react';

const ArcAnimation = ({ svgSource }) => {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    setAnimationStarted(true);
  }, []);

  return (
    <div className="arc-animation-container">
      <img className={`animated-image${animationStarted ? ' animate' : ''}`} src={svgSource} alt="Animated Image" />
    </div>
  );
};

export default ArcAnimation;
