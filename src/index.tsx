// tslint:disable-next-line:no-reference
/// <reference path='./index.d.ts'/>
import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
import small from "./small.png";
import verySmall from "./verySmall.png";
import CustomComponent from "./CustomComponent";

const hello = (arg: number): void => console.log(arg);

const Container = styled.main`
	border: 1px solid black;
`;
const Proof = styled.div`
	background-color: ${({ color }: { color?: string }) => color || "red"};
	width: 100px;
	height: 100px;
`;

ReactDOM.render(
	<Container
		onClick={() => {
			hello(45);
		}}>
		This is handled by file-loader ->
		<CustomComponent image={small} />
		this is handled by url-loader ->
		<CustomComponent image={verySmall} />
		<Proof />
		<Proof color="black" />
	</Container>,
	document.getElementById("root"),
);
