import { getScore, setScore } from '../src/js/scoreQuery';

jest.mock('../src/js/scoreQuery');

describe('getting and setting the score from and to the external API', () => {
  it('saves an entry with given name and score in the API', async () => {
    setScore.mockResolvedValue({
      result: 'Leaderboard score created successfully.',
    });
    const success = await setScore('Tester', 9000);
    expect(success.result).toMatch('Leaderboard score created successfully.');
  });

  it('returns the requested user', async () => {
    getScore.mockResolvedValue({
      result: [{
        user: 'John Doe',
        score: 42,
      },
      {
        user: 'Peter Parker',
        score: 35,
      },
      {
        user: 'Wonder Woman',
        score: 50,
      },
      ],
    });
    const leaders = await getScore();
    expect(leaders.result[0].user).toBe('John Doe');
  });

  it('returns the requested user score', async () => {
    getScore.mockResolvedValue({
      result: [{
        user: 'John Doe',
        score: 42,
      },
      {
        user: 'Peter Parker',
        score: 35,
      },
      {
        user: 'Wonder Woman',
        score: 50,
      },
      ],
    });

    const leaders = await getScore();
    expect(leaders.result[0].score).toEqual(42);
  });
});