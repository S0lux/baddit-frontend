"use client";
import { useState, useEffect, ReactNode, Children } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import React from "react";
import { DropdownItem, DropdownText } from ".";
import { twMerge } from "tailwind-merge";

export const DropdownMenu = ({
  children,
  title = "gender",
  classname,
}: {
  children?: ReactNode;
  title?: string;
  classname?: string;
}) => {
  const [isOpen, setOpen] = useState(false);
  const [scope, animate] = useAnimate();
  const [selectedItem, setSelected] = useState(title);

  useEffect(() => {
    if (isOpen) {
      animate(scope.current, { rotate: 180 });
    } else animate(scope.current, { rotate: 0 });
  }, [isOpen]);

  const childrenArray = Children.toArray(children);
  const newChildren = childrenArray.map((child: ReactNode) => {
    if (React.isValidElement(child)) {
      if (child.props["textItemOption"] != null) {
        return (
          <DropdownText
            textItemOption={child.props["textItemOption"]}
            classname={child.props["classname"]}
            onTextClick={async () => {
              await child.props["onTextClick"](child.props["textItemOption"]);
              setSelected(child.props["textItemOption"]);
            }}
          />
        );
      } else if (child.props["communityName"] != null) {
        return (
          <DropdownItem
            communityName={child.props["communityName"]}
            classname={child.props["classname"]}
            communityAvatar={child.props["communityAvatar"]}
            onItemClick={() => {}}
          ></DropdownItem>
        );
      }
    }
  });

  return (
    <div
      className={twMerge("flex h-fit w-auto cursor-pointer flex-col space-y-2")}
      onClick={() => {
        setOpen(!isOpen);
      }}
    >
      <div
        className={twMerge(
          "flex min-h-10 flex-row items-center justify-between gap-2 rounded px-3 py-1 hover:bg-backgroundSecondary",
          classname,
        )}
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        {selectedItem.toUpperCase()}
        <motion.div ref={scope}>
          <IoIosArrowDown></IoIosArrowDown>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            onClick={() => {}}
            className="flex h-full flex-col space-y-1"
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            >
              {newChildren && newChildren.length > 0 ? (
                newChildren
              ) : (
                <div className="w-full items-center justify-center text-center text-xs text-textSecondary">
                  nothing here, folks!
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
