import { z } from 'zod';

export const geocodingResultSchema = z.object({
  id: z.number(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  country: z.string().optional().default(''),
  admin1: z.string().optional(),
  admin2: z.string().optional(),
});

export const geocodingResponseSchema = z.object({
  results: z.array(geocodingResultSchema).optional(),
});

export type GeocodingResponse = z.infer<typeof geocodingResponseSchema>;
