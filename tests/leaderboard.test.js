const { saveScore, getTop } = require('../leaderboard');

global.window = {};
global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockReset();
});

describe('saveScore', () => {
  it('sends POST request with JSON body', async () => {
    fetch.mockResolvedValueOnce({});
    await saveScore(123);
    expect(fetch).toHaveBeenCalledWith(expect.any(String), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: 123, initData: '' })
    });
  });
});

describe('getTop', () => {
  it('returns parsed JSON from a fetch call', async () => {
    const data = [{ id: 1 }];
    fetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(data) });
    await expect(getTop()).resolves.toEqual(data);
  });
});
