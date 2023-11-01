// random-test.ts

// Import required libraries and modules
import { assertEquals } from 'https://deno.land/std@0.192.0/testing/asserts.ts'
import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.23.0'
import "https://deno.land/std@0.204.0/dotenv/load.ts";

// Set up the configuration for the Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
const options = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
}

// Test the 'random' function
const testHelloWorld = async () => {
  const client: SupabaseClient = createClient(supabaseUrl, supabaseKey, options)

  const arrayLength = 10;
  // Invoke the 'random' function with a parameter
  const { data: func_data, error: func_error } = await client.functions.invoke('random', {
    body: { min: 0, max: 100, qty: arrayLength },
  })

  // Check for errors from the function invocation
  if (func_error) {
    throw new Error('Invalid response: ' + func_error.message)
  }

  // Log the response from the function
  console.log(JSON.stringify(func_data, null, 2))

  // Assert that the function returned the expected result
  assertEquals(func_data.random.length, arrayLength)
}

// Register and run the tests
Deno.test('Random Function Test', testHelloWorld)
