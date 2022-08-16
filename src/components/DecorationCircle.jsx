import React from 'react'
import styled from 'styled-components';

const BaseCircle = styled.div`
	position: absolute;
	height: ${(props) => (props.size ? props.size * 100 + 'px' : '100px')};
	width: ${(props) => (props.size ? props.size * 200 + 'px' : '200px')};
	border-radius: 50%;
	background-color: ${(props) =>
		props.secondary ? `var(--ion-color-secondary)` : `var(--ion-color-primary-tint)`};
	opacity: ${(props) => (props.opacity ? props.opacity : '0.6')};
	z-index: 9999;
	overflow: hidden;
`;

const TopLeftCircle = styled(BaseCircle)`
	transform: translate(-50%, -50%) rotate(135deg);
	top: 0;
	left: 0;
`;

const TopRightCircle = styled(BaseCircle)`
	transform: translate(50%, -50%) rotate(-135deg);
	top: 0;
	right: 0;
`;

const BottomLeftCircle = styled(BaseCircle)`
	transform: translate(-50%, 50%) rotate(45deg);
	bottom: 0;
	left: 0;
`;

const BottomRightCircle = styled(BaseCircle)`
	transform: translate(50%, 50%) rotate(-45deg);
	bottom: 0;
	right: 0;
`;

const Wrapper = styled.div`
	width: 100%;
	overflow: hidden;
`;

const DecorationCircle = (props) => {
	let { position } = props;
	const Options = {
		'top-left': <TopLeftCircle {...props} />, //PASSAR O RESTO DAS PROPS
		'top-right': <TopRightCircle {...props} />,
		'bottom-left': <BottomLeftCircle {...props} />,
		'bottom-right': <BottomRightCircle {...props} />,
	};

	return <Wrapper>{Options[position]}</Wrapper>;
};

export default DecorationCircle;
