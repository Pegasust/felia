import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import Link from "next/link";
import {
  FaGithub,
  FaLinkedin
} from 'react-icons/fa';
import { ReactNode } from "react";

const circle = cva("absolute rounded-full border -z-10", {
  variants: {
    size: {
      0: "h-[200px] w-[200px]",
      1: "h-[300px] w-[300px]",
      2: "h-[400px] w-[400px]",
      3: "h-[500px] w-[500px]",
      4: "h-[600px] w-[600px]",
    },
    animate: {
      none: "",
      pulse: "animate-pulse",
      ping: "animate-ping",
    },
    color: {
      back: "border-pink-50",
      fore: "border-amber-300",
    }
  },
  defaultVariants: {
    size: 0,
    animate: "none",
    color: "back"
  }
});

const Circle: React.FC<VariantProps<typeof circle>> =
  ({ size, animate, color }) => <div className={circle({
    size, animate, color
  })} />

const Shapes = () => <div className="absolute flex items-center justify-center">
  <Circle size={0} animate="ping" />
  <Circle size={1} />
  <Circle size={2} />
  <Circle size={3} animate="pulse" color="fore" />
  <Circle size={4} />
</div>

const Article: React.FC<{ children?: ReactNode }> = ({ children }) => <article
  className="relative w-screen flex flex-col justify-center items-center overflow-hidden text-center min-h-screen gap-2">
  {children}
</article>

const Brief = () => <Article>
  {/*Avatar*/}
  <div className="flex justify-center items-center">
    <Shapes />
    <div className="rounded-full w-[200px] h-[200px] overflow-hidden flex justify-center">
      <div className="flex justify-center items-center">
        <Image
          src="/assets/avatarRL.jpeg"
          width={512}
          height={512}
          alt="Hung's avatar" />
      </div>
    </div>
  </div>
  <h1 className="text-gray-700 text-3xl semi-bold z-10">
    Hung Tran
  </h1>
  <h1 className="text-gray-400 text-xl tracking-widest z-10 uppercase">
    Software Engineer
  </h1>
</Article>

const SectionHeader: React.FC<{ text?: string, children?: ReactNode }> = ({ text, children }) => <h1
  className="text-xl text-gray-600 tracking-widest">
  {text}
  {children}
</h1>

const ImageDisplay = () => <div>

</div>
const About = () => <Article>
  <SectionHeader>About</SectionHeader>
</Article>

const Experience = () => <Article>
  <SectionHeader>Experience</SectionHeader>
  Some stub content while this is not propagated yet
</Article>

const Blog = () => <Article>
  <SectionHeader>Blogs</SectionHeader>
  lol
</Article>

const Projects = () => <Article >
  <SectionHeader>Projects</SectionHeader>
  <span>
    I was about to type Lorem Ipsum until I realize I could not even remember the content
    of the first sentence.
  </span>
  <span>
    I was about to type Lorem Ipsum until I realize I could not even remember the content
    of the first sentence.
  </span>
  <span>
    I was about to type Lorem Ipsum until I realize I could not even remember the content
    of the first sentence.
  </span>
  <span>
    I was about to type Lorem Ipsum until I realize I could not even remember the content
    of the first sentence.
  </span>
  <span>
    I was about to type Lorem Ipsum until I realize I could not even remember the content
    of the first sentence.
  </span>
  <span>
    I was about to type Lorem Ipsum until I realize I could not even remember the content
    of the first sentence.
  </span>
  <span>
    I was about to type Lorem Ipsum until I realize I could not even remember the content
    of the first sentence.
  </span>
</Article>


const NavbarItem: React.FC<{
  text: string;
  link: string;
  children: React.ReactNode
}> = ({ text, link, children }) => <Link className="group" href={link}>
  <button className="flex flex-col items-center justify-center flex-flex-col p-2 group-hover:cursor-pointer group">
    {children}
    {/*<span className="group-hover:visible invisible">{text}</span>*/}
  </button>
</Link>


const iconCva = cva("transition-colors", {
  variants: {
    theme: {
      light: "group-hover:fill-gray-700 fill-gray-400"
    }
  },
  defaultVariants: {
    theme: "light"
  }
});

const Navbar = () => <div className="flex justify-center items-center w-full z-50 sticky top-0 left-0 backdrop-blur-md h-8">
  <div className="w-11/12 max-w-screen-lg flex items-center gap-4">
    <div className="flex flex-row justify-center items-center gap-1">
      <NavbarItem text="GitHub" link="https://github.com/pegasust"><FaGithub className={iconCva()} /></NavbarItem>
      <NavbarItem text="LinkedIn" link="https://linkedin.com/in/hung-tran-1963bb205/"><FaLinkedin className={iconCva()} /></NavbarItem>
    </div>
    <Link href="#brief">
      <span className="transition-colors hover:text-amber-400 text-amber-400/50 animate-pulse">Hung Tran</span>
    </Link>
  </div>
</div>


const Home: NextPage = () => {
  return (
    <main className="overflow-x-hidden z-0 flex flex-col overflow-y-scroll h-screen
        items-center bg-pink-50/20 min-h-screen antialiased snap-y snap-proximity">
      <Head>
        <title>Hung Tran</title>
        <meta name="description" content="Personal website about Hung Tran and my homelab Felia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <section id="brief" className="snap-start">
        <Brief />
      </section>
      <section id="about" className="snap-start">
        <About />
      </section>
      <section id="experience" className="snap-start">
        <Experience />
      </section>
      <section id="blog" className="snap-start">
        <Blog />
      </section>
      <section id="projects" className="snap-start">
        <Projects />
      </section>
    </main>
  );
};

export default Home;

