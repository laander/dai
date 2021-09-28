import { mode, GlobalStyles } from "@chakra-ui/theme-tools";
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
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

const colors = {
  gray: {
    50: "#FCFCFC",
    100: "#F7F7F7",
    200: "#F0F0F0",
    300: "#E0E0E0",
    400: "#BFBFBF",
    500: "#969696",
    600: "#696969",
    700: "#474747",
    800: "#282828",
    900: "#1E1E1E",
  },
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
  colors,
  fonts,
  components: {
    Checkbox,
  },
});
export default theme;
