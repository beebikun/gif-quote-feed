class FakeID {
  constructor() {
    const RANDOM_INT = Math.round(Math.random() * 10000);
    this.PREFIX = `FAKE_${ RANDOM_INT }_`;
    this.count = 0;
  }

  next(): string {
    return this.PREFIX + (++this.count);
  }

  isFake(id: string): boolean {
    return id.startsWith(this.PREFIX);
  }
}

export default new FakeID();