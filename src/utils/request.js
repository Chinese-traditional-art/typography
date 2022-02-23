import superagent from 'superagent';

export const getGushiwen = async (words = '') => {
  const res = await superagent
    .post('https://api.realign.cn/o/gushiwen')
    .set('gushiwen-token', '51f0807b68abf9b28f2999f9de81aba8')
    .send({
      words,
    });

  return res.body;
};
