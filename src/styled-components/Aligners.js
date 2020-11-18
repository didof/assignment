import styled from 'styled-components';

export const Row = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: ${(props) => {
		if (props.spaceAround) return 'space-around';
		if (props.spaceEvenly) return 'space-evenly';
		else return 'space-between';
	}};
	aling-item: center;
`;

export const Column = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: ${(props) => {
		if (props.spaceAround) return 'space-around';
		if (props.spaceEvenly) return 'space-evenly';
		else return 'space-between';
	}};

	aling-item: center;
`;

export const Spacer = styled.div`
	width: 10%;
`;

// min-width: 20%;
// 	max-width: 40%;
// 	min-height: 20%;
// 	max-height: 40%;
