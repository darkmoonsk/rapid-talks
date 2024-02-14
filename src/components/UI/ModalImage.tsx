import Image from 'next/image';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  imageSrc: string;
}

const Modal: React.FC<ModalProps> = ({ imageSrc }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };


  return (
    <>
      <Image
        src={imageSrc}
        width={240}
        height={135}
        alt="Imagem envia pelo usuario"
        onClick={openModal}
        className="cursor-pointer w-auto h-auto rounded-md object-cover object-center"
      />

      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 flex items-center justify-center z-50">
          <div className="w-[90%]">  
            <Image
              src={imageSrc}
              layout="responsive"
              width={100} 
              height={80}
              alt="Imagem envia pelo usuario"
              className="rounded-md object-cover object-center"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;