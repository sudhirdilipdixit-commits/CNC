import homepage from "./homepage";
import blog from "./blog";
import author from "./author";
import blogCategory from "./blogCategory";
import faq from "./faq";
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
  author,
  blogCategory,
  faq,
  landingPage,
  courseCard,
  universityCard,
  // Page builder blocks
  heroBlock, promiseBlock, pathBlock, programmesBlock,
  whyUsBlock, aiCounsellorBlock, howItWorksBlock, trustStripBlock,
  blogBlock, faqBlock, ctaBandBlock,
];
