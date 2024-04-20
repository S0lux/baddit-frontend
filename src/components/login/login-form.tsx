import { Button } from "../button/button";
import { IoMdClose } from "react-icons/io";
import Input from "../input/input";

export default function LoginForm() {
  return (
    <div className=" flex flex-1 flex-col justify-center max-w-[470px] bg-white/10 rounded-2xl">
      <div className="flex justify-end items-center w-full px-[24px] pt-[24px] pb-[8px]">
        <Button variant={"monochrome"} className="aspect-square w-[32px] p-0">
          <IoMdClose></IoMdClose>
        </Button>
      </div>

      <div className="overflow-auto flex flex-col gap-[30px] px-[80px]">
        <h1 className="font-extrabold text-[24px]">Log In</h1>

        <div className="flex flex-col gap-[12px]">
          <Input placeholder="Username"></Input>
          <Input placeholder="Password"></Input>
        </div>
      </div>

      <div className="flex justify-center items-center px-[80px] py-[24px]">
        <Button size={"small"} className="w-full py-[12px] rounded-[10px]">
          Log In
        </Button>
      </div>
    </div>
  );
}
