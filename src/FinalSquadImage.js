// FinalSquadImage.js
import React, { useState } from 'react';
import styled from 'styled-components';

const StyledFinalSquadImage = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Adjust the spacing between items */
  margin-top: 70px; 
  background-color: green; /* Add this line to set the background color */
  font-family: 'Copperplate', 'Papyrus', 'fantasy';

`;

const StyledCricketerContainer = styled.div`
  margin: -4px;
  text-align: center;
  width: 18%; /* Set a fixed width to accommodate 5 items in a row */
  margin-top: 15px; /* Adjust margin-top to move the names upward */
  background-color: green; /* Add this line to set the background color */


`;

const StyledCricketerImage = styled.img`
  border-radius: 50%;
  max-width: 60%; /* Set maximum width to 100% of the container */
  max-height: 60px; /* Set maximum height as needed */
  height: auto;
  background-color: green;
`;
const StyledHeading = styled.h2`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  color: white; /* Set the color of the heading */
  
`;

function FinalSquadImage({ cricketers }) {
  const [loadedImages, setLoadedImages] = useState(0);

  const handleImageLoad = () => {
    setLoadedImages((prevCount) => prevCount + 1);
  };

  return (
    
    <StyledFinalSquadImage>
        <StyledHeading>My Pakistan Test Squad</StyledHeading>
      {cricketers.map((cricketer, index) => (
        <StyledCricketerContainer key={cricketer.id}>
          <StyledCricketerImage
            src= {cricketer.image}
            alt={cricketer.name}
            className="cricketer-image1" // Add a class name here
            onLoad={handleImageLoad}
          />
          {loadedImages === cricketers.length && <p className='cricketer-name1'>{cricketer.name}</p>}
        </StyledCricketerContainer>
      ))}
    
      
    </StyledFinalSquadImage>
  );
}

export default FinalSquadImage;
