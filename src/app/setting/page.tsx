"use client";
import { DropdownMenu, DropdownText } from "@/src/components/dropdown";
import { Divider } from "@/src/components/dashboard/sidebar";
import { SettingItem } from "@/src/components/setting-item";
import { Button } from "@/src/components/button/button";
import { useEffect, useState } from "react";
import AlertBar from "@/src/components/alert/alert-bar";
import { AnimatePresence } from "framer-motion";
import { useModalStore } from "@/src/store/modalStore";
import ModalManager from "@/src/components/auth-modal-manager/modal-manager";
import { useAuthStore } from "@/src/store/authStore";
import axios from "axios";

export default function SettingPage() {
  //gender option
  let genderOption = ["male", "female", "binary", "none"];

  //handling the inputs
  const [displayName, setDisplayName] = useState("");
  const [about, setAbout] = useState("");

  //hadling the altert bar
  const [showAltert, setShowAltert] = useState(false);

  //handling the modals
  const modalOpen = useModalStore((state) => state.modalOpen);
  const modalType = useModalStore((state) => state.modalType);
  const setShowModal = useModalStore((state) => state.setShowModal);

  //user
  const { loggedIn, userData, getUserAsync } = useAuthStore();

  useEffect(() => {}, [showAltert]);

  //manditory loggin in
  useEffect(() => {
    if (loggedIn === false) {
      useModalStore.setState({ modalOpen: true, modalType: "login" });
    }
  }, [loggedIn]);

  const handleGenderChange = async (data: string) => {
    console.log("changed", loggedIn);
    try {
      console.log(data);
      let res = await axios.get("https://api.baddit.life/v1/users/me");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col space-y-10 pt-[70px] md:px-10 lg:px-36">
      {/* {modal} */}
      <ModalManager></ModalManager>

      <div className="text-lg font-medium">User setting</div>
      <div className="w-2/3">
        <div className="space-y-9">
          <Divider title="Account setting" classname="font-medium"></Divider>

          {/* {Change password} */}
          <SettingItem
            childSameLine={true}
            title="Change password"
            subTitle="Password must be at least 8 characters long"
          >
            <Button
              variant={"outlined"}
              size={"small"}
              onClick={() => {
                useModalStore.setState({
                  modalOpen: true,
                  modalType: "password-change",
                });
              }}
            >
              Change
            </Button>
          </SettingItem>

          {/* {Change gender} */}
          <SettingItem
            childSameLine={true}
            title="Gender"
            subTitle="Tell us how to address you"
          >
            <DropdownMenu classname="text-sm font-semibold text-componentSecondary rounded">
              {genderOption.map((option, index) => {
                return (
                  <DropdownText
                    classname="text-sm font-medium justify-between shadow border-t-[1px]"
                    textItemOption={option}
                    onTextClick={handleGenderChange}
                  ></DropdownText>
                );
              })}
            </DropdownMenu>
          </SettingItem>

          <Divider title="Customize profile" classname="font-medium"></Divider>

          {/* {display name} */}
          <SettingItem
            childSameLine={false}
            title="Display name (optional)"
            subTitle="Set a display name. This does not change your username."
          >
            <input
              placeholder="Display name (optional)"
              className="rounded border-2 border-backgroundSecondary px-2 py-2 text-sm font-light"
              maxLength={30}
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
              onBlur={(e) => {
                setShowAltert(true);
                setTimeout(() => {
                  setShowAltert(false);
                }, 2000);
              }}
            ></input>
            <div className="text-xs text-textSecondary">
              {30 - displayName.length} characters remaining
            </div>
          </SettingItem>

          {/* {description} */}
          <SettingItem
            childSameLine={false}
            title="Display name (optional)"
            subTitle="A brief description of yourself shown on your profile."
          >
            <textarea
              placeholder="About (optional)"
              className="rounded border-2 border-backgroundSecondary px-2 py-2 text-sm font-light"
              maxLength={200}
              rows={5}
              cols={40}
              onChange={(e) => {
                setAbout(e.target.value);
              }}
              onBlur={(e) => {
                setShowAltert(true);
                setTimeout(() => {
                  setShowAltert(false);
                }, 2000);
              }}
            ></textarea>
            <div className="text-xs text-textSecondary">
              {200 - about.length} characters remaining
            </div>
          </SettingItem>
        </div>
      </div>

      {/* {altert bar} */}
      <AnimatePresence>
        {showAltert && (
          <AlertBar
            message="Changes saved"
            status="info"
            className="sticky bottom-2 mt-4 flex w-auto items-center justify-center rounded py-2"
            Mkey="alert-bar"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
