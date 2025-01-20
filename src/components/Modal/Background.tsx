import { styled } from "styled-components"

interface BackgroundModalProps {
    onClick: () => void;
}

export const BackgroundModal = ({ onClick }: BackgroundModalProps) => {
    return <BackgroundModalBox onClick={onClick} />
}

const BackgroundModalBox = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
`