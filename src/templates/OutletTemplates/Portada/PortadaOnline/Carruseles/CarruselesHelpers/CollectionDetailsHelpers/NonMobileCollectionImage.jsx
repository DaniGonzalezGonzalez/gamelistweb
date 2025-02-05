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
    <div className="flex flex-col w-full mb-10 text-center text-gray-200 mt-14 jus sm:flex-row lg:mb-0 lg:text-start">
      <div className={`pl-10 lg:pt-32 lg:pb-20`}>
        <img
          src={src}
          onError={handleError}
          alt="Colección Icon"
          className={`object-contain w-80 max-h-80 ${imageClass}`}
        />
      </div>
    </div>
  )
}

