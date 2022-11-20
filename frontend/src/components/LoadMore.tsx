import { Button, Row } from "antd";

interface LoadMoreProps {
    isMore: boolean;
    isLoading: boolean;
    handlerAction: () => void;
}

export const LoadMore: React.FC<LoadMoreProps> = ({
    isMore,
    isLoading,
    handlerAction,
}) => {
    return (
        <>
            {isMore ? (
                <Row className="content__load" justify="center">
                    <Button loading={isLoading} onClick={() => handlerAction()}>
                        Загрузить еще
                    </Button>
                </Row>
            ) : null}
        </>
    );
};
