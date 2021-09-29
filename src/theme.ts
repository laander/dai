import { mode, GlobalStyles } from "@chakra-ui/theme-tools";
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles: GlobalStyles = {
  global: (props) => ({
    body: {
      bg: mode("white", "gray.900")(props),
    },
    // scrollbar not working atm
    "::-webkit-scrollbar": {
      backgroundColor: mode("white", "gray.900")(props),
      width: "2",
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: mode("white", "gray.900")(props),
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: mode("gray.300", "gray.700")(props),
      borderRadius: "full",
    },
  }),
};

const fonts = {
  body: "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
  heading: "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
  mono: "Menlo, monospace",
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
  fonts,
  components: {
    Checkbox,
  },
});
export default theme;
