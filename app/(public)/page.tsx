import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="flex flex-col space-x-2">
        <h1 className="text-5xl mb-8">Public Landing Page</h1>
        <div className="flex w-full justify-center">
          <Link
            href="/account/login"
            className="px-7 py-3 bg-primary text-on-primary mr-2"
          >
            Login
          </Link>

          <Link
            href="/account/register"
            className="px-7 py-3 bg-secondary text-on-secondary"
          >
            Register
          </Link>
        </div>
      </section>
    </main>
  );
}
