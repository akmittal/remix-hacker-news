import { LinksFunction, useTransition } from "remix";
import { Meta, Links, Scripts, LiveReload, useCatch } from "remix";
import { Outlet } from "react-router-dom";

import stylesUrl from "./styles/global.css";
import Navbar from "./components/Navbar";
import NavbarStyleUrl from "./styles/navbar.css";
import Footer from "./components/Footer";

import Nprogress from "nprogress";
import nprogressStyles from "~/styles/nprogress.css";
import { useEffect } from "react";

export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: stylesUrl },
    { rel: "stylesheet", href: NavbarStyleUrl },
    { rel: "stylesheet", href: nprogressStyles },
  ];
};

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  const transition = useTransition();
  useEffect(() => {
    if (transition.state === "loading" || transition.state === "submitting") {
      Nprogress.start();
    } else {
      Nprogress.done();
    }
  }, [transition.state]);
  return (
    <Document>
      <Navbar />
      <div className="wrapper">
      <Outlet />
      </div>
      <Footer />
    </Document>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  switch (caught.status) {
    case 401:
    case 404:
      return (
        <Document title={`${caught.status} ${caught.statusText}`}>
          <h1>
            {caught.status} {caught.statusText}
          </h1>
        </Document>
      );

    default:
      throw new Error(
        `Unexpected caught response with status: ${caught.status}`
      );
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <Document title="Uh-oh!">
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  );
}
