import { TskvLogger } from '../../src/logger/tskv.logger';
describe('TskvLogger', () => {
  let tskvLogger: TskvLogger;
  let stdoutWriteSpy: jest.SpyInstance;
  let stderrWriteSpy: jest.SpyInstance;

  beforeEach(() => {
    tskvLogger = new TskvLogger();
    stdoutWriteSpy = jest.spyOn(process.stdout, 'write').mockImplementation();
    stderrWriteSpy = jest.spyOn(process.stderr, 'write').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should format log message as TSKV string', () => {
    const testMessage = 'Test log message';
    const testContext = 'TestContext';

    tskvLogger.log(testMessage, testContext);

    expect(stdoutWriteSpy).toHaveBeenCalled();

    const loggedArg = stdoutWriteSpy.mock.calls[0][0];
    expect(typeof loggedArg).toBe('string');

    expect(loggedArg).toMatch(/\n$/);

    const parts = loggedArg.trim().split('\t');

    const logObject: Record<string, string> = {};
    parts.forEach((part) => {
      const [key, value] = part.split('=');
      if (key && value) {
        logObject[key] = value;
      }
    });

    expect(logObject).toHaveProperty('level', 'log');
    expect(logObject).toHaveProperty('message', testMessage);
    expect(logObject).toHaveProperty('context', testContext);
    expect(logObject).toHaveProperty('time');

    expect(new Date(logObject.time).toISOString()).toBe(logObject.time);
  });

  it('should format error message as TSKV string and write to stderr', () => {
    const testMessage = 'Test error message';
    const testTrace = 'Error stack trace...';
    const testContext = 'ErrorContext';

    tskvLogger.error(testMessage, testTrace, testContext);

    expect(stderrWriteSpy).toHaveBeenCalled();
    expect(stdoutWriteSpy).not.toHaveBeenCalled();

    const loggedArg = stderrWriteSpy.mock.calls[0][0];
    expect(typeof loggedArg).toBe('string');
    expect(loggedArg).toMatch(/\n$/);

    const parts = loggedArg.trim().split('\t');
    const logObject: Record<string, string> = {};
    parts.forEach((part) => {
      const [key, value] = part.split('=');
      if (key && value) {
        logObject[key] = value;
      }
    });

    expect(logObject).toHaveProperty('level', 'error');
    expect(logObject).toHaveProperty('message', testMessage);
    expect(logObject).toHaveProperty('trace', testTrace);
    expect(logObject).toHaveProperty('context', testContext);
    expect(logObject).toHaveProperty('time');
    expect(new Date(logObject.time).toISOString()).toBe(logObject.time);
  });
});
