import { JsonLogger } from '../../src/logger/json.logger';

describe('JsonLogger', () => {
  let jsonLogger: JsonLogger;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jsonLogger = new JsonLogger();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should format log message as JSON', () => {
    const testMessage = 'Test log message';
    const testContext = 'TestContext';

    jsonLogger.log(testMessage, testContext);

    expect(consoleLogSpy).toHaveBeenCalled();

    const loggedArg = consoleLogSpy.mock.calls[0][0];

    expect(typeof loggedArg).toBe('string');

    let parsedLog;
    try {
      parsedLog = JSON.parse(loggedArg);
    } catch (e) {
      throw new Error(`Logged message is not valid JSON: ${loggedArg}`);
    }

    expect(parsedLog).toHaveProperty('level', 'log');
    expect(parsedLog).toHaveProperty('message', testMessage);
    expect(parsedLog).toHaveProperty('context', testContext);
    expect(parsedLog).toHaveProperty('timestamp');
    expect(new Date(parsedLog.timestamp).toISOString()).toBe(
      parsedLog.timestamp,
    );
    expect(parsedLog).not.toHaveProperty('optionalParams');
  });

  it('should format error message as JSON with trace', () => {
    const testMessage = 'Test error message';
    const testTrace = 'Error stack trace...';
    const testContext = 'ErrorContext';

    jsonLogger.error(testMessage, testTrace, testContext);

    expect(consoleErrorSpy).toHaveBeenCalled();

    const loggedArg = consoleErrorSpy.mock.calls[0][0];
    expect(typeof loggedArg).toBe('string');

    let parsedLog;
    try {
      parsedLog = JSON.parse(loggedArg);
    } catch (e) {
      throw new Error(`Logged error message is not valid JSON: ${loggedArg}`);
    }

    expect(parsedLog).toHaveProperty('level', 'error');
    expect(parsedLog).toHaveProperty('message', testMessage);
    expect(parsedLog).toHaveProperty('trace', testTrace);
    expect(parsedLog).toHaveProperty('context', testContext);
    expect(parsedLog).toHaveProperty('timestamp');
    expect(new Date(parsedLog.timestamp).toISOString()).toBe(
      parsedLog.timestamp,
    );
  });
});
