import { useRef } from "react";

interface IModal {
    isOpen: boolean;
    setModalOpen: (isOpen: boolean) => void;
}

export const ModalWindow: React.FC<IModal> = ({ isOpen, setModalOpen }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handlerClose = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (e.target === modalRef.current) {
            setModalOpen(false);
        }
    };

    return (
        <>
            <div
                className={`content__modal modal${isOpen ? "-show" : ""}`}
                onClick={handlerClose}
                ref={modalRef}
            >
                {isOpen ? (
                    <div className="modal__body" onClick={handlerClose}>
                        <h1>
                            Заявка на регистрацию успешно отправлена, ожидайте
                            уведомление о подтверждении на указанный Вами при
                            регистрации адрес электронной почты
                        </h1>
                    </div>
                ) : null}
            </div>
        </>
    );
};
