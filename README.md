# YuBis LoL Projects

## 1) Live LoL Esports
링크: https://yubis.github.io/live-lol-esports/

프로 경기 중계 화면을 실시간으로 모니터링하는 웹 프로젝트입니다.

주요 내용:
- LoL Esports 라이브/종료 경기 상태 표시
- 팀/선수/CS/KDA/골드/오브젝트 정보 표시
- 한국어 챔피언/룬/아이템 데이터 기반 UI
- LiveStats 누락 프레임 보완(backfill) 및 아이템 안정화 로직
- 중계 가독성을 위한 커스텀 레이아웃/스타일

기술:
- React + TypeScript
- Axios
- LoL Esports LiveStats API
- GitHub Pages 배포

## 2) LoL Database
링크: https://yubis.github.io/lol_database/

Data Dragon 기준으로 LoL 정적 데이터를 한 화면에서 조회/복사하기 쉽게 만든 데이터 페이지입니다.

주요 내용:
- 챔피언: 챔피언/패시브/QWER 아이콘, 한글/영문 이름 동시 표시
- 아이템: 아이콘, 한글/영문 이름, 설명, 가격 표시
- 소환사 주문: 아이콘, 설명, 재사용 대기시간 표시
- 룬: 지배/영감/정밀/결의/마법 카테고리별 아이콘/이름 정리
- 아이콘 박스 클릭 시 복사(clipboard) 기능 제공

기술:
- Vue 2
- Axios + jQuery
- Riot Data Dragon (최신 버전 동적 조회)
- GitHub Pages 배포