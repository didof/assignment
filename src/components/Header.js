import styled from 'styled-components';

const H1 = styled.h1`
	color: purple;
	padding-bottom: 0.3em;
	border-bottom: ${(props) =>
		props.b ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'};
`;

const H2 = styled.h2`
	color: violet;
	padding-bottom: 0.2em;
	border-bottom: ${(props) =>
		props.b ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'};
`;

const H3 = styled.h3`
	color: rgba(0, 0, 0, 0.7);
	padding-bottom: 0.2em;
	border-bottom: ${(props) =>
		props.b ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'};
`;

const H4 = styled.h4`
	color: rgba(0, 0, 0, 0.7);
	padding-bottom: 0.2em;
	border-bottom: ${(props) =>
		props.b ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'};
`;

const H5 = styled.h5`
	color: rgba(0, 0, 0, 0.7);
	padding-bottom: 0.2em;
	border-bottom: ${(props) =>
		props.b ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'};
`;

const H6 = styled.h6`
	color: rgba(0, 0, 0, 0.7);
	padding-bottom: 0.2em;
	border-bottom: ${(props) =>
		props.b ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'};
`;

const Header = ({ children, size, b }) => {
	if (size < 0 || size > 6) throw new Error(`size ${size} is not supported`);
	switch (size) {
		case 1:
			return <H1 b={b}>{children}</H1>;
		case 2:
			return <H2 b={b}>{children}</H2>;
		case 3:
			return <H3 b={b}>{children}</H3>;
		case 4:
		default:
			return <H4 b={b}>{children}</H4>;
		case 5:
			return <H5 b={b}>{children}</H5>;
		case 6:
			return <H6 b={b}>{children}</H6>;
	}
};

export default Header;
