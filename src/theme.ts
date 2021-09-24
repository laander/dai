import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const Checkbox = {
  variants: {
    round: {
      control: {
        borderRadius: "full",
      },
    },
  },
};

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: {
    Checkbox,
  },
});
export default theme;
