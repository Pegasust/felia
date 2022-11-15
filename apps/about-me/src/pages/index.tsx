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
      fore: "border-rose-300",
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

const Brief = () => <article className="relative w-screen flex flex-col justify-center items-center overflow-hidden text-center min-h-screen gap-2">
  {/*Avatar*/}
  <div className="flex justify-center items-center">
    <Shapes />
    <div className="rounded-full w-[200px] h-[200px] overflow-hidden flex justify-center">
      <div className="flex justify-center items-center">
        <Image
          src="/assets/myself.jpg"
          width={512}
          height={512}
          alt="Hung's avatar" />
      </div>
    </div>
  </div>
  <h1 className="text-3xl semi-bold z-10">
    Hung Tran
  </h1>
  <h1 className="text-3xl tracking-wider z-10">
    Software Engineer
  </h1>
</article>

const About = () => <article className="flex gap-4">
  This is my about section
</article>

const Experience = () => <article>
  Some stub content while this is not propagated yet
</article>

const Blog = () => <article>
  lol
</article>

const Projects = () => <article className="flex flex-col">
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
</article>


const NavbarItem: React.FC<{
  text: string;
  link: string;
  children: React.ReactNode
}> = ({ text, link, children }) => <Link className="group" href={link}>
  <button className="flex flex-col items-center justify-center flex-flex-col p-2 group-hover:cursor-pointer">
    {children}
    {/*<span className="group-hover:visible invisible">{text}</span>*/}
  </button>
</Link>

const Navbar = () => <div className="flex justify-center items-center w-full z-50 sticky top-0 left-0 backdrop-blur-md h-8">
  <div className="w-11/12 max-w-screen-lg flex items-center gap-4">
    <div className="flex flex-row justify-center items-center gap-1">
      <NavbarItem text="GitHub" link="https://github.com/pegasust"><FaGithub /></NavbarItem>
      <NavbarItem text="LinkedIn" link="https://linkedin.com/in/hung-tran-1963bb205/"><FaLinkedin /></NavbarItem>
    </div>
    <span className="text-gray-400 animate-pulse">Hung Tran</span>
  </div>
</div>


const Home: NextPage = () => {
  return (
    <main className="z-0 flex flex-col justify-center items-center bg-pink-50/0 min-h-screen antialiased">
      <Head>
        <title>Hung Tran</title>
        <meta name="description" content="Personal website about Hung Tran and my homelab Felia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Brief />
      <About />
      <Experience />
      <Blog />
      <Projects />
    </main>
  );
};

export default Home;

