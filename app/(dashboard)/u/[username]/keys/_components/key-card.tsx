"use client"

import { Input } from "@/components/ui/input";
import CopyButton from "./copy-button";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface KeyCardProps {
    value: string | null;
}

const KeyCard = ({ value }: KeyCardProps) => {
    const [show, SetShow] = useState(false);

    return (
        <div className="rounded-2xl bg-muted p-6">
            <div className="flex gap-x-10">
                <p className="font-semibold shrink-0 pt-2">
                    Stream Key
                </p>
                <div className="space-y-2 w-full">
                    <div className="w-full flex items-center gap-x-2">
                        <Input
                            value={value || ""}
                            disabled
                            type={show ? "text" : "password"}
                            placeholder="Stream Key"
                        />
                        <CopyButton
                            value={value}
                        />
                    </div>
                    <Button
                    size="sm"
                    variant="link"
                    onClick={() => SetShow(!show)}
                    >
                        {show ? "Hide" : "Show"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default
    KeyCard