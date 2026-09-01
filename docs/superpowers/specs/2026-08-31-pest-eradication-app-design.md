# 해충 박멸 App V0.1 Design

## Goal
현재 V0.2.7 HTML의 난이도와 게임 규칙을 보존하면서 Android 앱으로 구조화한다.

## V0.1 Scope
- 파리, 모기, 초파리 각 10단계
- 번호순 사격
- 허공/잘못된 번호 MISS 누적 3회 실패
- 실패 시 2단계 하락
- 제한시간: 1단계 10초, 2~3 15초, 4~6 20초, 7~10 25초
- 무기 4종: 권총, 장총, 새총, 젓가락
- 앱형 홈/무기 선택/게임/기록/설정 구조
- BGM, 효과음, 해충 날갯소리는 다음 구현 작업에서 네이티브 설정과 연결
- '고주파 모드'는 게임 사운드 효과로만 취급하며 실제 해충 퇴치 효능을 주장하지 않음

## Architecture
Flutter shell + WebView game engine for V0.1 APK. 검증된 HTML 게임성을 우선 보존하고, 이후 Flutter-native game renderer로 단계적 이전 가능하게 분리한다.
