
import OpenAI from 'openai';
 
import { env } from '$env/dynamic/private';
// You may want to replace the above with a static private env variable
// for dead-code elimination and build-time type-checking:
// import { OPENAI_API_KEY } from '$env/static/private'
 
// Create an OpenAI API client
export const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY || '',
});