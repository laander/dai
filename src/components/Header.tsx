import { ButtonGroup, IconButton } from "@chakra-ui/button";
import { ArrowSmLeftIcon, ArrowSmRightIcon } from "@heroicons/react/outline";
import { Flex } from "@chakra-ui/layout";
import { useHotkeys } from "react-hotkeys-hook";
import { Tooltip } from "@chakra-ui/tooltip";
import { memo } from "react";

type HeaderProps = {
  canUndo: boolean;
  canRedo: boolean;
  triggerUndo: () => void;
  triggerRedo: () => void;
};

const Header = memo(function Header({
  canUndo,
  canRedo,
  triggerUndo,
  triggerRedo,
}: HeaderProps) {
  useHotkeys(
    "cmd+z",
    () => {
      if (canUndo) triggerUndo();
    },
    [canUndo, triggerUndo]
  );
  useHotkeys(
    "cmd+shift+z",
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
});

export default Header;
