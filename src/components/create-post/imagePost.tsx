import { useRef, useState } from "react";
import { IoMdClose, IoMdCloudUpload, IoMdAdd } from "react-icons/io";
import Spinner from "@/src/components/spinner/spinner";
import { twMerge } from "tailwind-merge";

const ImagePost = () => {
    const inputFile = useRef(null);
    const [images, setImages] = useState([]);
    const [displayImages, setDisplayImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (event: any) => {
        const files = Array.from(event.target.files);
        setImages((prevImages) => [...prevImages, ...files]);

        const displayFiles = files.map(file => URL.createObjectURL(file));
        setDisplayImages((prevDisplayImages: string[]) => [...prevDisplayImages, ...displayFiles]);
    };

    const handleRemoveImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        setDisplayImages((prevDisplayImages: string[]) => prevDisplayImages.filter((_, i) => i !== index));
    };

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

            <div className="w-full rounded-xl border-solid h-48 max-h-96 border-2 flex justify-center items-center p-4 overflow-hidden">
                {displayImages.length === 0 && (
                    <div className="flex justify-center items-center">
                        <p className="mr-4">Upload images and videos here. </p>
                        <button className="rounded-full bg-backgroundSecondary p-1 hover:bg-gray-500 hover:text-white"
                            onClick={() => {
                                inputFile.current.click();
                            }}
                        >
                            <IoMdCloudUpload className="size-6" />
                        </button>
                    </div>)
                }

                <div>
                    {displayImages.length > 0 && (
                        <div className="flex flex-wrap mt-4 items-center">
                            <div className="mr-4">
                                <button className="rounded-full bg-backgroundSecondary p-1 hover:bg-gray-500 hover:text-white"
                                    onClick={() => {
                                        inputFile.current.click();
                                    }}
                                >
                                    <IoMdAdd className="size-6" />
                                </button>
                            </div>
                            {displayImages.map((displayImage, index) => (
                                <div key={index} className="relative m-2 w-32 h-32">
                                    <img
                                        src={displayImage}
                                        className={twMerge(
                                            "w-full h-full object-cover object-center",
                                            loading ? "loading-class" : ""
                                        )}
                                    />
                                    <button
                                        className="absolute top-1 right-1 rounded-full bg-backgroundSecondary p-1"
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        <IoMdClose />
                                    </button>
                                    {loading && (
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
};

export default ImagePost;
