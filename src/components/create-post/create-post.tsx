"use client";
import { Button } from "@/src/components/button/button";
import React, { useState, useEffect, useRef, use } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";
import { FaAngleDown } from "react-icons/fa";
import { IoMdAdd, IoMdClose, IoMdCloudUpload } from "react-icons/io";
import Spinner from "@/src/components/spinner/spinner";
import { twMerge } from "tailwind-merge";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./global.css";
import { createPostSchema } from "@/src/schema/createPostSchema";
import { set, z } from "zod";
import usePost from "@/src/hooks/usePost";
import { toast } from "react-toastify";
import useGet from "@/src/hooks/useGet";
import axios from "axios";

export default function Create_Post() {
  const [title, setTitle] = useState("");
  const [postType, setPostType] = useState("text");
  const [community, setCommunity] = useState("");
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { GetData } = useGet("/posts");

  // Community Picker
  const { name } = useParams();
  const { userName } = useParams();
  const [selectedPick, setSelectedPick] = useState("");
  const { userData } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [communities, setCommunities] = useState<any[]>([]);

  // Text
  const [editorHtml, setEditorHtml] = useState<string>("");

  // Media
  const inputFile = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<any[]>([]);
  const [displayImages, setDisplayImages] = useState<string[]>([]);
  const [loadingImage, setLoadingImage] = useState(false);

  // Link
  const [link, setLink] = useState("");

  const { status, loading, PostSent } = usePost("/posts");

  const [message, setMessage] = useState<string>();

  const handleChangeText = (html: string) => {
    setEditorHtml(html);
  };

  const handleImageChange = (event: any) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);

    const displayFiles = files.map((file) => URL.createObjectURL(file as Blob));
    setDisplayImages((prevDisplayImages: string[]) => [
      ...prevDisplayImages,
      ...displayFiles,
    ]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setDisplayImages((prevDisplayImages: string[]) =>
      prevDisplayImages.filter((_, i) => i !== index),
    );
  };

  useEffect(() => {
    setCommunities(userData?.communities);
  }, [userData]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleChange = (pick: string) => {
    const selectedName = pick;
    setSelectedPick(selectedName);
    if (userData?.username === selectedName) {
      router.push(
        `/user/${selectedName}/submit?type=${searchParams.get("type")}`,
      );
    } else {
      router.push(`/r/${selectedName}/submit?type=${searchParams.get("type")}`);
    }
    closeDropdown();
  };

  useEffect(() => {
    if (name) {
      setSelectedPick(decodeURIComponent(name.toString()));
      setCommunity(decodeURIComponent(name.toString()));
    } else if (userName) {
      setSelectedPick(decodeURIComponent(userName.toString()));
      setCommunity("");
    }
  }, [searchParams, name, userName]);

  const createQueryString = useCallback(
    (pathName: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(pathName, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    const type = searchParams.get("type");
    if (!type) {
      router.replace(pathName + "?" + createQueryString("type", "TEXT"));
      setPostType("text");
    } else {
      setPostType(type.toLowerCase());
    }
  }, [searchParams, pathName, createQueryString, router]);

  const styleClass = (type: string) => {
    return `hover:text-white px-3 py-2 hover:bg-gray-500 rounded-2xl mr-2 ${postType === type ? "underline " : ""}`;
  };

  const [newPost, setNewPost] = useState<String>("");
  const [loadingNewPost, setLoadingNewPost] = useState<Boolean>(false);

  const fetchNewPost = async () => {
    setLoadingNewPost(true);
    const response = await axios.get(`https://api.baddit.life/v1/posts?`);
    setNewPost(response.data[0].id);
    setLoadingNewPost(false);
  };

  useEffect(() => {
    if (newPost) {
      routingPost();
    }
  }, [newPost]);

  const routingPost = () => {
    if (community === "") {
      router.push(`/user/${userData?.username}/post/${newPost}`);
    } else {
      if (loading === false) {
        const url = `/r/${community}/${newPost}`;
        router.push(url);
      }
    }
  };

  useEffect(() => {
    if (status === "success" && message) {
      toast.success(message);
      fetchNewPost();
    }
    if (status === "error" && message) {
      toast.error(message);
    }
  }, [message]);

  const handleCreateBtn = async () => {
    if (postType === "text") {
      let payload: z.infer<typeof createPostSchema>;
      if (community === "") {
        payload = {
          title: title,
          content: editorHtml,
          type: "TEXT",
        };
      } else {
        payload = {
          title: title,
          content: editorHtml,
          type: "TEXT",
          communityName: community,
        };
      }
      const res = await PostSent(payload);
      switch (res) {
        case 201:
          setMessage("Successfully created post!");
          break;
        case 400:
          setMessage("Unexpected body or missing media if type is MEDIA");
          break;
        case 401:
          setMessage("Unauthorized");
        case 404:
          setMessage("Community not found");
        case 500:
          setMessage("Internal server error");
          break;
        default:
          setMessage(undefined);
      }
    } else if (postType === "media") {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("files", image);
      });
      formData.append("title", title);
      formData.append("type", "MEDIA");
      if (community !== "") {
        formData.append("communityName", community);
      }

      const res = await PostSent(formData);
      switch (res) {
        case 201:
          setMessage("Successfully created post!");
          break;
        case 400:
          setMessage("Unexpected body or missing media if type is MEDIA");
          break;
        case 401:
          setMessage("Unauthorized");
        case 404:
          setMessage("Community not found");
        case 500:
          setMessage("Internal server error");
          break;
        default:
          setMessage(undefined);
      }
    } else {
      let payload: z.infer<typeof createPostSchema>;
      if (community === "") {
        payload = {
          title: title,
          content: link,
          type: "LINK",
        };
      } else {
        payload = {
          title: title,
          content: link,
          type: "LINK",
          communityName: community,
        };
      }
      const res = await PostSent(payload);
      switch (res) {
        case 201:
          setMessage("Successfully created post!");
          break;
        case 400:
          setMessage("Unexpected body or missing media if type is MEDIA");
          break;
        case 401:
          setMessage("Unauthorized");
        case 404:
          setMessage("Community not found");
        case 500:
          setMessage("Internal server error");
          break;
        default:
          setMessage(undefined);
      }
    }
  };

  const renderForm = () => {
    switch (postType) {
      case "text":
        return (
          <div className="mb-4 w-full">
            <ReactQuill
              theme="snow"
              value={editorHtml}
              onChange={handleChangeText}
              modules={Create_Post.modules}
              formats={Create_Post.formats}
              placeholder="Write something..."
              className="dark:border-secondary-40 my-4 rounded-md border-gray-500 text-gray-800 dark:text-white lg:text-base"
            />
          </div>
        );
      case "media":
        return (
          <div className="mt-4">
            <input
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={handleImageChange}
              multiple
            />

            <div className="flex h-48 max-h-96 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-solid p-4">
              {displayImages.length === 0 && (
                <div className="flex items-center justify-center">
                  <p className="mr-4">Upload images and videos here. </p>
                  <button
                    className="rounded-full bg-backgroundSecondary p-1 hover:bg-gray-500 hover:text-white"
                    onClick={() => {
                      inputFile.current?.click();
                    }}
                  >
                    <IoMdCloudUpload className="size-6" />
                  </button>
                </div>
              )}

              <div>
                {displayImages.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center">
                    <div className="mr-4">
                      <button
                        className="rounded-full bg-backgroundSecondary p-1 hover:bg-gray-500 hover:text-white"
                        onClick={() => {
                          inputFile.current?.click();
                        }}
                      >
                        <IoMdAdd className="size-6" />
                      </button>
                    </div>
                    {displayImages.map((displayImage, index) => (
                      <div key={index} className="relative m-2 h-32 w-32">
                        <img
                          src={displayImage}
                          className={twMerge(
                            "h-full w-full object-cover object-center",
                            loadingImage ? "loading-class" : "",
                          )}
                        />
                        <button
                          className="absolute right-1 top-1 rounded-full bg-backgroundSecondary p-1"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <IoMdClose />
                        </button>
                        {loadingImage && (
                          <Spinner className="absolute bottom-5 left-5 size-1/2"></Spinner>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case "link":
        return (
          <form className="mb-4 mt-4 w-full">
            <input
              type="url"
              placeholder="Enter your link here"
              className="h-full w-full rounded-md border border-gray-300 p-4"
              value={link}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleLinkChange(event)
              }
            />
          </form>
        );
      default:
        return (
          <div className="mb-4 w-full">
            <ReactQuill
              theme="snow"
              value={editorHtml}
              onChange={handleChangeText}
              modules={Create_Post.modules}
              formats={Create_Post.formats}
              placeholder="Write something..."
              className="dark:border-secondary-40 my-4 rounded-md border-gray-500 text-gray-800 dark:text-white lg:text-base"
            />
          </div>
        );
    }
  };

  const handlePostTypeChange = (type: string) => {
    router.push(pathName + "?" + createQueryString("type", type.toUpperCase()));
    setPostType(type);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  return (
    <div className="mt-4 w-fit min-w-full items-center">
      <div>
        <h1 className="mb-4 text-2xl font-bold">Create Post</h1>
      </div>
      <div>
        <div>
          <div className="relative inline-block">
            <button
              className="inline-flex w-fit items-center rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-200"
              onClick={toggleDropdown}
            >
              <div className="mt-2 flex items-center justify-center space-x-2">
                <div className="flex items-center">
                  {selectedPick === userData?.username ? (
                    <img
                      src={userData?.avatarUrl}
                      className="size-8 rounded-full object-cover"
                    />
                  ) : (
                    <img
                      src={
                        communities?.find(
                          (item: any) => item.name === selectedPick,
                        )?.logoUrl
                      }
                      className="size-8 rounded-full object-cover"
                    />
                  )}
                </div>

                <div className="flex flex-col">
                  <div className="text-l mr-5 flex items-center">
                    <span className="flex items-center justify-center">
                      {selectedPick === userData?.username
                        ? `u/ ${userData?.username}`
                        : `r/ ${selectedPick}`}{" "}
                      <FaAngleDown className="pl-2" size={20} />
                    </span>
                  </div>
                </div>
              </div>
            </button>

            {isOpen && (
              <div className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <p className="px-4 py-2 font-semibold text-gray-700">Select</p>
                <ul
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <p className="pl-2">Your profile</p>
                  <li>
                    <button
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        handleChange(userData?.username);
                      }}
                    >
                      <div className="mt-2 flex items-start justify-start space-x-2">
                        <div className="flex items-center">
                          <img
                            src={userData?.avatarUrl}
                            className="size-8 rounded-full object-cover"
                          />
                        </div>

                        <div className="flex flex-col">
                          <div className="text-l mr-5">
                            u/ {userData?.username}
                          </div>
                        </div>
                      </div>
                    </button>
                  </li>
                  <p className="pl-2">Your Community</p>
                  {communities?.map((item: any) => (
                    <li key={item.id}>
                      <button
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          handleChange(item.name);
                        }}
                      >
                        <div className="mt-2 flex items-start justify-start space-x-2">
                          <div className="flex items-center">
                            <img
                              src={item.logoUrl}
                              className="size-8 rounded-full object-cover"
                            />
                          </div>

                          <div className="flex flex-col">
                            <div className="text-l mr-5">r/ {item.name}</div>
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <textarea
          placeholder="Title"
          className="h-full w-full rounded-md border border-gray-300 p-4"
          value={title}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleTitleChange(event)
          }
          maxLength={300}
          rows={1}
        />
        <div className="flex items-end justify-end">
          <p className="text-right">{title.length}/300</p>
        </div>
      </div>

      <div className="mt-4 flex space-x-4">
        <button
          className={styleClass("text")}
          onClick={() => handlePostTypeChange("text")}
        >
          Text
        </button>
        <button
          className={styleClass("media")}
          onClick={() => handlePostTypeChange("media")}
        >
          Image & Video
        </button>
        <button
          className={styleClass("link")}
          onClick={() => handlePostTypeChange("link")}
        >
          Link
        </button>
      </div>

      <div className="min-w-full">{renderForm()}</div>

      <div className="mt-4 flex items-end justify-end">
        <Button
          size={"small"}
          className="h-[56px] flex-1 rounded-[10px] py-[24px]"
          type="submit"
          loading={loading}
          disabled={
            loading ||
            title.length === 0 ||
            (postType === "text" && editorHtml.length === 0) ||
            (postType === "media" && images.length === 0) ||
            (postType === "link" && link.length === 0)
          }
          onClick={handleCreateBtn}
        >
          Post
        </Button>
      </div>
    </div>
  );
}

Create_Post.modules = {
  toolbar: [
    [{ header: "1" }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
    ["link", "image", "video"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

Create_Post.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "align",
  "link",
  "image",
  "video",
];
