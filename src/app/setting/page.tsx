import ThemeSwitcher from "@/src/components/theme-provider/theme-switcher";
import SettingLayout from "./layout";

export default function SettingPage() {
  return (
    <SettingLayout>
      <ThemeSwitcher></ThemeSwitcher>
      <div>setting page</div>
    </SettingLayout>
  );
}
