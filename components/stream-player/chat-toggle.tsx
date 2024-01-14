"use client"

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { useChatSidebar } from "@/store/use-chat-sidebar";
import Hint from "../hint";
import { Button } from "@/components/ui/button";

const ChatToggle = () => {

    const {
        collapsed,
        onExpand,
        onCollapse
    } = useChatSidebar();

    const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine

    const onToggle = () => {
        if (collapsed) {
            onExpand();
        } else {
            onCollapse();
        }
    }

    const label = collapsed ? "Expand" : "Collapse";

    return (
        <Hint
            label={label}
            side="left"
            asChild
        >
            <Button
                onClick={onToggle}
                variant="ghost"
                className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
            >
                <Icon className="w-4 h-4" />
            </Button>
        </Hint>
    );
}

export default ChatToggle;