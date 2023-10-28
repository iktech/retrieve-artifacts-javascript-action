// math.test.js
const retrieve = require('./retrieve');
// require('dotenv').config();

test('retrieve single artifact details', () => {
    let version;
    return retrieve('https://artifactor.uat.artifactz.io',
        process.env.ARTIFACTZ_TOKEN,
        'Development',
        'test-data')
        .then((response => {
            expect(response['test-data']).toBe('1.0.0');
        }));
});

test('retrieve multiple artifact details', () => {
    let version;
    return retrieve('https://artifactor.uat.artifactz.io',
        process.env.ARTIFACTZ_TOKEN,
        'Development',
        '["test-data", "frontend"]')
        .then((response => {
            expect(response['test-data']).toBe('1.0.0');
            expect(response['frontend']).toBe('1.0.0.31');
        }));
});

test('retrieve no token', () => {
    let version;
    return retrieve('https://artifactor.uat.artifactz.io',
        process.env.ARTIFACTZ_TOKEN,
        '',
        '["test-data", "frontend"]')
        .catch((e => {
            expect(e.message).toBe('Stage is required');
        }));
});

test('retrieve no artifacts', () => {
    let version;
    return retrieve('https://artifactor.uat.artifactz.io',
        process.env.ARTIFACTZ_TOKEN,
        'Development',
        '')
        .catch((e => {
            expect(e.message).toBe('Artifacts names are required');
        }));
});

test('retrieve no stage', () => {
    let version;
    return retrieve('https://artifactor.uat.artifactz.io',
        '',
        'Development',
        '["test-data", "frontend"]')
        .catch((e => {
            expect(e.message).toBe('API token is required');
        }));
});
