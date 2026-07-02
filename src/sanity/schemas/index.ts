import homepage from "./homepage";
import blog from "./blog";
import college from "./college";
import course from "./course";
import exam from "./exam";
import scholarship from "./scholarship";
import testimonial from "./testimonial";
import faq from "./faq";
import navigationMenu from "./navigationMenu";
import footerSettings from "./footerSettings";
import seoSettings from "./seoSettings";
import globalSettings from "./globalSettings";
import landingPage from "./landingPage";
import programmeGrid from "./programmeGrid";
import page from "./page";
import {
  heroBlock, promiseBlock, pathBlock, programmesBlock,
  whyUsBlock, aiCounsellorBlock, howItWorksBlock, trustStripBlock,
  blogBlock, faqBlock, ctaBandBlock,
} from "./blocks";

export const schemaTypes = [
  homepage,
  blog,
  college,
  course,
  exam,
  scholarship,
  testimonial,
  faq,
  navigationMenu,
  footerSettings,
  seoSettings,
  globalSettings,
  landingPage,
  programmeGrid,
  page,
  // Page builder blocks
  heroBlock, promiseBlock, pathBlock, programmesBlock,
  whyUsBlock, aiCounsellorBlock, howItWorksBlock, trustStripBlock,
  blogBlock, faqBlock, ctaBandBlock,
];
