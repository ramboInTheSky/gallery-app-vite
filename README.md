# Gallery with Infinite Scroll and Edit 

This project is a React application that implements an Gallery featuring:
- **React Query** for data fetching and state management
- **Emotion** for CSS-in-JS styling
- **Intersection Observer** for infinite scroll
- **Picsum Photos API** for dynamic image data
- **Beautiful UI** (somehow ironic)
- **Edit Page**: Navigate to an edit page to manipulate image settings (e.g., size, grayscale).
- **Download image**: Click on the previewed image to see it in full resolution in a separate tab and download it via browser default behaviour (save image).

---

## Core Technologies & Dependencies

### Vite
much faster than Webpack for a lot of things I am starting to like it :)
### React: Frontend framework
I have used v18.3.1 although 19 has been stable for 2 months but libraries usually take time to catch-up and also I am not comfortable using it before reading everything about it (there are breaking changes) and already in v18 Suspense is not really finished (in fact I have not used it). Same goes for RSC, I could have set it up but I think it woud have been overkill for this project besides, it shows its best when in conjunction with NextJS in my opinion.
### React Router: Client-side routing
I like the Outlet feature, it reminds me of Remix, it allows SPAs to have a fixed template (eg header and footer)
### React Query: Data fetching & caching
I have used react-query as I fell in love with it lately because it simplifies API error handling, caching and fetching states.
I am also using a persister to save the dehidrated data in the localStorage to allow for refreshing any page at any time ith the peace of mind that the scroll position can be restored. (essentially if the user refreshes the Edit page and then navigates back to the gallery page, the react-query cache would not be persisted otherwise)
### Axios: API requests
Because it is the de-facto champion for XHR, it provides abortController (which I haven't used though) and interceptors OOTB
### Emotion: CSS-in-JS for styling
generally a tad ahead of styled-components, not as quick as Tailwind but better for larger teams.
I have opted for CSS-in-JS because I am a fan of snapshot-testing the styles, this helps refactor styles and upgrading libraries (especially design-systems although this is not the case) knowing what has actually changed in the actual manifestation of the app.
### husky + commitlint
this is to provide consistent commit messages conforming to conventional commits
### Playwright
E2E testing done right (and blazing fast) with AXE for accessibility testing.
### Dotenv
to handle .env files for different environments.
### Infinite Scroll
Dynamically load more images as you scroll down. Amazon shopping has probably spoiled me in regards to pagination.
### Responsive Grid
 Images are displayed in a flexible grid layout.
### Custom fonts
just because I am sick of Arial and Roboto :)

---

## File Structure
1. **`main`**: Entry point of the app and routing.
2. **`App`**: Router Outlet and main template of the app.
1. **`components/Gallery`**: Implements the feed with infinite scroll.
2. **`components/Edit`**: Handles the editing functionality for individual images.
3. **`utils`**: Contains helper functions for API requests.

> NOTES:
> I have reused (adapted really) a Gallery component I have made a while ago. I hope you don't mind it.

>I've taken a bit of a pragmatic approach (some might say cheeky) by encapsulating all side effects and logic related to a page component within its corresponding <Component>Logic.ts file. This keeps things tidy and straightforward. Of course, a more enterprise-level approach would involve separating concerns further by dedicating distinct modules for data fetching, state management, and storage. That would make the project more scalable and maintainable in the long run. But hey, not a lot can be done in 4 hours!!


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


## Final Notes
I have spent around 5 hours (cumulatively) on this and there are a lot of things I would like to change, for instance:

- using scrset for images instead of the hacky util
- streamline the file structure
- write more tests
- separate the e2e tess by concern
- make the whole site more accessible and test it with screenreaders
- find a better solution for the env_vars in Vite
- make some utils and a component wrapper (like in a jest.setup.ts) to make tests more readable 
- try to reuse some components around in a design-system style (although I think a lot could be reused here)
