import {
  CreditCardTerminalImg,
  MobileCardReaderImg,
  OnlineProcessingImg,
  SupportServiceImg,
} from "@/assets/Images";
import { RouteConfig } from "./routes";

export const SOLUTIONS_MENU = [
  {
    href: RouteConfig.CreditCard,
    title: "solutions.credit-card.title",
    replaceTitle: "solutions.credit-card.secondTitle",
    description: "solutions.credit-card.desc",
    src: CreditCardTerminalImg,
  },
  {
    href: RouteConfig.MobileCard,
    title: "solutions.mobile-card.title",
    description: "solutions.mobile-card.desc",
    src: MobileCardReaderImg,
  },
  {
    href: RouteConfig.OnlineProcessing,
    title: "solutions.online-processing.title",
    description: "solutions.online-processing.desc",
    src: OnlineProcessingImg,
  },
  {
    href: RouteConfig.SupportService,
    title: "solutions.support.title",
    description: "solutions.support.desc",
    src: SupportServiceImg,
  },
];
