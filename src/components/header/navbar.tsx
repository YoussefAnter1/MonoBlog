"use client";
import { GrTechnology } from "react-icons/gr";
import Link from "next/link";
import styles from "./header.module.css";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
interface NavbarProps {
  isAdmin: boolean;
}
function Navbar({ isAdmin }: NavbarProps) {
  const [toggle, setToggle] = useState(false);
  // console.log(toggle);
  return (
    <nav className={styles.navbar}>
      <div>
        <Link className={styles.logo} href="/">
          MONO
          <GrTechnology />
          BLOG
        </Link>
        <div className={styles.menu}>
          {toggle ? (
            <IoMdClose onClick={() => setToggle((prev) => !prev)} />
          ) : (
            <AiOutlineMenu onClick={() => setToggle((prev) => !prev)} />
          )}
        </div>
      </div>
      <div
        className={styles.navLinkWrapper}
        style={{
          clipPath: (toggle && "polygon(0 0, 100% 0,100% 100% ,0 100%)") || "",
        }}
      >
        <ul className={styles.navLinks}>
          <Link
            onClick={() => setToggle((prev) => !prev)}
            className={styles.navLink}
            href="/"
          >
            Home
          </Link>
          <Link
            onClick={() => setToggle((prev) => !prev)}
            className={styles.navLink}
            href="/articles?pageNumber=1"
          >
            Articles
          </Link>
          <Link
            onClick={() => setToggle((prev) => !prev)}
            className={styles.navLink}
            href="/about"
          >
            About
          </Link>
          {isAdmin && (
            <Link
              onClick={() => setToggle((prev) => !prev)}
              className={styles.navLink}
              href="/admin"
            >
              Admin Dashboard
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
