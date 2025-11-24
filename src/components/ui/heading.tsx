import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  type: "h1" | "h2" | "h3" | "h4";
  title?: string;
  className?: string;
}>;

export const BaseHeadingStyles = {
  "card-heading": "text-2xl md:text-3xl lg:text-5xl",
};

const Heading = ({ type, title, className, children }: Props) => {
  const CMP = type;
  return (
    <CMP className={cn("font-extrabold text-center", className)}>
      {title || children}
    </CMP>
  );
};

export default Heading;
