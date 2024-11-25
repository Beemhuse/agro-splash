'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button className="bg-green-500 rounded-lg py-2 text-white px-4 w-fit" onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
