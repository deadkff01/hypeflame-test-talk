import styled from "styled-components";

export const Button = styled.button`
  height: 3.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  background-color: #266bff;
  color: #fff;
  font-weight: 500;
  border-color: #266bff;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
  outline: none;

  &:focus {
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
    outline: none;
  }

  &:hover {
    background-color: #1e55cb;
  }

  &:disabled {
    background-color: #dce0f0;
    border-color: #dce0f0;
  }
`;
