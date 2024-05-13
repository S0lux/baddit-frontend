"use client";
import axios from "axios";
import { ReactNode, useEffect } from "react";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { SearchItem } from ".";
import { DebounceInput } from "react-debounce-input";

export const SearchBar = ({
  children,
  placeHolder,
  classname,
}: {
  children?: ReactNode;
  placeHolder?: string;
  classname?: string;
}) => {
  //const [isSearchBarFocused, setSearchBarFocused] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>();

  const handleSearch = async () => {
    console.log("called");
    let link = "https://api.baddit.life/v1/communities/?name=" + inputValue;
    try {
      let res = await axios.get(link);
      setSearchResult(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (inputValue != "") handleSearch();
  }, [inputValue]);

  return (
    <div
      id="SearchBar"
      className={twMerge("relative flex w-full max-w-xl flex-col", classname)}
    >
      <div
        className={twMerge(
          "relative flex flex-row items-center justify-start rounded-2xl bg-backgroundSecondary pl-4",
          searchResult &&
            inputValue &&
            "rounded-b-none bg-background shadow-md",
        )}
      >
        <IoSearch className="size-fit text-textPrimary"></IoSearch>
        <DebounceInput
          className="w-full rounded-full bg-transparent pb-2 pl-1 pt-2 text-sm font-light text-textSecondary outline-none"
          debounceTimeout={200}
          value={inputValue}
          placeholder={placeHolder}
          //onFocus={() => setSearchBarFocused(true)}
          //onBlur={() => setSearchBarFocused(false)}
          onChange={(e: any) => {
            setSearchResult([]);
            setInputValue(e.target.value);
            console.log(e.target.value);
          }}
        ></DebounceInput>
      </div>

      {inputValue && (
        <div className="overflow-y absolute left-0 top-full flex h-full w-full flex-col rounded-md rounded-t-none">
          {inputValue
            ? searchResult!.map((item, index) => {
                return (
                  <SearchItem
                    key={item.id}
                    id={item.id}
                    communityAvatar={item.logoUrl}
                    communityName={item.name}
                    memberCount={item.memberCount}
                  ></SearchItem>
                );
              })
            : children}
        </div>
      )}
    </div>
  );
};
