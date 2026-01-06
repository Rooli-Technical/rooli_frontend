import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function OrganizationModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [currentWorkspace, setCurrentWorkspace] = useState<string>("pay-day");
  const organizations = [
    { name: "Payday", slug: "pay-day" },
    { name: "Trustbasket", slug: "trust-basket" },
    { name: "Swiftassist", slug: "swift-assist" },
    { name: "Mwallet", slug: "mwallet" },
  ];
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Workspaces</DialogTitle>
          <DialogDescription>Switch between workspaces</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {organizations.map((organization) => (
            <div
              key={organization.slug}
              className={`p-2 rounded-md cursor-pointer hover:bg-primary/90 ${
                currentWorkspace === organization.slug
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-white"
              }`}
              onClick={() => {
                setCurrentWorkspace(organization.slug);
                setOpen(false);
              }}
            >
              {organization.name}
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
