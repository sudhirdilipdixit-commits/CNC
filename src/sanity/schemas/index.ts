import homepage from "./homepage";
import blog from "./blog";
import landingPage from "./landingPage";
import programmeGrid from "./programmeGrid";
import {
  heroBlock, promiseBlock, pathBlock, programmesBlock,
  whyUsBlock, aiCounsellorBlock, howItWorksBlock, trustStripBlock,
  blogBlock, faqBlock, ctaBandBlock,
} from "./blocks";

export const schemaTypes = [
  homepage,
  blog,
  landingPage,
  programmeGrid,
  // Page builder blocks
  heroBlock, promiseBlock, pathBlock, programmesBlock,
  whyUsBlock, aiCounsellorBlock, howItWorksBlock, trustStripBlock,
  blogBlock, faqBlock, ctaBandBlock,
];
