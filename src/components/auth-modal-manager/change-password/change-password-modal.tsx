import { useModalStore } from "@/src/store/modalStore";
import { Button } from "../../button/button";
import { IoMdClose } from "react-icons/io";
import { useAuthStore } from "@/src/store/authStore";
import { Input } from "../../input/input";

//form submotting imports
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../../../schema/changePasswordSchema";
import axios, { AxiosError } from "axios";
import { FaCommentsDollar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import AlertBar from "../../alert/alert-bar";

const ChangePassWordModal = () => {
  const setShowModal = useModalStore((state) => state.setShowModal);

  //patch request handling
  const [errorMessage, seterrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //Handle alert bar visibility
  const [alertBarVisible, setAlertBarVisible] = useState<boolean>(false);
  useEffect(() => {}, [alertBarVisible]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof changePasswordSchema>> = async (
    data,
  ) => {
    setLoading(true);
    try {
      let res = await axios.patch(
        "https://api.baddit.life/v1/auth/update-password",
        data,
        {
          withCredentials: true,
        },
      );
      console.log(res);
    } catch (err: any) {
      seterrorMessage(err.response?.data.message || "An error occurred");
    }
    setLoading(false);
    setAlertBarVisible(true);
    setTimeout(() => {
      setAlertBarVisible(false);
    }, 2000);
  };

  return (
    <div className="flex h-screen w-screen flex-1 flex-col justify-center space-y-6 bg-background px-10 py-8 sm:h-fit sm:max-w-[470px] sm:rounded-2xl">
      {/* {title} */}
      <div className="flex w-full flex-row items-center justify-between ">
        <div className="text-2xl font-bold text-textPrimary">
          Changing password
        </div>
        <Button
          onClick={() => {
            setShowModal(false);
          }}
          variant={"destructive"}
          className="aspect-square w-[32px] p-0"
        >
          <IoMdClose></IoMdClose>
        </Button>
      </div>

      {/* {submit form} */}
      <form
        className="flex flex-col justify-center space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-1 text-xs text-textSecondary">
          <div className="pl-2">Enter your old password here</div>
          <Input
            placeholder="Old password"
            errorMessage={errors.oldPassword?.message}
            {...register("oldPassword", { required: "This is required" })}
          ></Input>
        </div>

        <div className="flex flex-col space-y-1 text-xs text-textSecondary">
          <div className="pl-2">Enter your new password here</div>
          <Input
            placeholder="New password"
            errorMessage={errors.newPassword?.message}
            {...register("newPassword", { required: "This is required" })}
          ></Input>
        </div>

        {/* {submit button} */}
        <Button
          type="submit"
          variant={"primary"}
          size={"small"}
          className="h-10 rounded-lg"
          loading={loading}
        >
          Save changes
        </Button>
      </form>

      {/* {request results} */}
      <AnimatePresence>
        {alertBarVisible && (
          <AlertBar
            message={errorMessage || "Changes saved"}
            status={errorMessage ? "error" : "success"}
            className="sticky bottom-0 mt-4 flex items-center justify-center rounded py-2"
            Mkey="alert-bar"
          ></AlertBar>
        )}
      </AnimatePresence>
    </div>
  );
};
export default ChangePassWordModal;
