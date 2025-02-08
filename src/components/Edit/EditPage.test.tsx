import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EditPage from "./EditPage";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(() => ({
    search: "?scroll=500",
  })),
}));

const mockNavigate = jest.fn();

describe("EditPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    jest
      .spyOn(window.localStorage.__proto__, "getItem")
      .mockImplementation((key) => {
        if (key === "editSettings") {
          return JSON.stringify({
            width: 500,
            height: 400,
            grayscale: true,
            blur: 5,
          });
        }
        return null;
      });
    jest.spyOn(window.localStorage.__proto__, "setItem").mockClear();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter initialEntries={["/edit/1"]}>
        <Routes>
          <Route path="/edit/:imageId" element={<EditPage />} />
        </Routes>
      </MemoryRouter>
    );

  test("renders the input fields and default values", () => {
    jest
      .spyOn(window.localStorage.__proto__, "getItem")
      .mockImplementation((key) => {
        if (key === "editSettings") return null;
      });
    renderComponent();
    expect(screen.getByLabelText("Width:")).toHaveValue(400);
    expect(screen.getByLabelText("Height:")).toHaveValue(300);
    expect(screen.getByLabelText("Grayscale:")).not.toBeChecked();
    expect(screen.getByLabelText("Blur:")).toHaveValue("0");
  });

  test("loads settings from local storage", () => {
    renderComponent();
    expect(screen.getByLabelText("Width:")).toHaveValue(500);
    expect(screen.getByLabelText("Height:")).toHaveValue(400);
    expect(screen.getByLabelText("Grayscale:")).toBeChecked();
    expect(screen.getByLabelText("Blur:")).toHaveValue("5");
  });

  test("saves settings to local storage on change", async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText("Width:"), {
      target: { value: "600" },
    });

    fireEvent.change(screen.getByLabelText("Height:"), {
      target: { value: "500" },
    });

    fireEvent.click(screen.getByLabelText("Grayscale:"));

    const blurInput = screen.getByLabelText("Blur:") as HTMLInputElement;

    fireEvent.change(blurInput, { target: { value: "10" } });

    await waitFor(async () =>
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "editSettings_1",
        JSON.stringify({ width: 600, height: 500, grayscale: false, blur: 10 })
      )
    );
  });

  test("builds the correct image URL based on settings", async () => {
    renderComponent();

    const image = screen.getByAltText("Preview");

    // Wait for initial image URL to match default settings
    await waitFor(() =>
      expect(image).toHaveAttribute(
        "src",
        "https://picsum.photos/id/1/500/400?grayscale&blur=5"
      )
    );

    fireEvent.change(screen.getByLabelText("Width:"), {
      target: { value: "600" },
    });

    fireEvent.change(screen.getByLabelText("Height:"), {
      target: { value: "500" },
    });

    fireEvent.click(screen.getByLabelText("Grayscale:"));

    fireEvent.change(screen.getByLabelText("Blur:"), {
      target: { value: "10" },
    });

    // Wait for image URL to update
    await waitFor(() =>
      expect(image).toHaveAttribute(
        "src",
        "https://picsum.photos/id/1/600/500?blur=10"
      )
    );
  });

  test("navigates back to GalleryPage with preserved scroll position", () => {
    renderComponent();
    fireEvent.click(screen.getByText("Go Back"));
    expect(mockNavigate).toHaveBeenCalledWith("/?scroll=500");
  });
});
