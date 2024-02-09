import crypto from 'crypto';

/**
 * Generate a random string of 172 length
 * @returns random string of 172 length
 */
export const random = () => crypto.randomBytes(128).toString('base64');

/**
 * Generate authentication token
 * @param salt the used string to salt the password
 * @param password the password to salt
 * @returns the salted password with 64 length
 */
export const authentication = (salt: string, password: string) => {
  return crypto.createHmac('sha256', [salt, password].join('/')).update(process.env.APP_SECRET!).digest('hex');
};
