import 'package:flutter/material.dart';
import 'game_screen.dart';

class BugHunterPixelApp extends StatelessWidget {
  const BugHunterPixelApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: '버그헌터',
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: const Color(0xfff2ead8),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xffd99a18),
          brightness: Brightness.light,
        ),
        fontFamilyFallback: const ['Noto Sans KR', 'sans-serif'],
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xff9bdcf7), Color(0xffdff4ee), Color(0xfff2ead8)],
          ),
        ),
        child: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.fromLTRB(22, 24, 22, 28),
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 520),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Center(
                      child: Container(
                        width: 112,
                        height: 112,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: const Color(0xff182431), width: 4),
                          boxShadow: const [
                            BoxShadow(
                              color: Color(0x33000000),
                              blurRadius: 0,
                              offset: Offset(6, 6),
                            ),
                          ],
                        ),
                        clipBehavior: Clip.antiAlias,
                        child: Image.asset(
                          'assets/game_art/ui/app_icon.png',
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                    const SizedBox(height: 22),
                    const Text(
                      '버그헌터',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 38,
                        fontWeight: FontWeight.w900,
                        color: Color(0xff182431),
                        letterSpacing: -1.4,
                        height: 1.05,
                      ),
                    ),
                    const SizedBox(height: 10),
                    const Text(
                      '해충을 조준해 박멸하세요.',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w800,
                        color: Color(0xff405363),
                      ),
                    ),
                    const SizedBox(height: 28),
                    Container(
                      padding: const EdgeInsets.fromLTRB(22, 22, 22, 20),
                      decoration: BoxDecoration(
                        color: const Color(0xfffff9eb),
                        border: Border.all(color: const Color(0xff182431), width: 3),
                        borderRadius: BorderRadius.circular(10),
                        boxShadow: const [
                          BoxShadow(
                            color: Color(0x22000000),
                            blurRadius: 0,
                            offset: Offset(5, 5),
                          ),
                        ],
                      ),
                      child: const Column(
                        children: [
                          _RuleRow(
                            number: '1',
                            text: '번호 순서대로 맞히세요.',
                          ),
                          SizedBox(height: 14),
                          Divider(height: 1, thickness: 2, color: Color(0xffd8c9aa)),
                          SizedBox(height: 14),
                          _RuleRow(
                            number: '3',
                            text: 'MISS 3회가 되면 게임이 끝납니다.',
                            warning: true,
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 26),
                    SizedBox(
                      height: 72,
                      child: FilledButton(
                        style: FilledButton.styleFrom(
                          backgroundColor: const Color(0xffffc62a),
                          foregroundColor: const Color(0xff182431),
                          elevation: 0,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                            side: const BorderSide(color: Color(0xff182431), width: 3),
                          ),
                        ),
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (_) => const GameScreen()),
                          );
                        },
                        child: const Text(
                          '게임 시작',
                          style: TextStyle(
                            fontSize: 26,
                            fontWeight: FontWeight.w900,
                            letterSpacing: -0.5,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _RuleRow extends StatelessWidget {
  final String number;
  final String text;
  final bool warning;

  const _RuleRow({
    required this.number,
    required this.text,
    this.warning = false,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Container(
          width: 42,
          height: 42,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: warning ? const Color(0xffd84b37) : const Color(0xff315d86),
            border: Border.all(color: const Color(0xff182431), width: 2),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Text(
            number,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 20,
              fontWeight: FontWeight.w900,
            ),
          ),
        ),
        const SizedBox(width: 14),
        Expanded(
          child: Text(
            text,
            style: const TextStyle(
              color: Color(0xff233747),
              fontSize: 16,
              fontWeight: FontWeight.w900,
              height: 1.35,
            ),
          ),
        ),
      ],
    );
  }
}
