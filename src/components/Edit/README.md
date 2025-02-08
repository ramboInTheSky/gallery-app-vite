# Edit Page

The Edit Page allows users to customize an image's dimensions, grayscale mode, and blur settings. Changes persist using **localStorage**, so settings are restored when the user revisits (and on refresh).

The size of the preview is adjusted to always fit the screen and also render at best on tablets and mobiles, even at greatest resolutions

> there is no limit on the input fields since the API will return an error if those are too great and the UI will gracefully fail not showing the image.
---

## Features
1. **Dynamic Image Preview**: Updates the preview as settings are modified.
2. **Persistence**: Uses localStorage to save settings for each image.
3. **User Controls**:
   - Change image width and height.
   - Toggle grayscale mode.
   - Adjust blur (range: 0–10). (We have used a simple `range` input also down to A11y)
   - Clicking on the image will open it in a new tab in the requested resolution and the requested settings

---

## File Structure
- **`EditPage.tsx`**: Combines logic and styled components for the page.
- **`EditPage.test.tsx`**: Contains the tests for the EditPage module.
- **`EditLogic.ts`**: Contains helper functions for localStorage and default settings.
- **`EditLogic.test.ts`**: Contains the tests for the EditLogic module.
- **`Components.tsx`**: Modular Emotion-styled components.
- **`Components.tsx`**: Contains the tests for the Components module.

---

## Styling
- **CSS-in-JS** with Emotion:
  - Responsive and modular styles for inputs, buttons, and the preview.
  - Focus on accessibility and clean design.

---

## LocalStorage Integration
- Each iage’s settings are stored under a unique key, driven by ENV_VARS, defaulting to `editSettings_<imageId>`
- Functions:
  - **`saveToLocalStorage`**: Saves the current settings.
  - **`loadFromLocalStorage`**: Retrieves saved settings (if available).


> React Query has not been used for this component because the page is local-state driven.

> We're only persisting user settings (e.g., width, height, grayscale, blur) locally for individual images.

> Settings are lightweight and do not require global state or complex synchronization across components.

> The image data (imageId) is fetched once in the Gallery and passed to the Edit Page through the route. The `buildImageUrl()` function then retrieves the image specifying setting parameters. 