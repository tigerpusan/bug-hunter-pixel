# Pest Eradication Art System Structure

## 폴더 구조
- assets/game_art/backgrounds/
- assets/game_art/pests/
- assets/game_art/weapons/
- assets/game_art/ui/

## 운영 원칙
- 배경: 월드 무드와 분위기 전담
- 해충: 개체별 스프라이트와 단계별 변형 관리
- 무기: 장총/발사 이펙트/반동 연출 관리
- UI: 아이콘/배지/프레임/앱 브랜딩 자산 관리

## 교체 전략
- 동일 파일명 유지 시 앱 코드 수정 없이 자산 교체 가능
- 신규 월드 추가 시 backgrounds와 pests 자산만 확장
- 장기적으로 sprite sheet / atlas 구조 전환 가능
