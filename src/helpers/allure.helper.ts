import { type TestInfo } from '@playwright/test';
import * as fs from 'fs';

/** Allure severity levels */
export type AllureSeverity = 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial';

/** Add Allure metadata annotations to test */
export function allureMetadata(
  testInfo: TestInfo,
  options: {
    severity?: AllureSeverity;
    epic?: string;
    feature?: string;
    story?: string;
    owner?: string;
    id?: string;
  },
): void {
  if (options.severity) testInfo.annotations.push({ type: 'severity', description: options.severity });
  if (options.epic) testInfo.annotations.push({ type: 'epic', description: options.epic });
  if (options.feature) testInfo.annotations.push({ type: 'feature', description: options.feature });
  if (options.story) testInfo.annotations.push({ type: 'story', description: options.story });
  if (options.owner) testInfo.annotations.push({ type: 'owner', description: options.owner });
  if (options.id) testInfo.annotations.push({ type: 'allure_id', description: options.id });
}

/** Attach a file to Allure report */
export function allureAttachFile(
  testInfo: TestInfo,
  name: string,
  filePath: string,
  contentType: string,
): void {
  const content = fs.readFileSync(filePath);
  testInfo.attachments.push({
    name,
    contentType,
    body: content,
  });
}

/** Attach text content to Allure report */
export function allureAttachText(
  testInfo: TestInfo,
  name: string,
  content: string,
): void {
  testInfo.attachments.push({
    name,
    contentType: 'text/plain',
    body: Buffer.from(content),
  });
}
