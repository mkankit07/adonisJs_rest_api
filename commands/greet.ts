import { BaseCommand, args } from '@adonisjs/core/ace'

export default class Greet extends BaseCommand {
  static commandName = 'greet'

  @args.string()
  public name: string | undefined

  @args.string()
  public age: string | undefined

  @args.string()
  public height: string | undefined

  async run() {
    this.logger.info('Ankit maurya')
    this.logger.info(`${this.name} - ${this.age} - ${this.height}`)
  }
}
