# Qwen AI Assistant

A privacy-focused, offline AI code assistant for VS Code powered by Qwen and Ollama. Get instant code explanations, reviews, and answers without sending your code to the cloud.

## Features

### 🔍 Explain Code
Select any code snippet and get a clear, concise explanation of what it does.

### 🔎 Review Code
Get professional code reviews with suggestions for improvements, potential bugs, and best practices.

### 💬 Ask Questions
Ask custom questions about your selected code - optimization tips, alternative approaches, or anything else.

## Requirements

- **Ollama** must be installed and running locally
- **Qwen model** (qwen2.5-coder:7b) must be downloaded

### Installation

1. Install [Ollama](https://ollama.ai/)
2. Download the Qwen model:
   ```bash
   ollama pull qwen2.5-coder:7b
   ```
3. Start Ollama (it runs automatically on most systems)
4. Install this extension from the VS Code Marketplace

## Usage

1. **Select code** in your editor
2. **Right-click** to open context menu
3. Choose one of the Qwen commands:
   - **Ask Qwen** - Ask a custom question
   - **Explain Code with Qwen** - Get an explanation
   - **Review Code with Qwen** - Get a code review

Results appear in the "Qwen Assistant" output panel.

## Privacy & Offline

- ✅ **100% offline** - no internet required after initial setup
- ✅ **Privacy-first** - your code never leaves your machine
- ✅ **No telemetry** - no data collection
- ✅ **Free** - no API keys or subscriptions needed

## Configuration

The extension uses these defaults:
- **Model**: qwen2.5-coder:7b
- **API URL**: http://localhost:11434
- **Timeout**: 30 seconds

(Configuration UI coming in future versions)

## Known Issues

- Requires Ollama to be running before use
- First request may be slow (model loading)
- Large code selections may timeout

## Release Notes

### 0.1.0 (Initial Release)

- ✨ Ask custom questions about code
- ✨ Explain code functionality
- ✨ Review code for improvements
- ✨ Context menu integration
- ✨ Offline operation with Ollama

## Contributing

Found a bug or have a feature request? Please [open an issue](https://github.com/nikita-bekish/qwen-assistant/issues).

## License

MIT

---

**Enjoy coding with your personal AI assistant!** 🤖
