import styled from 'styled-components';

export const Card = styled.div`
	background-color: rgba(255, 255, 255, 0.7);
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: ${(props) => (props.sharp ? '0' : '15px')};
	padding: 2rem;

	text-align: center;

	box-shadow: 0 10px 5px rgba(0, 0, 0, 0.1);
`;
