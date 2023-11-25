import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import styled from 'styled-components';

// Styled component for the image container
const StyledImageContainer = styled.div`
   font-family: 'Permanent Marker', 'cursive';
  font-size: 16px;
  margin-left: -180px;

  /* Add other styles as needed */
`;

function ShareButton({ containerId, cricketers }) {
  const imageContainerRef = useRef();

  const handleShareClick = () => {
    const imageContainer = imageContainerRef.current;

    if (imageContainer) {
      html2canvas(imageContainer).then((canvas) => {
        const imageData = canvas.toDataURL('image/png');
        const shareWindow = window.open();
        shareWindow.document.write('<img src="' + imageData + '" alt="Final Squad or Final 11"/>');
      }).catch((error) => console.error('Error capturing image:', error));
    } else {
      console.error('Image container not found.');
    }
  };

  return (
    <>
      {/* Original component with cricketers' names */}
     <StyledImageContainer ref={imageContainerRef}>
  {Array.isArray(cricketers) && cricketers.map((cricketer) => (
    <div key={cricketer.id}>{cricketer.name}</div>
  ))}
</StyledImageContainer>

      {/* Share button */}
      <button onClick={handleShareClick}>Share on Social Media</button>
    </>
  );
}

export default ShareButton;
