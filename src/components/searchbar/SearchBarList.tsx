import { SearchItem } from ".";

export const SearchBarList = ({
  list,
  error,
}: {
  list?: any[];
  error?: string;
}) => {
  return (
    <div className="absolute left-0 top-full h-full w-full rounded-md rounded-t-none">
      {list?.map((item, id) => {
        return (
          <SearchItem
            key={id}
            communityName={item.name}
            communityAvatar="https://placehold.co/100x100/pink/white?text=logo"
            memberCount=""
            className=""
          />
        );
      })}
      {error && (
        <div className="flex flex-row space-x-5 border-t-[2px] border-backgroundSecondary bg-background pb-2 pl-4 pt-2 text-sm font-light text-textSecondary shadow-md">
          Results not found
        </div>
      )}
    </div>
  );
};
