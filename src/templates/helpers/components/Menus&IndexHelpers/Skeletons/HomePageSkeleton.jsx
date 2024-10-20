export function HomePageSkeleton() {
  return (
    <div className="flex flex-col items-start justify-center w-full h-full px-8 py-20 bg-transparent">
      <div className="flex flex-col gap-10 sm:flex-row">
        <div className="w-80 lg:w-[600px]">
          <div className="custom-skeleton"></div>
        </div>
        <div className="w-80 lg:w-[600px]">
          <div className="custom-skeleton"></div>
        </div>
      </div>
    </div>
  );
}
