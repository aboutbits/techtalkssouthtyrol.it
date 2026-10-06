import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-between bg-gray p-6 text-white md:p-20">
      <div />
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-center text-h5">404 Error</h1>
        <p className="text-center text-md">This page could not be found.</p>
        <Link
          href="/"
          className="mt-10 inline-block bg-white px-4 py-2 text-md text-gray outline-4 outline-offset-[0.1875rem] outline-white hover:bg-gray-10 focus-visible:outline md:text-lg"
        >
          Go to home
        </Link>
      </div>
      <Link href="/">Logo</Link>
    </div>
  )
}
