import { Shop, Trash } from "iconsax-reactjs";
import React from "react";
import { Button } from "./ui/button";

export default function WorkspaceItem({
  workspace,
  currentWorkspace,
  toggleSwitchWorkspace,
  isSwitchingWorkspace,
  toggleDeleteWorkspace,
  isDeletingWorkspace,
}: {
  workspace: {
    id: string;
    name: string;
    slug: string;
    socialProfiles: any[];
    createdAt: string;
  };
  currentWorkspace: string;
  toggleSwitchWorkspace: (workspaceId: string) => void;
  isSwitchingWorkspace: boolean;
  toggleDeleteWorkspace: (workspaceId: string) => void;
  isDeletingWorkspace: boolean;
}) {
  return (
    <div
      key={workspace.slug}
      onClick={() => toggleSwitchWorkspace(workspace.id)}
      className={`px-2 py-5 rounded-md cursor-pointer hover:bg-primary/90 ${
        currentWorkspace === workspace.id
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-white bg-primary/30"
      }`}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Shop size={18} variant="Bold" />
          <p className="text-sm font-medium">{workspace.name} workspace</p>
        </div>

        {currentWorkspace !== workspace.id && (
          <div>
            <Button
              className="p-0 w-5 h-5 bg-transparent hover:bg-transparent"
              variant={"destructive"}
              onClick={(e) => {
                e.stopPropagation();
                toggleDeleteWorkspace(workspace.id);
              }}
            >
              <Trash size={18} variant="Bold" color="#9f0712" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
