import DashboardHeader from "@/components/dashboard/header/header";
import SearchBar from "@/components/dashboard/search/search-bar";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import TagsSlider from "@/components/dashboard/tags/tags-slider";
import AuthProvider from "@/services/authentication/auth-provider";
import React from "react";

const DashboardLayout = (props) => {
  return (
    <AuthProvider>
      <div className="grid grid-cols-5 md:grid-cols-6 2xl:grid-cols-12">
        <Sidebar />
        <div className="bg-slate-100 dark:bg-dark-bg p-4 col-span-full h-screen md:col-span-4 2xl:col-span-10">
          <DashboardHeader />
          <div className="">
            <section className="py-8 h-full space-y-8">
              <SearchBar />
              <TagsSlider />

              <main className="h-full">{props.children}</main>
              {props.modal}
              <div id="modal-root" />
            </section>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default DashboardLayout;
