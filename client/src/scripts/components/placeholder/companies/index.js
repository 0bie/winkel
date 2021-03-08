import React from 'react';
import PlaceholderItem from './item';

export default function CompanyItemPlaceholder({count = 10}) {
  return (
    <ul className="cardlist">
      {[...new Array(count)].map((_, index) => (
        <PlaceholderItem key={index} />
      ))}
    </ul>
  );
}
