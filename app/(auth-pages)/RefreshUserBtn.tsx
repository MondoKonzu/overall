"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "../AuthContext"

const RefreshUserBtn = ({ formAction, children }: { formAction: (formData: FormData) => Promise<never>, children: React.ReactNode }) => {
    const { refresh } = useAuth();
    return (
        <Button formAction={(e) => {
            formAction(e)
            refresh();
        }}>
            {children}
        </Button>
    )
}

export default RefreshUserBtn
