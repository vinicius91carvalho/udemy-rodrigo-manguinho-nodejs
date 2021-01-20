import { saveSurveyParamsSchema, accountSchema, errorSchema, loginParamsSchema, surveySchema, apiKeyAuthSchema, surveyAnswerSchema, surveysSchema, signupParamsSchema, addSurveyParamsSchema, surveyResultSchema } from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  error: errorSchema,
  survey: surveySchema,
  surveyAnswer: surveyAnswerSchema,
  surveys: surveysSchema,
  signupParams: signupParamsSchema,
  addSurveyParams: addSurveyParamsSchema,
  saveSurveyParams: saveSurveyParamsSchema,
  surveyResult: surveyResultSchema,
  apiKeyAuth: apiKeyAuthSchema
}
