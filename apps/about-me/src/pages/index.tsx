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
import { useReducerMonad } from "@utils/stdx"

import SFChinatown from "@public/assets/sf-chinatown.jpg";
import SFChurch from "@public/assets/sf.jpg";
import Lizzie from "@public/assets/lizzie.jpg";
import SantaMonicaStairs from "@public/assets/santa-monica-stairs.jpg";
import SantaMonicaHigh from "@public/assets/santa-monica-high.jpg";
import assert from "assert";

const circle = cva("absolute rounded-full border -z-10", {
  variants: {
    size: {
      0: "h-[200px] w-[200px]",
      1: "h-[350px] w-[350px]",
      2: "h-[500px] w-[500px]",
      3: "h-[650px] w-[650px]",
      4: "h-[800px] w-[800px]",
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


const InpageSection: React.FC<{href: string, children?: ReactNode}>= ({
  href,
  children
}) => <Link href={href} className="p-2 text-lg text-gray-500/50 rounded-3xl 
    border border-amber-400/50 hover:text-gray-500 hover:border-amber-400 transition-colors
    hover:animate-pulse">
  {children}
</Link>

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
  <h1 className="text-gray-700 text-4xl semi-bold z-10">
    Hung Tran
  </h1>
  <h1 className="text-gray-400 text-2xl tracking-widest z-10 uppercase">
    Software Engineer
  </h1>
  <div className="flex flex-row gap-4">
    <InpageSection href="#about">About</InpageSection>
    <InpageSection href="#experience">Experience</InpageSection>
    <InpageSection href="#blog">Blog</InpageSection>
    <InpageSection href="#projects">Projects</InpageSection>
  </div>
</Article>

const SectionHeader: React.FC<{ text?: string, children?: ReactNode }> = ({ text, children }) => <div>
  <h1 className="text-xl text-gray-600 tracking-widest">
    {text}
    {children}
  </h1>
  <div className="mt-8" />
</div>

const images = [
  {
    src: SFChinatown,
    alt: "chinatown @ San Francisco"
  },
  {
    src: SFChurch,
    alt: "church @ San Francisco"
  },
  {
    src: Lizzie,
    alt: "My cat Lizzie",
  },
  {
    src: SantaMonicaHigh,
    alt: "Santa Monica in high ground"
  },
  {
    src: SantaMonicaStairs,
    alt: "Santa Monica taken near stairs"
  }
];

type Image = typeof images[0];

function useImageDisplay(images: Image[]) {
  const [imageRepo, setImageRepo] = React.useState(images);
  const init = images.length == 0 ? undefined : 0;
  const [imgIndex, imgDispatch] = useReducerMonad((idx, action: {
    type: "next" | "prev"
  } | {
    type: "set",
    index: number
  }) => {
    if (images.length == 0) { return undefined; }
    let retval = idx;
    assert(retval != undefined);
    switch (action.type) {
      case "next":
        retval += 1;
        break;
      case "prev":
        retval -= 1;
        break;
      case "set":
        return action.index;
    }
    retval = (images.length + retval) % images.length;
    return retval;
  }, init);
  const image = imgIndex !== undefined ? imageRepo[imgIndex] : undefined;
  return {
    next: () => imgDispatch({ type: "next" }),
    prev: () => imgDispatch({ type: "prev" }),
    setIdx: (idx: number) => imgDispatch({ type: "set", index: idx }),
    imageRepo,
    setImageRepo,
    imgIndex,
    image,
  }
}
type ImageDisplayHook = ReturnType<typeof useImageDisplay>;

const imageButton = cva("w-8 h-8 rounded-full flex justify-center items-center transition-colors font-semibold", {
  variants: {
    theme: {
      light: "bg-amber-200/30 group-hover:bg-amber-200/60 text-gray-700"
    }
  },
  defaultVariants: {
    theme: "light"
  }
});

const imageIndex = cva("rounded-full hover:cursor-pointer transition-all", {
  variants: {
    theme: {
      light: "",
    },
    active: {
      isActive: "w-3 h-3",
      isInactive: "w-2 h-2",
    }
  },
  compoundVariants: [
    {
      theme: "light",
      active: "isActive",
      className: "bg-pink-200/70"
    },
    {
      theme: "light",
      active: "isInactive",
      className: "bg-pink-200/40"
    }
  ],
  defaultVariants: {
    theme: "light",
  }
})
const ImageDisplay: React.FC<{ imageDisplayHook: ImageDisplayHook }> = ({ imageDisplayHook: {
  next,
  prev,
  imageRepo,
  // setImageRepo,
  imgIndex,
  image
} }) => <div className="relative bg-gray-100/30 rounded-md overflow-hidden">
    <button className="group left-0 absolute w-5/12 h-full flex flex-row justify-start items-center" onClick={prev}>
      <span className={imageButton()}>{"<"}</span>
    </button>
    <button className="group right-0 absolute w-5/12 h-full flex flex-row-reverse justify-start items-center" onClick={next}>
      <span className={imageButton()}>{">"}</span>
    </button>
    <div className="flex justify-center items-center w-2/6 absolute bottom-0 left-[33.3333%] h-14">
      <div className="flex flex-row justify-between items-center gap-2">
        {Array.from(Array(imageRepo.length).keys()).map(i => <div className={imageIndex({
          active: (i == imgIndex ? "isActive" : "isInactive"),
          theme: "light"
        })}
          key={`img-index-${i}`} />)}
      </div>
    </div>
    {image && <Image src={image.src} alt={image.alt} className="w-96 h-96 object-contain rounded-md overflow-hidden transition-all" />}
  </div>

const MyLink: React.FC<{ href: string, children?: ReactNode }> = ({ href, children }) => <Link
  className="text-amber-400/70 visited:text-purple-300/70 hover:text-amber-400 visited:hover:text-purple-300" href={href}>
  {children}
</Link>

const About = () => {
  const imgDisplay = useImageDisplay(images);

  return <Article>
    <SectionHeader>About</SectionHeader>
    <div className="flex flex-row gap-4">
      <ImageDisplay imageDisplayHook={imgDisplay} />
      <div className="text-left">
        <section>
          <span>
            Aspiring software engineer with intense drive and curiosity in software development.
          </span>
        </section>
        <section className="max-w-4xl">
          My computer infrastructure consists of:
          <ul className="list-disc list-inside">
            <li>24 home CPU cores</li>
            <li>60 GB of RAM (4 GB SDDR3 and 56 GB DDR4)</li>
            <li>2.5 TB of SSD + HDD</li>
            <li>A mix of NixOS, Ubuntu, and Windows</li>
          </ul>
        </section>
        <section>
          <span>
            In free time, you would find me:
          </span>
          <ul className="list-disc list-inside">
            <li>Learning about new technology in a week</li>
            <li>Performing microbenchmarks on competing implementations and technologies</li>
            <li>Optimizing my workspace through <MyLink href="https://git.pegasust.com/pegasust/dotfiles.git">dotfiles</MyLink></li>
            <li>Contributing to open-source projects</li>
            <li>Watching edutainment videos and podcasts about software</li> {/*TODO: add link to edutainment note-taking platform here*/}
            <li><MyLink href="https://soundcloud.com/h-ng-tr-n-186908751">Producing music</MyLink></li>
          </ul>
        </section>
      </div>
    </div>
  </Article>
}

const Experience = () => <Article>
  <SectionHeader>Experience</SectionHeader>

</Article>

const Blog = () => <Article>
  <SectionHeader>Blogs</SectionHeader>
  Currently have a Zettelkasten, but nothing is published yet.
</Article>

const Projects = () => <Article >
  <SectionHeader>Projects</SectionHeader>
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
        items-center bg-pink-50/20 min-h-screen antialiased snap-y snap-proximity
        scrollbar-track-gray-200 scrollbar-thumb-amber-300/50 scrollbar-thin"> {/*vimium users cry if snap-mandatory*/}
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

