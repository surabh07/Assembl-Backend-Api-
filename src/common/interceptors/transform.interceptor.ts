import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import type { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ServiceResponse<T> {
  data: T;
  message: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: true;
  statusCode: number;
  message: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  ServiceResponse<T>,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<ServiceResponse<T>>,
  ): Observable<ApiResponse<T>> {
    const response = context.switchToHttp().getResponse<Response>();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((result) => {
        const apiResponse: ApiResponse<T> = {
          success: true,
          statusCode,
          message: result.message,
          data: result.data,
        };

        if (result.meta) {
          apiResponse.meta = result.meta;
        }

        return apiResponse;
      }),
    );
  }
}
