import React from 'react';
import styled from 'styled-components';

const StyledFinal11Image = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Copperplate', 'Papyrus', 'fantasy';
  margin-bottom: 20px;
`;

const StyledCricketerContainer = styled.div`
  margin: -10px;
  text-align: center;
  margin-left: -600px;

 
`;


function Final11Image({ cricketers }) {
  return (
    <StyledFinal11Image>
      {cricketers.map((cricketer, index) => (
        <StyledCricketerContainer key={cricketer.id}>
          
          <p>{`${index + 1}. ${cricketer.name}`}</p>
        </StyledCricketerContainer>
      ))}
    </StyledFinal11Image>
  );
}

export default Final11Image;
