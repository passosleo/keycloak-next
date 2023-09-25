import { twMerge } from "tailwind-merge";

type Props = React.ComponentProps<"button"> & {
  color?: "red" | "blue";
};

export function Button({
  className,
  color = "blue",
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={twMerge(
        "text-white p-3 rounded-lg shadow-lg",
        color === "red" ? "bg-red-600" : "bg-blue-600",
        className
      )}
    >
      {children}
    </button>
  );
}
