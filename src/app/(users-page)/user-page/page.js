// app/user/page.js
"use client";
import React, { useEffect } from "react";
import axios from "axios";
import Hero from "@/components/pages/user_page/hero";
import Repositories from "@/components/pages/user_page/repositories";
import { useAuth } from "@/context/auth_context";

const UserPage = () => {
  //const { name, token, isGoogle, loading } = useAuth();

  // if (!loading) {
  //   if (name == null || token == null) {
  //     window.location.href = "/home";
  //   }
  // }
  //console.log(name, token)

  return (
    <div className="min-h-screen">
      <section className="pt-24 flex" id="home">
        <Hero />
      </section>
      <section className="pt-14 min-h-screen flex" id="home">
        <Repositories />
      </section>
    </div>
  );
};

export default UserPage;
