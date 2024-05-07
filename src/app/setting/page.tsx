import ThemeSwitcher from "@/src/components/theme-provider/theme-switcher";
import SettingLayout from "./layout";
import Header from "@/src/components/dashboard/header/header";

export default function SettingPage() {
  return (
    <SettingLayout>
      <ThemeSwitcher></ThemeSwitcher>
      <Header></Header>
    </SettingLayout>
  );
}
