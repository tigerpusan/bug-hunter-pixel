# 해충 박멸 V0.1.7.1 - Build Test Hotfix

GitHub Actions의 `Run basic app test` 실패 원인을 수정했습니다.

## 원인
메인 화면의 해충 단계 카드가 `SingleChildScrollView` 내부에서 세로 크기 제한 없이 `Expanded`를 사용해, 위젯 테스트 환경에서 unbounded height 레이아웃 오류가 발생할 수 있었습니다.

## 수정
- 파리/모기/나방 카드 이미지 영역을 고정 높이 `SizedBox(height: 58)`로 변경
- 혼합 카드 이미지 Stack도 고정 높이로 변경
- 게임 로직과 아트 에셋은 V0.1.7 그대로 유지
- APK artifact 이름: `pest-eradication-v0.1.7.1-apk`
