class FakeID {
  private PREFIX: string;
  private count = 0;

  constructor() {
    const RANDOM_INT = Math.round(Math.random() * 10000);
    this.PREFIX = `FAKE_${ RANDOM_INT }_`;
  }

  public next(): string {
    return this.PREFIX + (++this.count);
  }

  public isFake(id: string): boolean {
    return id.startsWith(this.PREFIX);
  }
}

export default new FakeID();