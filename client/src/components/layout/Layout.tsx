import { ReactChild, ReactFragment, ReactPortal } from "react";
import classes from "./Layout.module.css";
import Navbar from "./Navbar";

function Layout(props: {
  children:
    | boolean
    | ReactChild
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
}) {
  return (
    <div>
      <Navbar />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
