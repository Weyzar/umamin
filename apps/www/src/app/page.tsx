import { Button } from "@umamin/ui/components/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen grid place-items-center">
      <div className="text-center">
        <h1 className="font-bold text-6xl">hello, umamin</h1>
        <p>💌 The ultimate platform for anonymous messages!</p>
        <Link href="/to/user" className="mt-5 flex gap-2">
          <Button className="w-full">Send Message</Button>
          <Button className="w-full" variant="secondary">
            View Profile
          </Button>
        </Link>
      </div>
    </main>
  );
}
