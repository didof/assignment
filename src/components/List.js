import styled from 'styled-components';

import Header from './Header';

const UL = styled.ul`
	list-style-type: none;
	padding-top: 0.3em;
`;

const LI = styled.li`
	border: 1px solid rgba(0, 0, 0, 0.1);
	padding: 0.3em 1em;
	border-radius: 10px;
	box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
`;

/*
Generally it is preferable not to use Math.random() to generate an id but for
the purposes of this assignment I felt that Math-random() + '-' + [some_text]
was sufficient.
*/

const List = ({ values }) => {
	return (
		<UL>
			{values.map((el) => {
				return <ListItem key={`${Math.random()}-${el}`}>{el}</ListItem>;
			})}
		</UL>
	);
};

export default List;

const ListItem = ({ children }) => {
	return (
		<LI>
			<Header size={6}>{children}</Header>
		</LI>
	);
};
