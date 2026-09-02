import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:webview_flutter/webview_flutter.dart';

class GameScreen extends StatefulWidget {
  const GameScreen({super.key});

  @override
  State<GameScreen> createState() => _GameScreenState();
}

class _GameScreenState extends State<GameScreen> {
  static const _waveKey = 'pest_current_wave';
  static const _scoreKey = 'pest_current_score';
  static const _bonusKey = 'pest_bonus_type';

  late final WebViewController controller;

  Future<void> _saveProgress(String message) async {
    try {
      final data = jsonDecode(message) as Map<String, dynamic>;
      final wave = (data['wave'] as num?)?.toInt() ?? 1;
      final score = (data['score'] as num?)?.toInt() ?? 0;
      final bonus = data['bonus'] is String ? data['bonus'] as String : '';
      final prefs = await SharedPreferences.getInstance();
      await prefs.setInt(_waveKey, wave < 1 ? 1 : wave);
      await prefs.setInt(_scoreKey, score < 0 ? 0 : score);
      await prefs.setString(_bonusKey, bonus);
    } catch (_) {
      // Ignore malformed messages; gameplay must never stop because saving failed.
    }
  }

  Future<void> _restoreNativeProgress() async {
    final prefs = await SharedPreferences.getInstance();
    final wave = prefs.getInt(_waveKey) ?? 1;
    final score = prefs.getInt(_scoreKey) ?? 0;
    final bonus = prefs.getString(_bonusKey) ?? '';
    final payload = jsonEncode({'wave': wave, 'score': score, 'bonus': bonus});
    await controller.runJavaScript('window.applyNativeProgress($payload);');
  }

  @override
  void initState() {
    super.initState();
    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0xff07131b))
      ..addJavaScriptChannel(
        'AppNav',
        onMessageReceived: (m) {
          if (m.message == 'back' && mounted) {
            Navigator.pop(context);
          }
        },
      )
      ..addJavaScriptChannel(
        'GameSave',
        onMessageReceived: (m) {
          _saveProgress(m.message);
        },
      )
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageFinished: (_) {
            _restoreNativeProgress();
          },
        ),
      )
      ..loadFlutterAsset('assets/web/game.html');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xff07131b),
      body: SafeArea(child: WebViewWidget(controller: controller)),
    );
  }
}
