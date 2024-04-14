export async function GET() {
  const range: number[] = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];

  return Response.json(range);
}
