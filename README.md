# Gallery with Infinite Scroll and Edit 

This project is a React application that implements an Gallery using:
- **React Query** for data fetching and state management
- **Emotion** for CSS-in-JS styling
- **Intersection Observer** for infinite scroll
- **Picsum Photos API** for dynamic image data
- **Edit Page**: Navigate to an edit page to manipulate image settings (e.g., size, grayscale).

### Key Features
- **Vite**: Just for the fun of trying something new :)
- **React Router 7**:Handles routing.
- **Infinite Scroll**: Dynamically load more images as you scroll down.
- **Responsive Grid**: Images are displayed in a flexible grid layout.
- **React Query**: Handles API calls, caching, and request deduplication.
- **Emotion**: Styled components for modular and reusable styles.
- **Jest**: to Unit Test the application. (I had troubles configuring Vitest and I didn't want to waste time on it)
- **Playwright**: E2E testing done right (and fast) :)
- **Custom fonts**: just because I am sick of Arial and Roboto :)

> I have opted for CSS-in-JS because I am a fan of snapshot-testing the styles, this helps refactor styles and upgrading libraries (especially design-systems although this is not the case) knowing what has actually changed in the actual manifestation of the app.

---

## File Structure
1. **`main`**: Entry point of the app and routing.
2. **`App`**: Router Outlet and main template of the app.
1. **`components/Gallery`**: Implements the feed with infinite scroll.
2. **`components/Edit`**: Handles the editing functionality for individual images.
3. **`utils`**: Contains helper functions for API requests.

> I have opted for a simplified file structure where all the side-effect and logic beloinging to a page component is encapsulated in the `<Component>Logic.ts` file for simplicity. an alternative approach would have been to create separate fetching utils and separate storage utils making the whole project less readable

### Setup, Installation and Run instructions
1. Clone the repository:
   ```bash
   git clone git@github.com:ramboInTheSky/ImageGallery-Vite.git
   cd ImageGallery-Vite
2. Install dependencies
    ```bash
    npm i
    ```
3. Run the application in development mode:
   ```bash
   npm run dev
    ```
    > This mode will be slower since the source files are not compressed and sourcemaps are delivered with the UI
    > It includes a react-query inspector (bottom right of the screen) and it is debuggable

### Production run
 Run the application in production mode:
   ```bash
   npm start
   ```
   > this is a simulation of the application built for production, it is served to the endpoint returned by Vite

---

### To test the application
   To unit test the app:
   ```bash
   npm test
   ```

   To perform static codee analysis:
   ```bash
   npm run lint
   ```

   To e2e test the app:
   ```bash
   npm test:e2e
   ```

   To e2e test the app in interactive mode:
   ```bash
   npm test:e2e:ui
   ```
---

### To contribute to the application
   To stage all files:
   ```bash
   git add .
   ```

   To commit :
   ```bash
   git cz
   ```
   > A wizard will appear to provide a commit message in the format of conventional commits, after which a pre-commit hook will run to perform static code analysis and unit tests

   > NOTE: in order to override the ``` git commit ``` command, the hook within `/.git` folder should be overridden, this has been avoided in this repo to leave the folder as standard

   To commit :
   ```bash
   git push
   ```
   > A pre-push hook will perform e2e tests 
