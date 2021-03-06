import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadSurveyById, SaveSurveyResult, SurveyAnswerModel } from './save-survey-result-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(httpRequest.params?.surveyId)
      if (survey) {
        if (!this.isValidAnswer(survey.answers, httpRequest.body.answer)) {
          return forbidden(new InvalidParamError('surveyId'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }
      const surveyResult = await this.saveSurveyResult.save({
        accountId: httpRequest.accountId,
        answer: httpRequest.body.answer,
        date: new Date(),
        surveyId: survey.id
      })

      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }

  private isValidAnswer (answers: SurveyAnswerModel[], answer: string): SurveyAnswerModel {
    return answers.find(surveyAnswer => surveyAnswer.answer === answer)
  }
}
