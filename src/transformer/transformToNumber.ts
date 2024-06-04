import { Transform, TransformOptions } from 'class-transformer';

export const TransformToNumber = (options?: TransformOptions) =>
  Transform(({ value }) => Number(value), options);
