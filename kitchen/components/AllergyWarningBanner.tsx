
import React from 'react';
import { AlertIcon } from '../../components/Icons';

interface AllergyWarningBannerProps {
  allergies: string[];
}

export const AllergyWarningBanner: React.FC<AllergyWarningBannerProps> = ({ allergies }) => {
  if (allergies.length === 0) {
    return null;
  }

  return (
    <div className="p-4 bg-rush-red text-white rounded-lg mb-4 flex items-start gap-3">
      <AlertIcon className="w-8 h-8 flex-shrink-0" />
      <div>
        <h3 className="font-bold text-lg">ALLERGY ALERT</h3>
        <p>Patient has the following allergies: <span className="font-semibold">{allergies.join(', ')}</span></p>
      </div>
    </div>
  );
};
