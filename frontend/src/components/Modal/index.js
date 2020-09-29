import React, { useEffect, useCallback, useRef } from 'react';

import './Modal.scss';

// title, 모달 클릭 여부를 판단 할 state, setState를 props로 전달하여준다.
const Modal = ({ children, isClicked, setClick, title }) => {
  const modalContainer = useRef();

  useEffect(() => {
    if (isClicked) {
      modalContainer.current.style.display = 'block';
    } else {
      modalContainer.current.style.display = 'none';
    }
  }, [isClicked]);

  const onBackgroundClicked = useCallback(() => {
    setClick(false);
  }, [isClicked]);

  const onToggleModal = useCallback(() => {
    if (!isClicked) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [isClicked]);

  return (
    <div className="modal-container" ref={modalContainer}>
      <div className="modal__background" onClick={onBackgroundClicked}></div>
      <div className="modal__box">
        <div className="modal__header">
          <span>{title}</span>
          <button onClick={onToggleModal}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
