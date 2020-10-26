import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import HeaderComp from 'Components/HeaderComp';
import GraphComp from 'Components/GraphComp';

const GraphVariable = {
	'cure': [
		{'title': '학습량', 'y_axis': '분'},
		{'title': '성취도', 'y_axis': '점'}, 
		{'title': '발음 정확도', 'y_axis': '%'}
	], 
	'test': [
		{'title': '청각 처리 속도', 'y_axis': '점'},
		{'title': '어음 청취력', 'y_axis': '점'}, 
		{'title': '선택적 집중력', 'y_axis': '점'}
	]
};

const DateFormat = (d) => {
	if(d.includes('~')) {
		d = d.split('~')[0];
	}

	let date = new Date(d);
	return (date.getMonth()+1) + '/' + date.getDate();
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
    background-color: #FFFFFF;
`;



const StdStatistics = ({ goBack, state, Stat, isReady, isCure, period }) => {
		if(!isReady) return (<Container></Container>);
		let targets = (isCure ? [state.amount, state.score, state.voice_score] : [state.score_swp, state.score_swp, state.score_foc]);
		let tickles = targets.map(element => Math.ceil(Math.max(...Object.values(element))/20));

    return (
        <Container>
            <HeaderComp title={'학습자 통계'} goBack={goBack} />
            <MainContainer>
            	<TabContainer>
	            	<TabButton onClick={() => Stat(4, true, 'day')}>일간</TabButton>
	            	<TabButton onClick={() => Stat(4, true, 'week')}>주간</TabButton>
	            	<TabButton onClick={() => Stat(4, true, 'month')}>월간</TabButton>
	            	<TabButton onClick={() => Stat(4, false, 'day')}>검사</TabButton>
	            </TabContainer>
	            <GraphComp 
	            	isCure={isCure}
	            	title={(isCure ? GraphVariable['cure'][0]['title'] : GraphVariable['test'][0]['title'])}
	            	target={targets[0]}
	            	classLevel={state.class}
	            	tickle={tickles[0]}
	            	axis={(isCure ? GraphVariable['cure'][0]['y_axis'] : GraphVariable['test'][0]['y_axis'])}
	            />
	            <GraphComp 
	            	isCure={isCure}
	            	title={(isCure ? GraphVariable['cure'][1]['title'] : GraphVariable['test'][1]['title'])}
	            	target={targets[1]}
	            	classLevel={state.class}
	            	tickle={tickles[1]}
	            	axis={(isCure ? GraphVariable['cure'][1]['y_axis'] : GraphVariable['test'][1]['y_axis'])}
	            />
	            <GraphComp 
	            	isCure={isCure}
	            	title={(isCure ? GraphVariable['cure'][2]['title'] : GraphVariable['test'][2]['title'])}
	            	target={targets[2]}
	            	classLevel={state.class}
	            	tickle={tickles[2]}
	            	axis={(isCure ? GraphVariable['cure'][2]['y_axis'] : GraphVariable['test'][2]['y_axis'])}
	            />
            </MainContainer>
        </Container >
    );
}

export default StdStatistics;