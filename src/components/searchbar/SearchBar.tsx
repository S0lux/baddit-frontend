"use client";
import { ReactNode, useEffect, useRef } from "react";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { SearchBarList } from ".";

export const SearchBar = ({
  children,
  placeHolder,
  classname,
  communitiesList,
  onSearchChange,
}: {
  children?: ReactNode;
  placeHolder?: string;
  classname?: string;
  communitiesList: []; //server-fetched list
  onSearchChange?: () => void; //might be implemented when api introduce search functionallity
}) => {
  const [isSearchBarFocused, setSearchBarFocused] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>(communitiesList);

  const [error, setError] = useState("");

  const filteredList = searchResult.filter((item) => {
    return item.name
      .toLocaleLowerCase()
      .includes(inputValue.toLocaleLowerCase());
  });

  return (
    <div
      id="SearchBar"
      className={twMerge(
        "relative flex max-w-xl flex-row items-center justify-start rounded-2xl bg-backgroundSecondary pl-4",
        isSearchBarFocused && "rounded-b-none bg-background shadow-md",
        classname,
      )}
    >
      <IoSearch className="size-fit text-textPrimary"></IoSearch>
      <input
        className="w-full rounded-full bg-transparent pb-2 pl-1 pt-2 text-sm font-light text-textSecondary outline-none"
        value={inputValue}
        placeholder={placeHolder}
        onFocus={() =>
          setTimeout(() => setSearchBarFocused(!isSearchBarFocused), 100)
        }
        onBlur={() =>
          setTimeout(() => setSearchBarFocused(!isSearchBarFocused), 100)
        }
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      ></input>

      {isSearchBarFocused && (
        <SearchBarList list={filteredList} error={error} />
      )}
    </div>
  );
};
