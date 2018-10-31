import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerTextEditorCommand("json-trimmer.trim", trim));
}

const e = /(,)(?=\s*?[\}\]])|".*?"/g;

async function trim(args) {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        await editor.edit(builder => {
            const document = editor.document;
            const text = document.getText();
            let match: RegExpExecArray;
            while ((match = e.exec(text)) != null) {
                const group1 = match[1];
                if (group1) {
                    const position = document.positionAt(match.index);
                    builder.delete(new vscode.Range(position, position.translate(0, 1)));
                }
            }
        });
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
}
