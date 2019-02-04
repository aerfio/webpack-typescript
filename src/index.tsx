import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
const root = document.getElementById("root") as HTMLElement;
const xd = (arg: number) => console.log(arg);

const Container = styled.main`
    border: 1px solid blue;
`;
ReactDOM.render(
    <Container
        onClick={() => {
            xd(23);
        }}
    >
        asdsa
    </Container>,
    root,
);
