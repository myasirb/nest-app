import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'IS_PUBLIC';

export const IsPublic = (value: boolean) => SetMetadata(IS_PUBLIC, value);
