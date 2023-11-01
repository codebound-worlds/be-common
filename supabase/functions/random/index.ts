// random

// This function generates a random integer between the given min and max values
function getRandomIntInclusive(min: number, max: number): number {
  // Create a new Uint32Array with length of 1
  const randomBuffer = new Uint32Array(1);

  // Generate a random value and store it in the randomBuffer
  crypto.getRandomValues(randomBuffer);
  const randomNumber = randomBuffer[0] / (0xffffffff + 1);

  // Round up the min and round down the max
  min = Math.ceil(min);
  max = Math.floor(max);
  // Return a random number between min and max
  return Math.floor(randomNumber * (max - min + 1)) + min;
}

// Serve a request and return a response
Deno.serve(async (req: Request) => {
  // Get the min, max, and qty from the request body
  const { min = 0, max = 1, qty = 1 } = await req.json();
  // Create an array to store the random numbers
  const random: Array<number> = [];

  // Generate qty amount of random numbers and push them into the array
  for (let i = 0; i < qty; i++) {
    random.push(getRandomIntInclusive(min, max));
  }

  // Return a response with the random numbers as JSON
  return new Response(
    JSON.stringify({ random }),
    { headers: { "Content-Type": "application/json" } },
  );
});
