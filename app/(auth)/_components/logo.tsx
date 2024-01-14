import Image from "next/image"
import { Poppins } from "next/font/google"

import { cn } from "@/lib/utils"

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const Logo = () => {
    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="bg-white rounded-full p-1">
                <Image
                    src="/logo.svg"
                    alt="Cinema360 logo"
                    height={80}
                    width={80}
                    className="aspect-square"
                />
            </div>
            <div className={cn(
                "flex flex-col items-center",
                font.className
            )}>
                <p className="text-xl font-semibold">
                    Cinema360
                </p>
                <p className="text-sm text-muted-foreground">
                    let&apos;s watch together
                </p>
            </div>
        </div>
    )
}

export default Logo