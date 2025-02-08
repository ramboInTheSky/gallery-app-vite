import React, { Fragment, useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Form,
  Label,
  Input,
  RangeInput,
  PreviewContainer,
  Button,
} from "./Components";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  ImageSettings,
} from "./EditLogic";

const EditPage: React.FC = () => {
  const { imageId } = useParams<{ imageId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isInitialSettings = useRef(true);
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem("editSettings");
    return savedSettings
      ? JSON.parse(savedSettings)
      : { width: 400, height: 300, grayscale: false, blur: 0 };
  });

  const handleChange = (settings: ImageSettings) => {
    setSettings(settings);
    isInitialSettings.current = false;
  };

  useEffect(() => {
    const savedSettings = imageId ? loadFromLocalStorage(imageId) : null;
    if (savedSettings) setSettings(savedSettings);
  }, [imageId]);

  useEffect(() => {
    if (imageId && !isInitialSettings.current) {
      saveToLocalStorage(imageId, settings);
    }
  }, [imageId, settings]);

  const buildImageUrl = () => {
    if (!imageId) return "";
    const params = [];
    if (settings.grayscale) params.push("grayscale");
    if (settings.blur > 0) params.push(`blur=${settings.blur}`);
    return (
      `https://picsum.photos/id/${imageId}/${settings.width}/${settings.height}` +
      (params.length ? `?${params.join("&")}` : "")
    );
  };

  const handleGoBack = () => {
    const searchParams = new URLSearchParams(location.search);
    const scrollPosition = searchParams.get("scroll");

    // Navigate back to the gallery, keeping the scroll query param
    navigate(`/?scroll=${scrollPosition || "0"}`);
  };

  return (
    <Fragment>
      <Button onClick={handleGoBack}>Go Back</Button>
      <Container>
        <Form>
          <Label>
            Width:
            <Input
              type="number"
              value={settings.width}
              onChange={(e) =>
                handleChange({ ...settings, width: +e.target.value })
              }
            />
          </Label>
          <Label>
            Height:
            <Input
              type="number"
              value={settings.height}
              onChange={(e) =>
                handleChange({ ...settings, height: +e.target.value })
              }
            />
          </Label>
          <Label>
            Grayscale:
            <Input
              style={{ transform: "scale(1.5)" }}
              type="checkbox"
              checked={settings.grayscale}
              onChange={(e) =>
                handleChange({ ...settings, grayscale: e.target.checked })
              }
            />
          </Label>
          <Label>
            Blur:
            <RangeInput
              type="range"
              min={0}
              max={10}
              value={settings.blur}
              onChange={(e) =>
                handleChange({ ...settings, blur: +e.target.value })
              }
            />
          </Label>
        </Form>
        <PreviewContainer>
          <a href={buildImageUrl()} target="_blank" rel="noreferrer">
            <img src={buildImageUrl()} alt="Preview" />
          </a>
        </PreviewContainer>
      </Container>
    </Fragment>
  );
};

export default EditPage;
