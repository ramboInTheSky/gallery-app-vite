import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./util/Cache";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import GalleryPage from "./components/Gallery/GalleryPage";
import EditPage from "./components/Edit/EditPage";
import "dotenv";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<GalleryPage />} />
            <Route path="edit/:imageId" element={<EditPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
