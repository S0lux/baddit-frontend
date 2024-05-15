"use client";
import { Divider } from "@/src/layout/components/sidebar/divider";
import { SettingItem } from "@/src/components/setting-item";
import { Button } from "@/src/components/button/button";
import { useEffect, useRef, useState } from "react";
import { useModalStore } from "@/src/store/modalStore";
import ModalManager from "@/src/components/auth-modal-manager/modal-manager";
import { useAuthStore } from "@/src/store/authStore";
import axios, { Axios, AxiosError } from "axios";
import { toast } from "react-toastify";
import Spinner from "@/src/components/spinner/spinner";
import { IoMdClose } from "react-icons/io";
import { twMerge } from "tailwind-merge";

export default function SettingPage() {
  //handling the inputs
  const [displayName, setDisplayName] = useState("");
  const [about, setAbout] = useState("");

  //user info
  const { loggedIn, userData, getUserAsync } = useAuthStore();

  //upload image handling
  const inputFile = useRef(null);
  const [image, setImage] = useState(null);
  const [displayImage, setDisplayImage] = useState("");
  const [loading, setLoading] = useState(false);

  //manditory loggin in
  useEffect(() => {
    if (loggedIn === false) {
      useModalStore.setState({ modalOpen: true, modalType: "login" });
    }
  }, [loggedIn]);

  const handleImageChange = (event: any) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
    setDisplayImage(
      event.target.files[0] ? URL.createObjectURL(event.target.files[0]) : "",
    );
  };

  const handleSetImage = async () => {
    console.log("submitted");
    let formdata = new FormData();
    if (image != null) {
      console.log(image);
      formdata.append("avatar", image);
    }
    setLoading(true);
    try {
      let res = await axios.post(
        "https://api.baddit.life/v1/users/avatar",
        formdata,
        { withCredentials: true },
      );
      console.log(res);
      toast.success(res.data.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err.data.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-10 pt-[70px] md:px-10 lg:px-36">
      {/* {modal} */}
      <ModalManager></ModalManager>

      <div className="flex flex-col text-lg font-medium">
        User setting
        {loggedIn == false ? (
          <span className="text-xs font-bold text-red-500">
            (please login before using this page)
          </span>
        ) : (
          <></>
        )}
      </div>
      <div className="w-2/3">
        <div className="space-y-9">
          <Divider title="Account setting" classname="font-medium"></Divider>

          {/* {change avatar} */}
          <div>
            <SettingItem
              childSameLine={true}
              title="Edit avatar"
              subTitle="Polish your profile with awsome pictures!"
            >
              <Button
                variant={"outlined"}
                size={"small"}
                disabled={loggedIn == false}
                onClick={() => {
                  inputFile.current.click();
                }}
              >
                Change
              </Button>
              <input
                type="file"
                id="file"
                ref={inputFile}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </SettingItem>

            {displayImage && (
              <>
                <div className="relative w-fit">
                  <img
                    src={displayImage}
                    className={twMerge(
                      "size-20 rounded-full object-cover",
                      loading && "opacity-50",
                    )}
                  ></img>
                  <button
                    className="absolute right-0 top-0 rounded-full bg-backgroundSecondary p-1"
                    onClick={() => {
                      setDisplayImage("");
                      setImage(null);
                    }}
                  >
                    <IoMdClose></IoMdClose>
                  </button>
                  {loading && (
                    <Spinner className="absolute bottom-5 left-5 size-1/2"></Spinner>
                  )}
                </div>

              </>
            )}
          </div>

          {/* {Change password} */}
          <SettingItem
            childSameLine={true}
            title="Change password"
            subTitle="Password must be at least 8 characters long"
          >
            <Button
              variant={"outlined"}
              size={"small"}
              disabled={loggedIn == false}
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

          {/* <Divider title="Customize profile" classname="font-medium"></Divider> */}

          {/* {display name} */}
          {/* <SettingItem
            childSameLine={false}
            title="Display name (optional)"
            subTitle="Set a display name. This does not change your username."
          >
            <input
              placeholder="Display name (optional)"
              className="rounded border-2 border-backgroundSecondary px-2 py-2 text-sm font-light"
              disabled={loggedIn == false}
              maxLength={30}
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
              onBlur={(e) => {
                toast.info("Changes saved!");
              }}
            ></input>
            <div className="text-xs text-textSecondary">
              {30 - displayName.length} characters remaining
            </div>
          </SettingItem> */}

          {/* {description} */}
          {/* <SettingItem
            childSameLine={false}
            title="Display name (optional)"
            subTitle="A brief description of yourself shown on your profile."
          >
            <textarea
              placeholder="About (optional)"
              className="rounded border-2 border-backgroundSecondary px-2 py-2 text-sm font-light"
              disabled={loggedIn == false}
              maxLength={200}
              rows={5}
              cols={40}
              onChange={(e) => {
                setAbout(e.target.value);
              }}
              onBlur={(e) => {
                toast.info("Changes saved!");
              }}
            ></textarea>
            <div className="text-xs text-textSecondary">
              {200 - about.length} characters remaining
            </div>
          </SettingItem> */}
        </div>
      </div>
    </div>
  );
}
