"use client";

import React, { useState } from "react";
import AvatarActionButton from "@/components/navbar/right/avatar/AvatarActionButton";
import {
  TvMinimalPlay as ChannelIcon,
  ChevronRight as ArrowIcon,
  Plus as AddIcon,
  Eye as ViewAllChannelIcon,
} from "lucide-react";
import AvatarPopoverChannelList from "@/components/navbar/right/avatar/AvatarPopoverChannelList";

const ChannelActionList = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleToggleButton = () => setOpen((prev) => !prev);

  return (
    <div className="flex flex-col">
      <AvatarActionButton
        label="Channels"
        Icon={ChannelIcon}
        IndicatorIcon={ArrowIcon}
        onClick={handleToggleButton}
      />
      {isOpen && (
        <div className="flex flex-col">
          <AvatarPopoverChannelList />
          <AvatarActionButton
            label="view all channel"
            Icon={ViewAllChannelIcon}
            link="/"
            havePrefix
          />
          <AvatarActionButton
            label="Create Channel"
            Icon={AddIcon}
            link="/"
            havePrefix
          />
        </div>
      )}
    </div>
  );
};

export default ChannelActionList;
