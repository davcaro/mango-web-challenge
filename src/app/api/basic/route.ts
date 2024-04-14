import { BasicRange } from '@/types/Range';

export async function GET() {
  const range: BasicRange = { min: 25, max: 150 };

  return Response.json(range);
}
