import { BasicRange } from '@/types/Range';

export async function GET() {
  const range: BasicRange = { min: 0, max: 100 };

  return Response.json(range);
}
