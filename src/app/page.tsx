import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { getAllPosts } from "@/lib/blog";
import About from "@/components/sections/About";
import BooksIntro from "@/components/sections/BooksIntro";
import BooksSection from "@/components/sections/BooksSection";
import DesignBranding from "@/components/sections/DesignBranding";
import Testimonials from "@/components/sections/Testimonials";
import Services from "@/components/sections/Services";
import BlogPreview from "@/components/sections/BlogPreview";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://akillustrator.com",
  },
};

export default async function HomePage() {
  const locale = await getLocale();
  const posts = getAllPosts(locale);

  return (
    <>
      <About />
      <BooksIntro />
      <BooksSection />
      <DesignBranding />
      <Testimonials />
      <BlogPreview posts={posts} />
      <Services />
    </>
  );
}
