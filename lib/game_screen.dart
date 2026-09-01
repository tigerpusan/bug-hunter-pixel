import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class GameScreen extends StatefulWidget {
  const GameScreen({super.key});

  @override
  State<GameScreen> createState() => _GameScreenState();
}

class _GameScreenState extends State<GameScreen> {
  late final WebViewController controller;

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
