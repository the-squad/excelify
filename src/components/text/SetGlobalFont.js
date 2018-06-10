import { injectGlobal } from 'styled-components';

/**
 * Using system font stack as a fallback is fonts took too much time to load or failed ot load
 */
const systemFontsStack =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

/**
 * Injecting global font family to all HTML nodes
 */
const setGlobalFonts = () => injectGlobal`
* {
  font-family: Roboto, ${systemFontsStack};
}
`;

export default setGlobalFonts;
