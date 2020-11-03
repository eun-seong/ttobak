import React from 'react';
import styled from 'styled-components';

import level from 'const';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLine, VictoryTheme, VictoryContainer } from "victory";

const DateFormat = (d) => {
	if (d.includes('~')) {
		d = d.split('~')[0];
	}

	let date = new Date(d);
	return (date.getMonth() + 1) + '/' + date.getDate();
};


const GraphContainer = styled.div`
		display: flex;
		flex-direction: column;
		margin: 10px 5vw;
		height: 400px;
		z-index: 0;
`;

const GraphHeader = styled.div`
		display: flex;
		flex-direction: row;
		background-color: gray;
		border-radius: 10px 10px 0 0px;
		align-items: center;
		padding: 10px;
		height: 50px;
		font-size: 0.8rem;
		background-color: #e1d7c2;
`;

const GraphMain = styled.div`
		display: flex;
		background-color: white;
		border-radius: 0px 0px 10px 10px;
		height: 350px;
`;

const Badge = styled.div`
		width: 40px;
		height: 20px;
		background-color: ${props => Object.entries(level).find(el => el[1].text === props.level)[1]['color']
	};
		border-radius: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 5px;
`;

const Title = styled.div`
		display: flex;
		flex-grow: 1;
		font-weight: bold;
`;

const Detail = styled.div`
		display: flex;
		margin: 5px;
		font-weight: bold;
`;

const Line = {
	data: {
		stroke: '#aaaaaa',
		strokeWidth: '0.03em',
	}
};

const Bar = {
	data: {
		fill: '#b099cc'
	}
}

function GraphComp({ isCure, title, target, classLevel, tickle, axis }) {
	let axis_arr = [];
	for (var i = 0; i <= 4; i++) {
		axis_arr.push((tickle * i * 5));
	}

	return (
		<GraphContainer>
			<GraphHeader>
				<Badge level={classLevel}>{classLevel}</Badge>
				<Title>{title}</Title>
				<Detail>(준비중) 상세 내용 보기</Detail>
			</GraphHeader>
			<GraphMain>
				<VictoryChart
					maxDomain={{ y: tickle * 25 }}
					width={500}
					containerComponent={
						<VictoryContainer
							style={{
								pointerEvents: "auto",
								userSelect: "auto",
								touchAction: "auto"
							}}
						/>
					}
				>
					<VictoryAxis
						offsetX={40}
						dependentAxis
						tickValues={axis_arr}
						style={{ axis: { stroke: "none" } }}
					/>
					<VictoryAxis
						offsetY={40}
						crossAxis
						style={{ axis: { stroke: "none" } }}
					/>
					<VictoryLine y={() => 0} style={Line} />
					<VictoryLine y={() => tickle * 5} style={Line} />
					<VictoryLine y={() => tickle * 10} style={Line} />
					<VictoryLine y={() => tickle * 15} style={Line} />
					<VictoryLine y={() => tickle * 20} style={Line} />
					<VictoryBar
						barWidth={10}
						style={Bar}
						categories={{ x: Object.keys(target).map(day => DateFormat(day)) }}
						data={Object.entries(target).map(el => { return { x: DateFormat(el[0]), y: el[1] } })}
					/>
				</VictoryChart>
			</GraphMain>
		</GraphContainer>
	);
}

export default GraphComp;