"use client";
import { useState, useEffect, useRef, MutableRefObject } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { AnimatePresence, animate, motion, useAnimate } from "framer-motion";
import { Divider } from "../dashboard/sidebar";
import { DropdownItem, DropdownText } from ".";
import { type } from "os";
import { off } from "process";

export type DropDownItemType = "communityList" | "textList" | undefined;

interface communitiyProps {
  name: string;
  description: string;
  ownerId: string;
  logoUrl: string;
  bannerUrl: string;
  status: string;
  createdAt: string;
}

export const DropdownMenu = ({
  itemType = "communityList",
  title = "demo",
  dropdownTextList,
  dropdownCommunityList,
}: {
  itemType: DropDownItemType;
  title?: string;
  dropdownTextList?: string[];
  dropdownCommunityList?: communitiyProps[];
}) => {
  const [isOpen, setOpen] = useState(false);
  const [scope, animate] = useAnimate();
  const [selectedItem, setSelected] = useState(-1);
  const dropdownTitle = useRef(title);

  useEffect(() => {
    if (isOpen) {
      animate(scope.current, { rotate: 180 });
    } else animate(scope.current, { rotate: 0 });
  }, [isOpen, dropdownTitle]);

  return (
    <div className="flex h-fit w-full flex-col space-y-3">
      <div
        className="flex min-h-10 flex-row items-center justify-between rounded px-4 py-1 text-xs font-light text-textSecondary hover:bg-backgroundSecondary"
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        {dropdownTitle.current}
        <motion.div ref={scope}>
          <IoIosArrowUp></IoIosArrowUp>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="flex h-auto flex-col space-y-1"
            initial={{ height: 0 }}
            animate={{
              height: "auto",
              transition: {
                duration: 0.3,
                when: "beforeChildren",
              },
            }}
            exit={{
              height: 0,
              transition: {
                when: "afterChildren",
                duration: 0.3,
              },
            }}
          >
            {itemType === "textList" &&
              dropdownTextList?.length != 0 && //list of text options
              dropdownTextList?.map((textItem, index) => {
                return (
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                  >
                    <DropdownText
                      textItemOption={textItem}
                      onItemClick={() => {
                        dropdownTitle.current = textItem;
                        setOpen(!isOpen);
                      }}
                    />
                  </motion.li>
                );
              })}

            {itemType === "communityList" &&
              dropdownCommunityList?.length != 0 && //list of communitiy options
              dropdownCommunityList?.map((communitiy, index) => {
                return (
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                  >
                    <DropdownItem
                      communityName={communitiy.name}
                      communityAvatar="https://placehold.co/100x100/pink/white?text=logo"
                      onItemClick={() => {
                        setOpen(!isOpen);
                      }}
                    />
                  </motion.li>
                );
              })}

            {dropdownCommunityList == null && dropdownTextList == null && (
              <motion.li
                className="flex items-center justify-center rounded bg-background px-4 py-1 text-xs font-light text-textSecondary"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
              >
                nothing here, folks!
              </motion.li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
