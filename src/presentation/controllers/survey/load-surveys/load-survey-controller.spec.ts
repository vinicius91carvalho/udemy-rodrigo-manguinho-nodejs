import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import MockDate from 'mockdate'
import { LoadSurveysController } from './load-surveys-controller'
import { HttpRequest, LoadSurveys } from './load-survey-protocols'
import { mockSurveyModels, throwError } from '@/domain/test'
import { mockLoadSurveys } from '@/presentation/test'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({
  accountId: faker.random.uuid()
})

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = mockLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveys with correct value', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith(httpRequest.accountId)
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveyModels()))
  })

  test('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if AddSurvey throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
