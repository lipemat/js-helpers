# colors

Convert between hex and RGB color formats and measure perceived lightness.

## Exports

### `hexToRGB( hex, alpha? ): string`

Convert a hex color to an `rgb()` string, or `rgba()` when `alpha` is provided. Non-hex input is returned unchanged.

### `RGBToHex( rgb ): string`

Convert an `rgb()`/`rgba()` string to a hex color. Input already starting with `#` is returned unchanged. Returns `''` if it cannot be parsed.

### `getLightness( hexOrRGB ): number`

Return the relative luminance of a hex or `rgb()` color as a number between `0` and `1`. `> 0.5` is light, `<= 0.5` is dark.

## Usage

```ts
import {hexToRGB, RGBToHex, getLightness} from '@lipemat/js-helpers';

hexToRGB( '#fff' ); // 'rgb(255, 255, 255)'
hexToRGB( '#000', 0.5 ); // 'rgba(0, 0, 0, 0.5)'
RGBToHex( 'rgb(255, 255, 255)' ); // '#ffffff'
getLightness( '#ffffff' ); // 1
```
