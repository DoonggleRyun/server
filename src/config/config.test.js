const config = require('./index');
//const defaults = require('./defaults');

describe('initializes', () => {
  it('is a function', () => {
    expect(config).toEqual(jasmine.any(Function));
  });

  it('can be called empty', () => {
    expect(config).not.toThrow();
    expect(config()).toEqual(jasmine.any(Object));
  });

  it('returns the correct defaults', () => {
    const opts = config();
    expect(opts.port).toBe(3000);
    expect(opts.public).toBe('public');
    expect(opts['view engine']).toBe('pug');
    expect(opts.verbose).toBe(false);
    expect(opts.middle.bodyParser.extended).toBe(true);
    expect(opts.middle.session.resave).toBe(false);
    expect(opts.middle.session.saveUninitialized).toBe(true);
    expect(Object.keys(opts.middle.session.cookie).length).toBe(0);
  });

  it('can set with a single param', () => {
    const opts = config(2000);
    expect(opts.port).toBe(2000);
    expect(opts.public).toBe('public');
  });

  it('can set as an object', () => {
    const opts = config({ port: 2000 });
    expect(opts.port).toBe(2000);
    expect(opts.public).toBe('public');
  });

  it('environment wins params', () => {
    const opts = config({ demo: 'aaa' });
    expect(opts.demo).toBe('bbb');
  });

  it('environment gets to number if needed', () => {
    const opts = config({ demob: 10 });
    expect(opts.demob).toBe(5);
  });

  it('no overwritting if no environment set', () => {
    const opts = config({ democ: 10 });
    expect(opts.democ).toBe(10);
  });
});
