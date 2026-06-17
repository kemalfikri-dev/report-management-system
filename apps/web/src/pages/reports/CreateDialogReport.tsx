import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import apiClient, { isAxiosError } from "@/lib/axios";
import type { ApiErrorResponse } from "@/types/auth";
import { toast } from "sonner";

export function CreateDialogReport({ refetch }: CreateReportProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await apiClient.post("/reports/create", {
        title,
        category,
        description,
      });
      if (res.status === 201) {
        toast.success("Report Berhasil Dibuat");
        setCategory("");
        setDescription("");
        setTitle("");
        setIsOpen(false);
        refetch();
      }
    } catch (err) {
      if (isAxiosError<ApiErrorResponse>(err)) {
        if (err.response) {
          toast.error(err.response?.data?.error);
        } else if (err.request) {
          toast.error("Tidak dapat terhubung ke server");
        } else {
          toast.error("Terjadi kesalahan yang tidak diketahui");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Report</DialogTitle>
            <DialogDescription>Create your Report here!</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Report Title
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="Report Name"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-category-ts6">
                  Category
                </FieldLabel>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="checkout-category-ts6">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="MAINTENANCE">MAINTENANCE</SelectItem>
                      <SelectItem value="COMPLAINT">COMPLAINT</SelectItem>
                      <SelectItem value="BUG">BUG</SelectItem>
                      <SelectItem value="FEATURE">FEATURE</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Description
                </FieldLabel>
                <Textarea
                  value={description}
                  placeholder="Type your message here."
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Field>
            </FieldGroup>
          </div>
          <DialogFooter className="sm:justify-end pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
