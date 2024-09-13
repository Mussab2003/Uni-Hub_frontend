'use client'
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";
import Image from "next/image";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  
  useEffect(() => setMounted(true), []);
  console.log(mounted);
  if (!mounted) {
    return (
      <Image
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13a WR0aD0iMCIgdmlld0JveD0iMCAWIDIOIDIOIiBoZWlnaHQ9IjIwMHB4IiB3aW R0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI +PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxs PSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc +Cg=="
        width={36}
        height={36}
        sizes="36x36"
        alt="Loading Light / Dark Toggle"
        priority={false}
        title="Loading Light / Dark Toggle"
      />
    );
  }
  if (resolvedTheme == "dark") {
    return <FiSun size={30} onClick={() => setTheme('light')}/>;
  }

  if (resolvedTheme == "light") {
    return <FiMoon size={30}  onClick={() => setTheme('dark')}/>;
  }
}
