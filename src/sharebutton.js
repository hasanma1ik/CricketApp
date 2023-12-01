import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import FinalSquadImage from './FinalSquadImage';
import Final11Image from './Final11Image';

function ShareButton({ containerId, cricketers, type }) {
  const imageContainerRef = useRef();

  const getFinalImageComponent = (type) => {
    switch (type) {
      case 'finalSquad':
        return <FinalSquadImage cricketers={cricketers} />;
      case 'final11':
        return <Final11Image cricketers={cricketers} />;
      default:
        return null;
    }
  };

  const handleShareClick = () => {
    const imageContainer = imageContainerRef.current;

    if (imageContainer) {
      html2canvas(imageContainer).then((canvas) => {
        const imageData = canvas.toDataURL('image/png');
        const shareWindow = window.open();
        shareWindow.document.write('<img src="' + imageData + '" alt="Final Squad or Final 11"/>');

        // Add an overlay with clickable links
        const overlay = shareWindow.document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(255, 255, 255, 0)'; // Transparent background

        // Add your clickable links to the overlay
        overlay.innerHTML = `
          <a href="${imageData}" download="final_squad_image.png" style="position: absolute; top: 10px; left: 10px;">Download Image</a>
        `;

        shareWindow.document.body.appendChild(overlay);
      }).catch((error) => console.error('Error capturing image:', error));
    } else {
      console.error('Image container not found.');
    }
  };

  return (
    <>
      {/* Share button with different class names based on type */}
      {type === 'final11' ? (
        <button className='next-btn-final11' onClick={handleShareClick}>
          Next
        </button>
      ) : (
        <button className='next-btn-finalsquad' onClick={handleShareClick}>
          Next
        </button>
      )}

      {/* Original component with cricketers' names */}
      <div ref={imageContainerRef} style={{ marginTop: '50px' }}>
        {getFinalImageComponent(type)}
      </div>
    </>
  );
}

export default ShareButton;
 
