import React from 'react';
import html2canvas from 'html2canvas';

function Final11ImagePopup({ final11 }) {
  const imageContainerRef = React.useRef();

  React.useEffect(() => {
    if (imageContainerRef.current) {
      html2canvas(imageContainerRef.current).then((canvas) => {
        const imageData = canvas.toDataURL('image/png');

        // Create a new window
        const popupWindow = window.open('', '_blank');

        // Write the image data into the new window
        popupWindow.document.write('<img src="' + imageData + '" alt="Final 11 Image"/>');
      });
    }
  }, [final11]);

  return (
    <div ref={imageContainerRef}>
      {/* Your Final11 rendering logic here */}
      {final11.map((cricketer) => (
        <div key={cricketer.id}>
          {/* Render cricketer information as needed */}
          <p>{cricketer.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Final11ImagePopup;
