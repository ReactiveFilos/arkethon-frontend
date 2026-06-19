import Link from "next/link";
import { Button, ButtonContent } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-sans">
      <p className="font-bold text-2xl">oops!</p>
      <p className="font-mono text-gray-600 text-lg dark:text-gray-400">
        something went wrong.
      </p>
      <Link href="/">
        <Button className="mt-4">
          <ButtonContent>Home</ButtonContent>
        </Button>
      </Link>
    </div>
  );
}
