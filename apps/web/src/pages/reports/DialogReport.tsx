import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";

export function DialogReport({ selectedReport }: { selectedReport: Report }) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">View</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedReport.title}</DialogTitle>
            <div>
              <Badge variant={"secondary"} className="mr-3">
                {selectedReport.category}
              </Badge>
              <Badge>{selectedReport.status}</Badge>
            </div>
            <DialogDescription>{selectedReport.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <p className="text-sm text-muted-foreground">
              {dayjs(selectedReport.createdAt).format("DD MMMM YYYY, HH:mm")}
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
