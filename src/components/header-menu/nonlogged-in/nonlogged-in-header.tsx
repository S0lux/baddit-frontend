import { Button } from "../../button/button";
import { useModalStore } from "@/src/store/modalStore";
import ThemeSwitcher from "../../theme-provider/theme-switcher";
import ModalManager from "../../auth-modal-manager/modal-manager";

export default function NonLoggedInHeader() {
  const loginHandle = () => {
    useModalStore.setState({ modalOpen: true, modalType: "login" });
  };

  const registerHandle = () => {
    useModalStore.setState({ modalOpen: true, modalType: "register" });
  };
  return (
    <div className="ml-1 flex items-center justify-center gap-2">
      <Button variant={"primary"} size={"small"} onClick={loginHandle}>
        Log In
      </Button>
      <Button
        className="hidden sm:block"
        variant={"secondary"}
        size={"small"}
        onClick={registerHandle}
      >
        Sign Up
      </Button>
      <ThemeSwitcher className="aspect-square h-[30px] w-[30px]" />
      <ModalManager></ModalManager>
    </div>
  );
}
