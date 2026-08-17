import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-text-secondary">
        That page is not part of this collection site.
      </p>
      <Link href="/" className="mt-6 inline-block">
        <Button>Home</Button>
      </Link>
    </div>
  );
}
