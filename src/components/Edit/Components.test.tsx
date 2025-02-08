/** @jsxImportSource @emotion/react */
import { render } from "@testing-library/react";
import {
  Container,
  Form,
  Label,
  Input,
  RangeInput,
  PreviewContainer,
  Button,
} from "./Components";

describe("Styled Components Snapshots", () => {
  it("renders Container", () => {
    const { asFragment } = render(<Container>Content</Container>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders Form", () => {
    const { asFragment } = render(<Form>Form Content</Form>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders Label", () => {
    const { asFragment } = render(
      <Label>
        Label Text <Input />
      </Label>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders Input", () => {
    const { asFragment } = render(<Input />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders RangeInput", () => {
    const { asFragment } = render(<RangeInput type="range" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders PreviewContainer", () => {
    const { asFragment } = render(
      <PreviewContainer>
        <img src="example.jpg" alt="Preview" />
      </PreviewContainer>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders Button", () => {
    const { asFragment } = render(<Button>Click Me</Button>);
    expect(asFragment()).toMatchSnapshot();
  });
});
