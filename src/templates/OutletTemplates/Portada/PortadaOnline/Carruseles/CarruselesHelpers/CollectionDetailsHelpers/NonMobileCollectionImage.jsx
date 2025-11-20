import React from 'react'

export const NonMobileCollectionImage = ({ isMobile, src, handleError, filterValue }) => {
  if (isMobile) return null;

  const formattedFilterValue = filterValue.replace(/\s+/g, '-').trim();

  const imageClass = formattedFilterValue === '10-9' ? 'bg-green-700 rounded p-2' :
                    formattedFilterValue === '9-8' ? 'bg-green-600 rounded px-2' :
                    formattedFilterValue === '8-7' ? 'bg-green-500 rounded px-2' :
                    formattedFilterValue === '7-6' ? 'bg-orange-500 rounded px-2' :
                    formattedFilterValue === '6-5' ? 'bg-yellow-500 rounded px-2' :
                    formattedFilterValue === '5-0' ? 'bg-red-600 rounded px-2' :
                    'bg-transparent rounded-none px-0';

  return (
    <div className="flex items-center text-center text-gray-200 sm:flex-row lg:mb-0">
      <div>
        <img
          src={src}
          onError={handleError}
          alt="Colección Icon"
          className={`object-contain w-12 max-h-12 ${imageClass}`}
        />
      </div>
    </div>
  )
}

