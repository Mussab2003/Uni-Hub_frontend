"use client";

import Hero from "@/components/pages/landing_page/hero";
import Features from "@/components/pages/landing_page/features";
import PopularRepoList from "@/components/pages/landing_page/popular_repo";

export default function LandingPage() {
  return (
    <div className="min-h-screen ">
      <section
        className="py-24 min-h-screen flex justify-center items-center "
        id="home"
      >
        <Hero />
      </section>
      <section id="popularRepositories" className=" mb-20 pt-28">
        <div className="container flex flex-col gap-4 items-center">
          <div className="w-3/4">
            <h1 className="md:text-4xl text-3xl font-semibold dark:text-[#C8ACD6]">
              Popular Repositories
            </h1>
          </div>
          <div className="w-3/4">
            <hr className="border-2 border-grey" />
          </div>
          <div className="w-3/4">
            <PopularRepoList />
          </div>
        </div>
      </section>
      <section className="pt-28 pb-36" id="features">
        <div className="container flex flex-col gap-4 items-center">
          <Features />
        </div>
      </section>
      <section className="my-11" id="contactUs">
        <div className="container flex flex-col gap-3 items-center">
          <div className="mt-20 w-3/4">
            <h1 className="md:text-4xl text-3xl font-semibold dark:text-[#C8ACD6]">
              Contact Us
            </h1>
          </div>
          <div className="w-3/4">
            <hr className="border-2 border-grey" />
          </div>
          <div className="w-3/4">
            <p className="dark:text-[#C8ACD6]">
              For any queries, feedback or reporting a bug please contact us at:
            </p>
          </div>
          <div className="w-3/4 flex flex-col gap-2">
            <a
              className="text-blue-500 dark:text-white hover:text-black dark:hover:text-white underline "
              href="mailto:k224146@nu.edu.pk"
            >
              k224146@nu.edu.pk
            </a>
            <a
              className="text-blue-500 dark:text-white hover:text-black dark:hover:text-white underline"
              href="mailto:k224142@nu.edu.pk"
            >
              k224142@nu.edu.pk
            </a>
            <a
              className="text-blue-500 dark:text-white hover:text-black dark:hover:text-white underline"
              href="mailto:k224131@nu.edu.pk"
            >
              k224131@nu.edu.pk
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
