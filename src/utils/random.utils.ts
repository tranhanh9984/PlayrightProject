import * as crypto from 'crypto';

/** Generate a random string of specified length */
export function randomString(length = 10): string {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

/** Generate a random email address */
export function randomEmail(domain = 'test.com'): string {
  return `user_${randomString(8)}@${domain}`;
}

/** Generate a random number between min and max */
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Generate a random phone number */
export function randomPhone(): string {
  return `+1${randomNumber(200, 999)}${randomNumber(100, 999)}${randomNumber(1000, 9999)}`;
}

/** Generate a unique ID (timestamp + random) */
export function uniqueId(): string {
  return `${Date.now()}_${randomString(6)}`;
}

/** Generate random user data for testing */
export function randomUserData() {
  const id = randomString(6);
  return {
    username: `testuser_${id}`,
    email: `testuser_${id}@test.com`,
    password: `Pass@${randomString(8)}`,
    firstName: `First_${id}`,
    lastName: `Last_${id}`,
  };
}
