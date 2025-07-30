export function PendingComponent() {
  return (
    <div className="container py-4 mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Search Games</h1>

      <div className="flex gap-2 max-w-sm">
        <div className="h-10 bg-gray-700 rounded-md animate-pulse flex-1"></div>
        <div className="h-10 bg-gray-700 rounded-md animate-pulse w-24"></div>
      </div>

      {/* Skeleton game cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className=" rounded-lg shadow-md overflow-hidden">
            {/* Skeleton image */}
            <div className="aspect-video bg-gray-700 animate-pulse"></div>
            {/* Skeleton title */}
            <div className="p-4">
              <div className="h-6 bg-gray-700 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
