import { createLogger, format, transports } from 'winston'
import 'winston-daily-rotate-file'
const { combine, timestamp, prettyPrint } = format

class Logger {
  transport: object
  configData: object
  constructor () {
    this.transport = new transports.DailyRotateFile({
      filename: 'logs/%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      auditFile: 'logs/log-audit.json',
      maxSize: '20m',
      maxFiles: '2d'
    })

    this.configData = {
      level: 'info',
      format: combine(
        timestamp(),
        prettyPrint(),
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        // printf((info: { level: any }) => { return `${info.level}: ${info.message}` })
      ),
      defaultMeta: { service: 'user-service' },
      transports: [
        this.transport,
        new transports.Console()
      ]
    }
  }

  public createLogs (errorlogs: unknown, level: string = 'error'): void {
    console.log(errorlogs)
    const logger = createLogger(this.configData)
    if (errorlogs instanceof Error) {
      logger.log({
        level,
        message: errorlogs.message
      })
    }
  }
}

const logger: Logger = new Logger()
export {
  logger
}
