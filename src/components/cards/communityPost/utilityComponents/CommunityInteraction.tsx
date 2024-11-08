"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  MessageSquareText as CommentIcon,
  ThumbsUp as LikeIcon,
  Link as LinkIcon,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type TReactions = "like" | "love" | "wow" | "clap" | "helpful" | "inspiring";

const reactionList: Array<TReactions> = [
  "like",
  "love",
  "wow",
  "clap",
  "helpful",
  "inspiring",
] as const;

const reactionMap: Record<TReactions, string> = {
  like: "/reaction-icons/like.png",
  love: "/reaction-icons/love.png",
  wow: "/reaction-icons/wow.png",
  clap: "/reaction-icons/clap.png",
  helpful: "/reaction-icons/helpful.png",
  inspiring: "/reaction-icons/inspiring.png",
};

type TOnClick = () => void;

interface IActionButtonsList {
  id: string;
  Icon: LucideIcon;
  link?: string;
  onClick?: TOnClick;
}

const actionButtonsList: Array<IActionButtonsList> = [
  {
    id: "react",
    Icon: LikeIcon,
    onClick: () => console.log("Reacted"),
  },
  {
    id: "copy_list",
    Icon: LinkIcon,
    onClick: () => console.log("link copied"),
  },
  {
    id: "comment",
    Icon: CommentIcon,
    link: "/",
  },
] as const;

const CommunityInteraction = () => {
  const [activeReactionId, setActiveReactionId] = useState<TReactions | null>(
    null
  );

  console.log("activeReactionId initail state ===========");
  console.log(activeReactionId);

  const handleReactReaction = (reactionId?: TReactions) => () => {
    console.log("handleReactReaction ========");
    console.log({ reactionId });

    if (!reactionId) return setActiveReactionId(null);
    if (!reactionMap[reactionId]) return setActiveReactionId(null);

    return setActiveReactionId(reactionId);
  };

  return (
    <div className="flex flex-col gap-2 pt-2">
      <div className="flex gap-1 sm:gap-3 flex-col sm:flex-row items-center justify-center sm:justify-between flex-wrap">
        <Button variant="link" size={"sm"} className="text-xs px-0">
          <ReactionTypeAvatarList />
          50K
        </Button>
        <Button variant="link" size={"sm"} className="text-xs px-0">
          <CommentIcon /> 50K
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        {actionButtonsList.map(({ id, onClick, Icon, link }) => (
          <React.Fragment key={id}>
            {link ? (
              <Link href={link} className="w-full">
                <ActionButton Icon={Icon} />
              </Link>
            ) : id === "react" ? (
              <ReactPostActionButton
                activeReactionId={activeReactionId}
                handleReactReaction={handleReactReaction}
              />
            ) : (
              <ActionButton Icon={Icon} onClick={onClick} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const ActionButton = ({
  Icon,
  onClick,
}: {
  Icon: LucideIcon;
  onClick?: () => void;
}) => {
  return (
    <Button variant="outline" size="icon" onClick={onClick} fullWidth={true}>
      <Icon />
    </Button>
  );
};

const ReactPostActionButton = ({
  activeReactionId = null,
  handleReactReaction,
}: {
  activeReactionId: TReactions | null;
  handleReactReaction: (reactionId?: TReactions) => () => void;
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={
            activeReactionId
              ? handleReactReaction()
              : handleReactReaction("like")
          }
          fullWidth={true}
        >
          {activeReactionId ? (
            <Avatar className="cursor-pointer overflow-visible size-5">
              <AvatarImage src={reactionMap[activeReactionId]} />
              <AvatarFallback>{activeReactionId}</AvatarFallback>
            </Avatar>
          ) : (
            <LikeIcon />
          )}
        </Button>
      </HoverCardTrigger>
      <form>
        <HoverCardContent
          align="start"
          side="top"
          className="flex flex-wrap gap-x-2 gap-y-3 justify-between items-center w-fit p-3 max-w-40 sm:max-w-80"
        >
          <TooltipProvider>
            {reactionList.map((id) => (
              <Tooltip key={id}>
                <TooltipTrigger asChild>
                  <label htmlFor={id}>
                    <input
                      type="radio"
                      name="reaction"
                      hidden
                      id={id}
                      onChange={handleReactReaction(id)}
                    />
                    <Avatar className="transition-all duration-150 ease-out hover:scale-110 hover:rotate-12 cursor-pointer hover:animate-spin overflow-visible rounded-none size-7 sm:size-9">
                      <AvatarImage src={reactionMap[id]} />
                      <AvatarFallback>{id}</AvatarFallback>
                    </Avatar>
                  </label>
                </TooltipTrigger>
                <TooltipContent sideOffset={12}>
                  <p className="capitalize rounded-sm">{id}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </HoverCardContent>
      </form>
    </HoverCard>
  );
};

const ReactionTypeAvatarList = () => {
  return (
    <div className="flex items-center">
      {reactionList.map((id) => (
        <Avatar
          key={id}
          className="size-5 sm:size-6 -ml-1.5 sm:-ml-3 first:ml-0"
        >
          <AvatarImage
            src={reactionMap[id]}
            alt=""
            className="select-none size-full object-contain"
          />
          <AvatarFallback>DH</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
};

export default CommunityInteraction;
