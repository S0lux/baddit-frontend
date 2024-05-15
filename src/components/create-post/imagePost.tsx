// components/ImagePost.js
const ImagePost = () => {
    return (
        <form className="w-full mb-4 mt-4">
            <input
                type="file"
                accept="image/*"
                className="w-full p-2 border h-48 rounded-md flex justify-center"
            />
        </form>
    );
};

export default ImagePost;
