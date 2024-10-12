"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteProduct, toggleProductAvailablity } from "@/lib/actions";
import { useTransition } from "react";

export function ActiveToggleDropdownItem({ id, isAvailableForPurchase }: { id: string, isAvailableForPurchase: boolean }) {
    const [isPending, startTransition] = useTransition()
    return (
        <DropdownMenuItem onClick={
            () => startTransition(async () => { await toggleProductAvailablity(id, !isAvailableForPurchase) })
        }>
            {isAvailableForPurchase ? "Deactivate" : "Activate"}
        </DropdownMenuItem>
    )
}

export function DeleteDropdownItem({ id, disabled }: { id: string, disabled: boolean }) {
    const [isPending, startTransition] = useTransition()
    return (
        <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            disabled={disabled || isPending}
            onClick={
                () => { startTransition(async () => { await deleteProduct(id) }) }
            }>
            Delete
        </DropdownMenuItem>
    )
}