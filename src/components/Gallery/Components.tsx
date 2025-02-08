/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

// Main container for the gallery
export const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  padding-top: 1rem;
`;

// Grid layout for the gallery
export const GalleryGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

// Card layout for each image and author
export const GalleryCard = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  min-height: 215px;
  &:hover {
    box-shadow: 0 4px 8px var(--blue);
  }
`;

// Styled image to fit the container
export const GalleryImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

// Styled text for the author's name
export const Author = styled.p`
  margin: 0;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  color: var(--purple);
  background-color: #f9f9f9;
`;

// Skeleton card for loading state
export const SkeletonCard = styled.div`
  height: 220px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e2e2e2 50%, #f0f0f0 75%);
  animation: shimmer 1.5s infinite;
  aria-label: "Loading content"; /* Accessibility label for screen readers */

  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`;

// Sentinel for triggering infinite scroll
export const Sentinel = styled.div`
  text-align: center;
  font-size: 0.9rem;
  padding: 1rem;
  color: #555;

  &::after {
    content: "⌛"; // Add a spinner or loading animation
    display: inline-block;
    margin-left: 0.5rem;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
