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

export function DialogDeleteBlog({ open, setOpen, title, handleClick }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-red-500">Confirm delete {title}</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. Are you sure you want to delete?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className="rounded-2xl" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button onClick={handleClick} className="rounded-2xl bg-red-500" type="submit">
                                Delete
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </div>
        </Dialog>
    );
}
