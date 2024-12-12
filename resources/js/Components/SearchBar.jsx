import React from 'react';
import styled from 'styled-components';

const SearchBar = ({ value, onChange, onReset }) => {
  return (
    <StyledWrapper>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <button type="submit" className="icon-btn">
          <svg
            width={17}
            height={16}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="search"
          >
            <path
              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
              stroke="currentColor"
              strokeWidth="1.333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <input
          className="input"
          placeholder="Zoek een klant..."
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button className="reset" type="reset" onClick={onReset}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    max-width: 400px;
    background-color: #f3f3f4;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .input {
    width: 100%;
    height: 40px;
    padding: 0 2.5rem 0 2.5rem;
    border: none;
    border-radius: 8px;
    background-color: transparent;
    font-size: 1rem;
    color: #0d0c22;
    outline: none;
  }

  .input::placeholder {
    color: #9e9ea7;
  }

  .icon-btn {
    position: absolute;
    left: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #9e9ea7;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .reset {
    position: absolute;
    right: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #9e9ea7;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }

  .input:not(:placeholder-shown) + .reset {
    opacity: 1;
    visibility: visible;
  }

  .form:focus-within .input {
    border: 2px solid rgba(50, 118, 234, 0.4); /* Updated to blue */
    box-shadow: 0 0 0 4px rgba(50, 118, 234, 0.1); /* Updated to blue */
  }
`;

export default SearchBar;
