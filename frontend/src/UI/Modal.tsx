interface IModal {
    isOpen: boolean;
}

export const ModalWindow: React.FC<IModal> = ({ isOpen }) => {
    return (
        <>
            {isOpen ? (
                <div className={`content__modal modal${isOpen ? "-show" : ""}`}>
                    <div className="modal__window">
                        <h1>
                            Заявка на регистрацию успешно отправлена, ожидайте
                            уведомление о подтверждении на указанный Вами при
                            регистрации адрес электронной почты
                        </h1>
                    </div>
                </div>
            ) : null}
        </>
    );
};
