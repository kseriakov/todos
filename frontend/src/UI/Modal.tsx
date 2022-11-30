import { useRef } from "react";

interface IModal {
    isOpen: boolean;
    setModalOpen: (isOpen: boolean) => void;
}

export const ModalWindow: React.FC<IModal> = ({ isOpen, setModalOpen }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handlerClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!modalRef.current?.contains(e.target as Node)) {
            setModalOpen(false);
        }
    };

    return (
        <>
            <div
                className={`content__modal modal${isOpen ? "-show" : ""}`}
                onClick={handlerClose}
            >
                {isOpen ? (
                    <div className="modal__body" ref={modalRef}>
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
