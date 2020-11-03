import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import HeaderComp from 'Components/HeaderComp';
import GraphComp from 'Components/GraphComp';

const GraphVariable = {
	'cure': [
		{ 'title': '학습량', 'y_axis': '분' },
		{ 'title': '성취도', 'y_axis': '점' },
		{ 'title': '발음 정확도', 'y_axis': '%' }
	],
	'test': [
		{ 'title': '청각 처리 속도', 'y_axis': '점' },
		{ 'title': '어음 청취력', 'y_axis': '점' },
		{ 'title': '선택적 집중력', 'y_axis': '점' }
	]
};

const DateFormat = (d) => {
	if (d.includes('~')) {
		d = d.split('~')[0];
	}

	let date = new Date(d);
	return (date.getMonth() + 1) + '/' + date.getDate();
};

/* styled-components */
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const MainContainer = styled.div`
		overflow: auto;
		display: flex;
    flex-direction: column;
`

const TabContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 25vw;
    margin: 20px 0;
`;

const TabButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    width: 80px;
    height: 30px;
    border-radius: 10px;
    background-color: ${props => props.selected ? '#b38878' : 'white'};
`;



const StdStatistics = ({ goBack, student, state, Stat, isReady, isCure, period, isFirstDiag }) => {
	if (!isReady) return (<Container></Container>);
	let targets = (isCure ? [state.amount, state.score, state.voice_score] : [state.score_swp, state.score_swp, state.score_foc]);
	let tickles = targets.map(element => Math.ceil(Math.max(...Object.values(element)) / 20));

	let graphs = [0, 1, 2];

	return (
		<Container>
			<HeaderComp title={'학습자 통계'} goBack={goBack} />
			<MainContainer>
				<TabContainer>
					<TabButton selected={period === 'day'} onClick={() => Stat(true, 'day')}>일간</TabButton>
					<TabButton selected={period === 'week'} onClick={() => Stat(true, 'week')}>주간</TabButton>
					<TabButton selected={period === 'month'} onClick={() => Stat(true, 'month')}>월간</TabButton>
					<TabButton onClick={isFirstDiag}>검사</TabButton>
				</TabContainer>
				{[0, 1, 2].map((idx) => {
					return (<GraphComp
						key={idx}
						isCure={isCure}
						title={(isCure ? GraphVariable['cure'][idx]['title'] : GraphVariable['test'][idx]['title'])}
						target={targets[idx]}
						classLevel={state.class[idx]}
						tickle={tickles[idx]}
						axis={(isCure ? GraphVariable['cure'][idx]['y_axis'] : GraphVariable['test'][idx]['y_axis'])}
					/>);
				})}
			</MainContainer>
		</Container >
	);
}

export default StdStatistics;