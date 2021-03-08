import React from 'react';
import PlaceholderItem from './item';

export default function ContactItemPlaceholder({count = 6}) {
  return (
    <ul className="cardlist">
      {[...new Array(count)].map((_, index) => (
        <PlaceholderItem key={index} />
      ))}
    </ul>
  );
}
