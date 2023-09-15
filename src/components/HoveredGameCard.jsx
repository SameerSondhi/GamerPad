import React, { useState } from 'react'


const HoveredGameCard = ({game}) => {
    const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      className={`game-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="game-card-content">
        <h3>{game.name}</h3>
        {/* Additional information */}
        <div className="additional-info">
          <p>Platforms: {game.platforms.join(', ')}</p>
          <p>Stores: {game.stores.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};


export default HoveredGameCard