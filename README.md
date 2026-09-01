# BUG HUNTER PIXEL V1.1.0 — PIXEL FOUNDATION

기존 `해충 박멸 V1.0.0 FINAL MASTER`를 손상시키지 않기 위해 **별도 앱/별도 패키지로 분리한 픽셀 리뉴얼 기준본**입니다.

## 독립 설치 기준
- 표시 이름: **버그헌터**
- Flutter project: `bug_hunter_pixel`
- Android org: `com.bughunterpixel`
- 버전: `1.1.0+110`
- APK: `BUG_HUNTER_PIXEL_V1.1.0_PIXEL_FOUNDATION.apk`
- 신규 픽셀 아이콘 적용

## V1.1.0에서 완료한 작업
- 홈 화면의 FINAL MASTER / WORLD / 메인 미션 / 웨이브 로드맵 / 개발자용 설명 문구 제거
- 사용자 안내를 `번호 순서`와 `MISS 3회` 중심으로 단순화
- 기존 전투 로직과 해충 40단계 진행 규칙 보존
- 해충 Sprite 크기와 Hitbox를 `GAME_CONFIG`에서 분리
- 장총 Anchor / 위치 / 폭 / 조준 계산값을 `GAME_CONFIG`로 분리
- HUD / Banner / Weapon 영역을 침범하지 않도록 전투 Safe Area 값을 명시적으로 분리
- 실패 시 내부 2단계 후퇴 로직은 유지하되 사용자 결과 화면 문구는 간단하게 표시

## 다음 단계
V1.2.0에서 배경, 파리, 모기, 나방, 장총, HUD, HIT/MISS FX를 픽셀 아트 자산으로 교체합니다.


## V1.2.1 DIFFICULTY TUNING
- 앱 표시 이름: 버그헌터
- 기존 게임 로직/난이도 유지
- 주방 픽셀 배경 적용
- 파리/모기/나방 픽셀 스프라이트 적용
- 장총 픽셀 스프라이트 적용 (투명 배경)
- HUD/조준선/HIT/MISS/GAME OVER 픽셀 UI 적용
