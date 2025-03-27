import React from 'react'

export const NonMobileCollectionImage = ({ isMobile, src, handleError, filterValue }) => {
  if (isMobile) return null;

  const formattedFilterValue = filterValue.replace(/\s+/g, '-').trim();

  const imageClass = formattedFilterValue === '10-9' ? 'bg-green-700 rounded-2xl p-6' :
                    formattedFilterValue === '9-8' ? 'bg-green-600 rounded-2xl px-6' :
                    formattedFilterValue === '8-7' ? 'bg-green-500 rounded-2xl px-6' :
                    formattedFilterValue === '7-6' ? 'bg-orange-500 rounded-2xl px-6' :
                    formattedFilterValue === '6-5' ? 'bg-yellow-500 rounded-2xl px-6' :
                    formattedFilterValue === '5-0' ? 'bg-red-600 rounded-2xl px-6' :
                    'bg-transparent rounded-none px-0';

  return (
    <div className="flex items-end justify-end mt-4 mb-10 text-center text-gray-200 sm:flex-row lg:mb-0">
      <div>
        <img
          src={src}
          onError={handleError}
          alt="Colección Icon"
          className={`object-contain w-40 max-h-40 ${imageClass}`}
        />
      </div>
    </div>
  )
}

