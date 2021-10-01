import { RequestLogger } from 'testcafe';

const logger = RequestLogger(/^((?!wilko.com).)*$/gm);

fixture `Check requests`
    .beforeEach(async () => {
        logger.clear();
    })
    .afterEach(async () => {
        // console.log('requests - ' + JSON.stringify(logger.requests, null, 2));
    })
    .requestHooks(logger)
    .page `https://www.wilko.com/`;

test('plp', async t => {
    await t.navigateTo('https://www.wilko.com/en-uk/home/c/133')
    await t.expect(logger.requests.length).eql(0, `Requests found:\n ${JSON.stringify(logger.requests, null, 2)}`);
});

test('pdp', async t => {
    await t.navigateTo('https://www.wilko.com/en-uk/wilko-matte-black-toilet-seat/p/0488272')
    await t.expect(logger.requests.length).eql(0, `Requests found:\n ${JSON.stringify(logger.requests, null, 2)}`);
});