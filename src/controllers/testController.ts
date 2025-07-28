import express from 'express';
import { getAxios, responseOK } from '../utils/axiosUtils';

// GET /api/users/
export const getFunFact = async (
  req: express.Request,
  res: express.Response
) => {
  const url = 'https://uselessfacts.jsph.pl/api/v2/facts/random';

  const resAxios = await getAxios(
    req,
    res,
    null,
    url,
    `Fun fact not found.`,
    `Unable to get fun fact.`
  );
  if (responseOK(resAxios)) {
    res.json({
      welcome: 'Welcome to the Pro-Tasker server',
      fact: resAxios.data.text
    });
    console.log('Fun Fact: ', resAxios.data);
  } else {
    console.log('Problem getting fun fact.');
  }
};
