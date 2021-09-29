import { ButtonGroup, IconButton } from "@chakra-ui/button";
import {
  ArrowSmLeftIcon,
  ArrowSmRightIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/outline";
import { Flex } from "@chakra-ui/layout";
import { useHotkeys } from "react-hotkeys-hook";
import { Tooltip } from "@chakra-ui/tooltip";
import { memo } from "react";
import { Keys } from "../constants/hotkeys";
import { Spacer, useColorMode } from "@chakra-ui/react";

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
  const { colorMode, toggleColorMode } = useColorMode();

  useHotkeys(
    Keys.UNDO,
    () => {
      if (canUndo) triggerUndo();
    },
    [canUndo, triggerUndo]
  );
  useHotkeys(
    Keys.REDO,
    () => {
      if (canRedo) triggerRedo();
    },
    [canRedo, triggerRedo]
  );
  useHotkeys(
    Keys.TOGGLE_THEME,
    () => {
      toggleColorMode();
    },
    [toggleColorMode]
  );

  return (
    <Flex>
      <ButtonGroup>
        <Tooltip label="Undo" size="sm" placement="right">
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
        <Tooltip label="Redo" size="sm" placement="right">
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
      <Spacer />
      <Tooltip label="Toggle theme" size="sm" placement="left">
        <IconButton
          aria-label="theme"
          onClick={toggleColorMode}
          icon={
            colorMode === "dark" ? (
              <MoonIcon height="18" />
            ) : (
              <SunIcon height="18" />
            )
          }
          size="sm"
        >
          Theme
        </IconButton>
      </Tooltip>
    </Flex>
  );
});

export default Header;
