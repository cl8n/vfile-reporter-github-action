import type { VFile } from 'vfile';
import type { VFileMessage } from 'vfile-message';

export default reporter;
export function reporter(files: VFile | VFile[]): string {
  if (!Array.isArray(files)) {
    files = [files];
  }

  return files.map(reportFile).join('');
}

function reportFile(file: VFile): string {
  return file.messages.map(reportMessage).join('');
}

function reportMessage(message: VFileMessage): string {
  const startLine = message.position?.start.line ?? message.line;
  const startColumn = message.position?.start.column ?? message.column;
  const endLine = message.position?.end.line;
  const endColumn = message.position?.end.column;

  const annotationParts: string[] = [];
  if (message.source != null && message.ruleId != null)
    annotationParts.push(`title=${message.source}:${message.ruleId}`);
  if (message.file != null)
    annotationParts.push(`file=${message.file}`);
  if (startLine != null)
    annotationParts.push(`line=${startLine}`);
  if (startColumn != null)
    annotationParts.push(`col=${startColumn}`);
  if (endLine != null)
    annotationParts.push(`endLine=${endLine}`);
  if (endColumn != null)
    annotationParts.push(`endColumn=${endColumn}`);

  let annotationBody = message.reason;
  if (message.url != null)
    annotationBody += ` — ${message.url}`;

  return `::${message.fatal ? 'error' : 'warning'} ${annotationParts.join(',')}::${annotationBody}\n`;
}
