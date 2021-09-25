import { mode, GlobalStyles } from "@chakra-ui/theme-tools";
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles: GlobalStyles = {
  global: (props) => ({
    body: {
      bg: mode("gray.100", "gray.900")(props),
    },
    // scrollbar not working atm
    "::-webkit-scrollbar-track-piece": {
      backgroundColor: mode("gray.100", "gray.900")(props),
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: mode("gray.300", "gray.700")(props),
    },
  }),
};

const Checkbox = {
  variants: {
    round: {
      control: {
        borderRadius: "full",
      },
    },
  },
};

const theme = extendTheme({
  config,
  styles,
  components: {
    Checkbox,
  },
});
export default theme;
