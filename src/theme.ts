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
    "::-webkit-scrollbar": {
      backgroundColor: mode("transparent", "transparent")(props),
      width: "2",
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: mode("transparent", "transparent")(props),
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: mode("gray.100", "whiteAlpha.100")(props),
      borderRadius: "full",
    },
  }),
};

const fonts = {
  body: "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
  heading: "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
  mono: "Menlo, monospace",
};

const colors = {
  gray: {
    "50": "#EDEFF0",
    "100": "#D8DBDE",
    "200": "#C0C4C9",
    "300": "#A7ACB4",
    "400": "#8E959F",
    "500": "#757E8A",
    "600": "#5E656E",
    "700": "#464C53",
    "800": "#232629",
    "900": "#17191C",
  },
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
  colors,
  components: {
    Checkbox,
  },
});
export default theme;
