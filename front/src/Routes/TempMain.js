import React from 'react';
import { Link } from 'react-router-dom';

function TempMain() {
    return (
        <div>
            <div>
                검사
                <Link to='/diagnose/sweep'><button>청각처리속도</button></Link>
                <Link to='/diagnose/recognition'><button>어음청취력</button></Link>
                <Link to='/diagnose/attention'><button>선택적 집중력</button></Link>
            </div>
            <div>
                치료
                <Link to='/therapy/shadowing'><button>따라 읽기</button></Link>
                <Link to='/therapy/counting'><button>음절 수 계산</button></Link>
                <Link to='/therapy/phoneme'><button>첫소리 음소</button></Link>
            </div>
        </div >
    );
}

export default TempMain;