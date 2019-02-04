import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";

const xd = (arg: number) => console.log(arg);

const Container = styled.main`
    border: 1px solid black;
`;

const root = document.getElementById("root") as HTMLElement;
ReactDOM.render(
    <Container
        onClick={() => {
            xd(43);
        }}
    >
        asdsa
    </Container>,
    root,
);
