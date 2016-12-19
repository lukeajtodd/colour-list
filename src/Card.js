import React from 'react';
import Colour from './Colour';
import Label from './Label';

const Card = ({ color, removeClick }) => {
  return (
    <div>
      <Colour color={color} />
      <Label color={color} removeClick={removeClick}/>
    </div>
  )
};

export default Card;
