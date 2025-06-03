import { motion } from "motion/react"

export default function Skeleton({
  initialBackground = "var(--skeleton-background)",
  tintedBackground = "var(--skeleton-background-tinted)",
  className = "",
  ...props
}) {
  return <motion.div
    className={className}
    initial={{ backgroundColor: initialBackground }}
    animate={{
      backgroundColor: [initialBackground, tintedBackground, initialBackground]
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    {...props}
  />
}
