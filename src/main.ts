// For more information, see https://crawlee.dev/
import {
  CheerioCrawler,
  PuppeteerCrawler,
  log,
  Request,
  Dataset,
  RequestQueue,
  RequestHandler,
} from "crawlee";
import { router } from "./routes";

export const queue = await RequestQueue.open("exemplo");

const crawler = new CheerioCrawler({
  requestQueue: queue,
  minConcurrency: 2,
  requestHandler: router,
});

// const categories = [
//   new Request({
//     url: "http:categoria.com",
//     label: "extractLinksFromCategory",
//   }),
// ];

const extractCategories = new Request({
  url: "https://www.bandini.com.br/",
  label: "extractCategories",
});
// const riachuelo = new Request({
//   url: "https://www.riachuelo.com.br/busca?q=JEANS%20WIDE%20LEG",
//   label: "riachuelo",
// });

// const renner = new Request({
//   url: "https://www.lojasrenner.com.br/b?Ntt=JEANS%20WIDE%20LEG",
//   label: "renner",
// });

await queue.addRequests([extractCategories]);

await crawler.run().then((result) => {
  console.log(result);
});
