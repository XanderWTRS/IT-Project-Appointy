import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);
  const scrollTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      clearTimeout(scrollTimer.current);

      if (window.scrollY < 100) {
        setShowButton(false);
        return;
      }
      setShowButton(false);

      scrollTimer.current = setTimeout(() => {
        setShowButton(true);
      }, 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(scrollTimer.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StyledWrapper>
      <button className={`button ${showButton ? 'visible' : ''}`} onClick={scrollToTop}>
        <svg className="svgIcon" viewBox="0 0 384 512">
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5
          12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0
          17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5
          12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
    position: fixed;
    bottom: 50px;
    left: 20px;
    z-index: 999;

    .button {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgb(20, 20, 20);
        border: none;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 0px 0px 4px rgba(39, 173, 245, 0.2);
        cursor: pointer;
        overflow: hidden;
        position: relative;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease-in-out, width 0.3s ease-in-out, border-radius 0.3s ease-in-out, background-color 0.3s ease-in-out;
    }

    .button.visible {
        opacity: 1;
        pointer-events: auto;
    }

    .svgIcon {
        width: 12px;
        transition-duration: 0.3s;
    }

    .svgIcon path {
        fill: white;
    }

    .button:hover {
        width: 140px;
        border-radius: 50px;
        background-color: rgb(59 130 246);
        transition-duration: 0.3s;
        align-items: center;
    }

    .button:hover .svgIcon {
        transition-duration: 0.3s;
        transform: translateY(-200%);
    }

    .button::before {
        position: absolute;
        bottom: -20px;
        content: "Terug naar boven";
        color: white;
        font-size: 0px;
    }

    .button:hover::before {
        font-size: 13px;
        opacity: 1;
        bottom: unset;
        transition-duration: 0.3s;
    }
`;

export default BackToTop;
