import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  SvgProps,
} from "react-native-svg";

export const Star: React.FC<
  {
    strokeColor?: string;
    strokeWidth?: number;
    color?: string;
    size?: number;
    percision?: number;
  } & SvgProps
> = ({
  strokeColor = "#F4BF2A",
  strokeWidth = 0.7,
  color = "#F4BF2A",
  size = 24,
  percision = 0.5,
  ...props
}) => {
  const actualPercision = Math.max(0, Math.min(percision + 0.085 - 0.1, 1));
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M11.8868 1.73645L14.9748 8.38564L15.0919 8.63794L15.3681 8.67141L22.6461 9.55348L17.2765 14.545L17.0728 14.7344L17.1263 15.0074L18.5364 22.2017L12.1299 18.6374L11.8868 18.5022L11.6438 18.6374L5.23727 22.2017L6.64739 15.0074L6.70089 14.7344L6.49715 14.545L1.12762 9.55349L8.40559 8.67141L8.68175 8.63794L8.79892 8.38564L11.8868 1.73645Z"
        fill="url(#paint0_linear_302_586)"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_302_586"
          x1={-0.613159}
          y1={13.0494}
          x2={24.3868}
          y2={13.0494}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={actualPercision} stopColor={color} />
          <Stop
            offset={actualPercision + 0.07}
            stopColor="white"
            stopOpacity={0}
          />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default { Star };
