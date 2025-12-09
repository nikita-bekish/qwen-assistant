// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { QwenService } from "./qwenService";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const qwenService = new QwenService();
  const outputChannel = vscode.window.createOutputChannel("Qwen Assistant");

  const explainCodeCommand = vscode.commands.registerCommand(
    "qwen-assistant.explainCode",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active editor");
        return;
      }

      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);
      if (!selectedText) {
        vscode.window.showWarningMessage("Please select code first");
        return;
      }

      vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Qwen is analyzing...",
          cancellable: false,
        },
        async () => {
          try {
            const result = await qwenService.explainCode(selectedText);

            outputChannel.clear();
            outputChannel.appendLine("=== Explain Code ===\n");
            outputChannel.appendLine(result);
            outputChannel.show();
          } catch (error) {
            if (error instanceof Error) {
              vscode.window.showErrorMessage(`Error: ${error.message}`);
            } else {
              vscode.window.showErrorMessage(`Error: ${String(error)}`);
            }
          }
        }
      );
    }
  );

  const reviewCodeCommand = vscode.commands.registerCommand(
    "qwen-assistant.reviewCode",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active editor");
        return;
      }

      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);
      if (!selectedText) {
        vscode.window.showWarningMessage("Please select code first");
        return;
      }

      vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Qwen is reviewing...",
          cancellable: false,
        },
        async () => {
          try {
            const result = await qwenService.reviewCode(selectedText);

            outputChannel.clear();
            outputChannel.appendLine("=== Code Review ===\n");
            outputChannel.appendLine(result);
            outputChannel.show();
          } catch (error) {
            if (error instanceof Error) {
              vscode.window.showErrorMessage(`Error: ${error.message}`);
            } else {
              vscode.window.showErrorMessage(`Error: ${String(error)}`);
            }
          }
        }
      );
    }
  );

  const askQwenCommand = vscode.commands.registerCommand(
    "qwen-assistant.askQwen",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active editor");
        return;
      }

      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);
      if (!selectedText) {
        vscode.window.showWarningMessage("Please select code first");
        return;
      }

      const question = await vscode.window.showInputBox({
        prompt: "What do you want to ask about this code?",
        placeHolder: "e.g., How can I optimize this?",
      });

      if (!question) {
        return; // пользователь отменил
      }

      vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Qwen is analyzing...",
          cancellable: false,
        },
        async () => {
          try {
            const result = await qwenService.askQuestion(
              selectedText,
              question
            );

            outputChannel.clear();
            outputChannel.appendLine("=== Ask Qwen ===\n");
            outputChannel.appendLine(result);
            outputChannel.show();
          } catch (error) {
            if (error instanceof Error) {
              vscode.window.showErrorMessage(`Error: ${error.message}`);
            } else {
              vscode.window.showErrorMessage(`Error: ${String(error)}`);
            }
          }
        }
      );
    }
  );

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "qwen-assistant" is now active!'
  );

  context.subscriptions.push(explainCodeCommand);
  context.subscriptions.push(reviewCodeCommand);
  context.subscriptions.push(askQwenCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
