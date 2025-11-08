import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IconShieldCheckFilled, IconUser } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
export default function DialogChangeRole({ open, setOpen, handleSetRole, setRole, role }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Change User Role</DialogTitle>
                        <DialogDescription>
                            Select the new role for this user. This action will take effect immediately.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-2">
                        <Label>Select Role</Label>
                        <Select value={role} onValueChange={(e) => setRole(e)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Available Roles</SelectLabel>
                                    <SelectItem value="user">
                                        <IconUser stroke={2} />
                                        User
                                    </SelectItem>
                                    <SelectItem value="admin">
                                        <IconShieldCheckFilled />
                                        Admin
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" onClick={handleSetRole}>Save changes</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </div>
        </Dialog>
    );
}
