import {
  Dataset,
  createPuppeteerRouter,
  enqueueLinks,
  Request,
  RequestQueue,
  Router,
  CheerioCrawlingContext,
} from "crawlee";

import { queue } from "./main";

export const router = Router.create<CheerioCrawlingContext>();

// router.addDefaultHandler(async ({ enqueueLinks, log }) => {
//     log.info(`enqueueing new URLs`);
//     await enqueueLinks({
//         globs: ['https://crawlee.dev/**'],
//         label: 'detail',
//     });
// });

// class Record {
//   brand: any;
//   name: any;
//   currentPrice: any;
//   oldPrice: any;
//   url: any;
//   source: any;
//   createdAt: Date = new Date();
//   constructor({ brand, name, currentPrice, oldPrice, url, source }: any) {
//     this.brand = brand?.trim() || null;
//     this.name = name?.trim() || null;
//     this.currentPrice = currentPrice?.trim() || null;
//     this.oldPrice = oldPrice?.trim() || null;
//     this.url = url?.trim() || null;
//     this.source = source?.trim() || null;
//   }
// }

const SELECTORS = {
  categories: "div.content-nav > ul.list-nav > li > a",
  products: "div.showcase-catalog > ul.list > li > div  .image > a",
};

// router.addHandler(
//   "extractDetails",
//   async ({
//     request,
//     $,
//     log,
//     // enqueueLinksByClickingElements,
//     // infiniteScroll,
//   }) => {
//     console.log(`Processing ... ${request.url}`);
//   }
// );

router.addHandler("extractLinksFromCategory", async ({ request, $, log }) => {
  log.info(`Extracting products of ${request.url}`);
  const links = [];
  $(SELECTORS.products).each((_, product) => {
    const link = $(product).eq(0).attr("href");
    links.push(link);
  });
});

router.addHandler("extractCategories", async ({ request, $, log }) => {
  log.info(`Processing...${request.url}`);

  const links: any[] = [];

  $(SELECTORS.categories).each((_, category) => {
    const link: any = $(category).eq(0).attr("href");
    links.push(link);
  });

  const newRequests = links.map(
    (url) => new Request({ url, label: "extractCategories" })
  );

  queue.addRequests(newRequests);
});
