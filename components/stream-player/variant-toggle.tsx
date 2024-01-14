"use client"

import { MessageSquare, Users } from "lucide-react";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import Hint from "../hint";
import { Button } from "@/components/ui/button";

const VariantToggle = () => {

    const {
        variant,
        onChangeVariant
    } = useChatSidebar();

    const isChat = variant === ChatVariant.CHAT;

    const Icon = isChat ? Users : MessageSquare

    const onToggle = () => {
       const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;

       onChangeVariant(newVariant);
    }

    const label = isChat ? "Community" : "Go back to chat";

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

export default VariantToggle;