import type { PaginationMeta } from '../dto/pagination.dto.js';

export function getPaginationParams(page = 1, limit = 10): { skip: number; take: number } {
  const skip = (page - 1) * limit;
  return { skip, take: limit };
}

export function buildPaginationMeta(total: number, page: number, limit: number): PaginationMeta {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
