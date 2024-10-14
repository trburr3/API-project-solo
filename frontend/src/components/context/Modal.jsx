import { createContext, useContext, useRef } from "react";
import './Modal.css';

const ModalContext = createContext();

export function ModalProvider({ children }){
    const [modalContent, setModalContent] = useState(null);
    const [onModalClose, setOnModalClose] = useState(null);

    const modalRef = useRef();

    const modalClose = () => {
        setModalContent(null);

        if( typeof onModalClose === 'function' ) {
            setOnModalClose(null);
            onModalClose();
        }
    }

    const contextValue = {
        modalRef,
        modalContent,
        setModalContent,
        setOnModalClose,
        modalClose
    };

    return(
        <>
            <ModalContext.Provider value={contextValue}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function Modal() {
    const { modalRef, modalContent, closeModal } = useContext(ModalContext);

    if (!modalRef || !modalRef.current || !modalContent) return null;

    return ReactDOM.createPortal(
      <div id="modal">
        <div id="modal-background" onClick={closeModal} />
        <div id="modal-content">{modalContent}</div>
      </div>,
      modalRef.current
    );
  }

  export const useModal = () => useContext(ModalContext);