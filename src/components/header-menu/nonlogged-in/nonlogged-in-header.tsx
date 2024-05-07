import { Button } from "../../button/button";
import { useModalStore } from "@/src/store/modalStore";
import ThemeSwitcher from "../../theme-provider/theme-switcher";

export default function LoggedInHeader() {
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
      <ThemeSwitcher />
    </div>
  );
}