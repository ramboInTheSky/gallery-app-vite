/** @jsxImportSource @emotion/react */
import { render } from "@testing-library/react";
import {
  Container,
  GalleryGrid,
  GalleryCard,
  GalleryImage,
  Author,
  SkeletonCard,
  Sentinel,
} from "./Components";

describe("Styled Components Snapshots", () => {
  it("renders Container correctly", () => {
    const { asFragment } = render(<Container>Content</Container>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders GalleryGrid correctly", () => {
    const { asFragment } = render(<GalleryGrid />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders GalleryCard correctly", () => {
    const { asFragment } = render(<GalleryCard>Card Content</GalleryCard>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders GalleryImage correctly", () => {
    const { asFragment } = render(
      <GalleryImage src="example.jpg" alt="Example" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders Author correctly", () => {
    const { asFragment } = render(<Author>Author Name</Author>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders SkeletonCard correctly", () => {
    const { asFragment } = render(<SkeletonCard />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders Sentinel correctly", () => {
    const { asFragment } = render(<Sentinel />);
    expect(asFragment()).toMatchSnapshot();
  });
});
