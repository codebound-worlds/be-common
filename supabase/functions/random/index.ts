// random

function getRandomIntInclusive(min: number, max: number): number {
  const randomBuffer = new Uint32Array(1);

  crypto.getRandomValues(randomBuffer);
  const randomNumber = randomBuffer[0] / (0xffffffff + 1);

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(randomNumber * (max - min + 1)) + min;
}

Deno.serve(async (req: Request) => {
  let { min, max, qty } = await req.json();
  if (min == null) min = 0;
  if (max == null) max = 1;
  if (qty == null) qty = 1;
  const random: Array<number> = [];

  let i = 0;
  while (i < qty) {
    random.push(getRandomIntInclusive(min, max));
    i++;
  }

  return new Response(
    JSON.stringify({ random }),
    { headers: { "Content-Type": "application/json" } },
  );
});
