import { md5 } from 'js-md5';

const PUBLIC_KEY = 'be40780c1854261ee900fa2c17b576a9';
const PRIVATE_KEY = 'cc97a9b583ff905769ae44e03bb61a23022a5d13';
const timestamp = Number(new Date());
const hash = md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);
export const apiKey = `ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`;
