import homepage from "./homepage";
import blog from "./blog";
import landingPage from "./landingPage";
import courseCard from "./courseCard";
import universityCard from "./universityCard";
import {
  heroBlock, promiseBlock, pathBlock, programmesBlock,
  whyUsBlock, aiCounsellorBlock, howItWorksBlock, trustStripBlock,
  blogBlock, faqBlock, ctaBandBlock,
} from "./blocks";

export const schemaTypes = [
  homepage,
  blog,
  landingPage,
  courseCard,
  universityCard,
  // Page builder blocks
  heroBlock, promiseBlock, pathBlock, programmesBlock,
  whyUsBlock, aiCounsellorBlock, howItWorksBlock, trustStripBlock,
  blogBlock, faqBlock, ctaBandBlock,
];
