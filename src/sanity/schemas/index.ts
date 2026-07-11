import homepage from "./homepage";
import blog from "./blog";
import author from "./author";
import blogCategory from "./blogCategory";
import faq from "./faq";
import landingPage from "./landingPage";
import courseCard from "./courseCard";
import universityCard from "./universityCard";
import resourceItem from "./resourceItem";
import resourceDetail from "./resourceDetail";
import specializationsPage from "./specializationsPage";
import specializationDetail from "./specializationDetail";
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
  resourceItem,
  resourceDetail,
  specializationsPage,
  specializationDetail,
  // Page builder blocks
  heroBlock, promiseBlock, pathBlock, programmesBlock,
  whyUsBlock, aiCounsellorBlock, howItWorksBlock, trustStripBlock,
  blogBlock, faqBlock, ctaBandBlock,
];
