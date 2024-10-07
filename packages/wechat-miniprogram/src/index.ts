import * as common from './@internal'

import { WxHttpClient } from './http'
import { FileData, UploadFile } from './file'

export { FileData } from './file'
export { UploadTask, UploadConfig } from './@internal'

function beforeCancel(task: common.UploadTask, hook: () => Promise<common.Result>) {
  const rawCancel = task.cancel
  task.cancel = async () => {
    const cancelResult = await rawCancel()
    if (!common.isSuccessResult(cancelResult)) {
      return cancelResult
    }
    return hook()
  }
}

export const createDirectUploadTask = (file: FileData, config: common.UploadConfig) => {
  const innerFile = new UploadFile(file)
  config.httpClient = config.httpClient ?? new WxHttpClient()
  const task = common.createDirectUploadTask(innerFile, config)
  task.onError(() => innerFile.free())
  task.onComplete(() => innerFile.free())
  beforeCancel(task, () => innerFile.free())
  return task
}

export const createMultipartUploadV1Task = (file: FileData, config: common.UploadConfig) => {
  const innerFile = new UploadFile(file)
  config.httpClient = config.httpClient ?? new WxHttpClient()
  const task = common.createMultipartUploadV1Task(innerFile, config)
  task.onError(() => innerFile.free())
  task.onComplete(() => innerFile.free())
  beforeCancel(task, () => innerFile.free())
  return task
}

export const createMultipartUploadV2Task = (file: FileData, config: common.UploadConfig) => {
  const innerFile = new UploadFile(file)
  config.httpClient = config.httpClient ?? new WxHttpClient()
  const task = common.createMultipartUploadV2Task(innerFile, config)
  task.onError(() => innerFile.free())
  task.onComplete(() => innerFile.free())
  beforeCancel(task, () => innerFile.free())
  return task
}