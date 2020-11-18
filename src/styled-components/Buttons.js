import styled from 'styled-components';

export const Button = styled.button`
	font-size: 1em;
	padding: 0.3em 1em;
	border-radius: ${(props) => (props.sharp ? '0' : '10px')};
	border: 2px solid
		${(props) => {
			if (props.primary) return 'purple';
			if (props.secondary) return 'rgba(0, 0, 0, 0.3)';
			return 'rgba(0, 0, 0, 0.3)';
		}};
	background-color: ${(props) => {
		if (props.primary) return 'violet';
		if (props.secondary) return 'orange';
		return 'inherit';
	}};
	color: ${(props) => (props.primary || props.secondary ? 'white' : 'inherit')};
	outline: none;

	:hover {
		cursor: pointer;
		border: 2px solid
			${(props) => {
				if (props.primary) return 'violet';
				if (props.secondary) return 'orange';
				return 'rgba(0, 0, 0, 0.3)';
			}};
		background-color: ${(props) =>
			props.primary || props.secondary ? 'white' : 'rgba(0, 0, 0, 0.3)'};
		color: ${(props) => {
			if (props.primary) return 'violet';
			if (props.secondary) return 'orange';
			return 'inherit';
		}};
	}
`;
