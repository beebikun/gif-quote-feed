export default class GeneratorID {
  private PREFIX: string;
  private count = 0;

  constructor(_START: string = 'FAKE') {
    const RANDOM_INT = Math.round(Math.random() * 10000);
    this.PREFIX = `${ _START }_${ RANDOM_INT }_`;
  }

  public next(): string {
    return this.PREFIX + (++this.count);
  }

  public is(id: string): boolean {
    return id.startsWith(this.PREFIX);
  }
}
