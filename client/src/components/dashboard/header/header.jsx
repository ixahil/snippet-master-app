"use client";
import { useLogoutUserMutation } from "@/services/redux/api/user-api";
import { Loader } from "lucide-react";
import Image from "next/image";
import MobileSidebar from "../mobile-sidebar/mobile-sidebar";
import ThemeChanger from "../theme/theme-changer";
import { useSelector } from "react-redux";
import { userSelector } from "@/services/redux/features/user-slice";

const DashboardHeader = () => {
  // const { user, logoutUser } = useAuthContext();
  const { user } = useSelector(userSelector);

  const [logout] = useLogoutUserMutation();

  const loading = <Loader className="animate-spin" />;

  const handleLogout = async () => {
    await logout();
    return loading;
  };

  return (
    <div className="bg-slate-200 dark:bg-dark-bg p-5 rounded-md flex items-center justify-between flex-wrap gap-4">
      {!user ? (
        loading
      ) : (
        <div className="flex items-center gap-8 flex-wrap">
          <div className="flex gap-4">
            <Image
              src={process.env.NEXT_PUBLIC_API_PUBLIC_PATH + user.profile}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="hidden sm:block">
              <h2 className="font-bold ">{user.username}</h2>
              <h4 className="text-sm text-slate-500">{user.email}</h4>
            </div>
          </div>
          <button
            className="p-2 bg-white dark:bg-gray-200 dark:text-dark-text rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
      <ThemeChanger />
      <MobileSidebar />
    </div>
  );
};

export default DashboardHeader;
