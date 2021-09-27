import { ButtonGroup, IconButton } from "@chakra-ui/button";
import { ArrowSmLeftIcon, ArrowSmRightIcon } from "@heroicons/react/outline";
import { Flex } from "@chakra-ui/layout";
import { useHotkeys } from "react-hotkeys-hook";
import { Tooltip } from "@chakra-ui/tooltip";

type HeaderProps = {
  canUndo: boolean;
  canRedo: boolean;
  triggerUndo: () => void;
  triggerRedo: () => void;
};

export default function Header({
  canUndo,
  canRedo,
  triggerUndo,
  triggerRedo,
}: HeaderProps) {
  useHotkeys(
    "left",
    () => {
      if (canUndo) triggerUndo();
    },
    [canUndo, triggerUndo]
  );
  useHotkeys(
    "z",
    () => {
      if (canUndo) triggerUndo();
    },
    [canUndo, triggerUndo]
  );
  useHotkeys(
    "right",
    () => {
      if (canRedo) triggerRedo();
    },
    [canRedo, triggerRedo]
  );
  useHotkeys(
    "x",
    () => {
      if (canRedo) triggerRedo();
    },
    [canRedo, triggerRedo]
  );

  return (
    <Flex>
      <ButtonGroup>
        <Tooltip label="Undo" size="sm">
          <IconButton
            aria-label="undo"
            disabled={!canUndo}
            onClick={triggerUndo}
            size="sm"
            icon={<ArrowSmLeftIcon height="22" />}
          >
            Undo
          </IconButton>
        </Tooltip>
        <Tooltip label="Redo" size="sm">
          <IconButton
            aria-label="redo"
            disabled={!canRedo}
            onClick={triggerRedo}
            icon={<ArrowSmRightIcon height="22" />}
            size="sm"
          >
            Redo
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    </Flex>
  );
}
