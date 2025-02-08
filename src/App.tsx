import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

const isDev = process.env.NODE_ENV === "development";

const App: React.FC = () => {
  return (
    <Fragment>
      <div id="hero">Fantastic Gallery</div>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {isDev && <ReactQueryDevtools initialIsOpen={false} />}
        <Outlet />
      </div>
    </Fragment>
  );
};

export default App;
