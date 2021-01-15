import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadSurveyById, SurveyAnswer } from './save-survey-result-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(httpRequest.params?.surveyId)
      if (survey) {
        if (this.isValidAnswer(survey.answers, httpRequest.body.answer)) {

        } else {
          return forbidden(new InvalidParamError('surveyId'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }

  private isValidAnswer (answers: SurveyAnswer[], answer: string): SurveyAnswer {
    return answers.find(surveyAnswer => surveyAnswer.answer === answer)
  }
}
