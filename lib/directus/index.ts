import { env } from '@/app/env';
import { createDirectus, rest } from '@directus/sdk';
import { Schema } from '@/types/directus-schema';

export const directus = createDirectus<Schema>(env.NEXT_PUBLIC_DIRECTUS_URL)
.with(rest());
