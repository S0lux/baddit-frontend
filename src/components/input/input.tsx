export default function Input({ placeholder = "" }) {
  return (
    <input
      placeholder={placeholder}
      type="text"
      className="w-full text-[16px] px-6 py-3 h-[56px] outline-none rounded-2xl bg-[#eaedef] text-black"
    ></input>
  );
}
