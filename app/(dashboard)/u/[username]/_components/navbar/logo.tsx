import Image from "next/image"
import { Poppins } from "next/font/google"

import { cn } from "@/lib/utils"
import Link from "next/link";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-x-4 hover:opacity-75 transition">
            <div className="bg-white rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
                <Image
                    src="/logo.svg"
                    alt="Cinema360 logo"
                    height={32}
                    width={32}
                    className="aspect-square"
                />
            </div>
            <div className={cn(
                "hidden lg:flex flex-col items-start",
                font.className
            )}>
                <p className="text-lg font-semibold">
                    Cinema360
                </p>
                <p className="text-xs text-muted-foreground">
                    Creator dashboard
                </p>
            </div>
        </Link>
    )
}

export default Logo