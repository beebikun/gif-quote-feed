import request from 'supertest';
import app from '../../src/app';

export const DATA = Object.freeze({ text: 'text', gif: { src: 'src', width: 50, height: 80 } });
const BAD_DATA = Object.freeze({ bad: 'data', text: undefined, gif: 10 });

export function makeApiRequest(url: string, method: string, errorCode?: number) {
    const d = errorCode === 500 ? BAD_DATA : DATA;
    let r = request(app)[method](url);
    if (method === 'get') {
        r = r.set('Accept', 'application/json');
    } else if (method !== 'delete') {
        r = r.send(d);
    }
    if (!errorCode) {
        r = r.expect('Content-Type', /json/);
    }
    r = r.expect(errorCode ? errorCode : method === 'post' ? 201 : 200);
    return [r, d];
}
