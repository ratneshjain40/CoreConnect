import React from 'react';

import {
  IoMenu,
  IoSearch,
  IoCalendar,
  IoChevronUp,
  IoLogoGoogle,
  IoChevronDown,
  IoChevronBack,
  IoImageOutline,
  IoSettingsSharp,
  IoChevronForward,
  IoWarningOutline,
  IoCheckmarkCircleOutline,
} from 'react-icons/io5';
import { RxMixerHorizontal } from 'react-icons/rx';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { SiGmail, SiLinkedin, SiGoogleanalytics } from 'react-icons/si';
import { FaFacebookSquare, FaUserNinja, FaBlog, FaRegEdit } from 'react-icons/fa';
import {
  MdMenuBook,
  MdEventNote,
  MdErrorOutline,
  MdDeleteForever,
  MdOutlineAddCircle,
  MdOutlineFileDownload,
} from 'react-icons/md';

type IconProps = {
  name: keyof typeof ICONS;
  className?: string;
};

export const ICONS = {
  blog: FaBlog,
  gmail: SiGmail,
  edit: FaRegEdit,
  search: IoSearch,
  hamburger: IoMenu,
  user: FaUserNinja,
  course: MdMenuBook,
  event: MdEventNote,
  linkedin: SiLinkedin,
  calendar: IoCalendar,
  google: IoLogoGoogle,
  error: MdErrorOutline,
  image: IoImageOutline,
  chevronUp: IoChevronUp,
  add: MdOutlineAddCircle,
  delete: MdDeleteForever,
  filterArrowUp: BsArrowUp,
  mixer: RxMixerHorizontal,
  warning: IoWarningOutline,
  settings: IoSettingsSharp,
  facebook: FaFacebookSquare,
  chevronDown: IoChevronDown,
  chevronBack: IoChevronBack,
  filterArrowDown: BsArrowDown,
  analytics: SiGoogleanalytics,
  download: MdOutlineFileDownload,
  check: IoCheckmarkCircleOutline,
  chevronForward: IoChevronForward,
  doubleChevronsLeft: FiChevronsLeft,
  doubleChevronsRight: FiChevronsRight,
} as const;

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  const Component = ICONS[name];

  if (!Component) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <Component className={className} />;
};
