import React from 'react';
import { useLocation } from 'react-router-dom';
import { IndicePantallaGrande } from '../../helpers/Menus&IndexHelpers/IndicePantallaGrande';

export const NavBarBigScreenSettingsButtons = ({ user, isScrolledIndex, toggleConfig }) => {
  const location = useLocation();

  return (
    <div>
      {user.id && (
        <div className="relative flex items-center justify-between w-full pr-1 bg-transparent">
          {location.pathname === '/' && (
            <div className="z-0 hidden w-1/4 h-full sm:block">
              <div className="flex flex-col items-center justify-center min-h-screen">
                <IndicePantallaGrande
                  textAlign={'text-start'}
                  isScrolledIndex={isScrolledIndex}
                  toggleConfig={toggleConfig}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}