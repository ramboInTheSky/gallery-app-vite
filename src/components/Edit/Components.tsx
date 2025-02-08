/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

// Main container
export const Container = styled.div`
  margin: 0 auto;
  max-width: 600px;
  min-height: 630px;
  color: var(--blue);
  border: 1px solid var(--purple);
  padding: 1.5rem 2rem 1rem 2rem;
  border-radius: 25px;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    background: var(--light-purple);
    z-index: -1;
  }
  @media (max-width: 900px) {
    border: none;
  }
`;

// Form layout
export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--light-purple);
  margin-bottom: 2rem;
`;

// Input field styles
export const Label = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Input = styled.input`
  margin-left: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: var(--purple);
`;

// Range input
export const RangeInput = styled.input`
  width: 85%;
  color: var(--orange);
`;

// Image preview container
export const PreviewContainer = styled.div`
  margin-bottom: 1.5rem;
  text-align: center;

  img {
    max-width: 100%;
    max-height: 50vh;
    min-height: 400px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
`;

// Button
export const Button = styled.button`
  padding: 0.75rem 1rem;
  border: none;
  background: var(--orange);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 1rem;
  font-weight: 700;
  &:hover {
    opacity: 0.8;
  }
`;
