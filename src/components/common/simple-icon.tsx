import { cn } from "@/lib/utils";

interface SimpleIconProps extends React.SVGProps<SVGSVGElement> {
  iconName: string;
}

// A component to render an SVG icon from simple-icons
// It constructs the URL and uses an <img /> tag for simplicity.
export function SimpleIcon({ iconName, className, ...props }: SimpleIconProps) {
  const formattedIconName = iconName
    .toLowerCase()
    .replace(/ /g, '')
    .replace(/[#,+]/g, (char) => {
        const replacements: { [key: string]: string } = { '#': 'sharp', '+': 'plus', ',': '' };
        return replacements[char] || '';
    });
  
  const iconUrl = `https://cdn.simpleicons.org/${formattedIconName}/white`;

  return (
    <img 
      src={iconUrl} 
      alt={`${iconName} icon`} 
      className={cn("w-6 h-6", className)}
      // Simple trick to try to make the svg inherit the color. 
      // This won't work for all SVGs, but works for simple-icons.
      style={{ filter: 'brightness(0) saturate(100%) invert(var(--icon-invert-value, 1))' }}
      {...props} 
    />
  );
}
