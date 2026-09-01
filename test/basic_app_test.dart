import 'package:flutter_test/flutter_test.dart';
import 'package:bug_hunter_pixel/app.dart';

void main() {
  testWidgets('home shows simplified title and start button', (tester) async {
    await tester.pumpWidget(const BugHunterPixelApp());
    expect(find.text('버그헌터'), findsOneWidget);
    expect(find.text('게임 시작'), findsOneWidget);
    expect(find.text('MISS 3회가 되면 게임이 끝납니다.'), findsOneWidget);
  });
}
