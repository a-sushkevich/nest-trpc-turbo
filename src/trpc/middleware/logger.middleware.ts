import { Injectable } from '@nestjs/common';
import {
  MiddlewareOptions,
  MiddlewareResponse,
  TRPCMiddleware,
} from 'nestjs-trpc';

@Injectable()
export class LoggerMiddleware implements TRPCMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  async use(opts: MiddlewareOptions) {
    const start = Date.now();
    const { next, path, type, input } = opts;
    const result = await next();

    const { req, res } = opts.ctx;
    const meta = {
      path,
      type,
      durationMs: Date.now() - start,
      method: req.method,
      statusCode: res.statusCode,
      ip: req.ip,
      headers: req.headers,
    };

    result.ok ? this.logger.log('Success', meta) : this.logger('Error', meta);

    return result;
  }
}
