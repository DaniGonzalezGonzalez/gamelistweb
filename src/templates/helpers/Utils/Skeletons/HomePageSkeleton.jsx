export function HomePageSkeleton() {
  return (
    <div className="flex flex-col items-start justify-center w-full h-full px-8 py-20 bg-transparent sm:pl-24">
      <div className="flex w-full gap-4 lg:gap-8 lg:flex-row">
        <div className="w-full h-32 bg-gray-500 lg:h-48 animate-pulse lg:w-1/2 rounded-xl"></div>
        <div className="w-full h-32 bg-gray-500 lg:h-48 animate-pulse lg:w-1/2 rounded-xl"></div>
      </div>
    </div>
  );
}
