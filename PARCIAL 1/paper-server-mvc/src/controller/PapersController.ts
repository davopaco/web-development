import PapersView from '../express/PapersExpress.js'
import PapersModel from '../model/PapersModel.js'

export default class PapersController {
  constructor (
    private readonly view: PapersView,
    private readonly model: PapersModel
  ) {}

  start () {}
}
