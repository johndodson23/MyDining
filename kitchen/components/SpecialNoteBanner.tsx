
import React from 'react';

interface SpecialNoteBannerProps {
  note: string;
}

export const SpecialNoteBanner: React.FC<SpecialNoteBannerProps> = ({ note }) => {
  if (!note) {
    return null;
  }

  return (
    <div className="p-4 bg-rush-yellow text-yellow-900 rounded-lg mb-4 border-l-4 border-yellow-500">
      <h3 className="font-bold">SPECIAL NOTE</h3>
      <p className="italic">"{note}"</p>
    </div>
  );
};
