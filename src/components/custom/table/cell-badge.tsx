export const MultipleBadges = ({ data }: { data: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {data.map((category, index) => (
      <span key={index} className="inline-block rounded-full bg-black px-2 py-1 text-xs font-semibold text-white">
        {category.trim()}
      </span>
    ))}
  </div>
);

export const SingleBadge = ({ data }: { data: string }) => (
  <div className="flex flex-wrap gap-2">
    <span className="inline-block rounded-full bg-black px-2 py-1 text-xs font-semibold text-white">{data.trim()}</span>
  </div>
);
