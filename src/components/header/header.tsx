// import module from "./header.module.css";
import styles from "./header.module.css";
import Link from "next/link";
import Navbar from "./navbar";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import LogoutButton from "./LogoutButton";

const Header = async () => {
  // const token = (await cookies()).get("jwtToken")?.value;
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  // if (token) {
  //   verifyTokenForPage(token);
  // }
  const payload = verifyTokenForPage(token);

  return (
    <header className={styles.header}>
      <Navbar isAdmin={payload?.isAdmin || false} />
      <div className={styles.right}>
        {payload ? (
          <>
            <strong className="text-blue-800 md:text-2xl capitalize">
              {payload?.username}
            </strong>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link className={styles.btn} href="/login">
              Login
            </Link>
            <Link className={styles.btn} href="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
