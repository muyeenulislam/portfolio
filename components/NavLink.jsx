import Link from "next/link";
import { motion } from "framer-motion";

const variants = {
  default: { width: 0 },
  active: { width: "100%" },
};

const Navlink = ({ href, title, active }) => {
  const style = active
    ? "block py-2 pl-3 pr-4 text-primary-500 sm:text-xl rounded md:p-0  hover:text-primary-500 transition ease-in-out"
    : "block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0  hover:text-primary-500 transition ease-in-out";
  return (
    <Link href={href} className={style}>
      {title}
      <motion.div
        animate={active ? "active" : "default"}
        variants={variants}
        className="h-1 bg-primary-500 mt-2 mr-3"
      ></motion.div>
    </Link>
  );
};

export default Navlink;
