#!/usr/bin/env node

// @raycast.title Check Vaccination Slot
//
// @raycast.mode fullOutput
// @raycast.icon 🗓
// @raycast.schemaVersion 1

const puppeteer = require("puppeteer");

(async function () {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://vitemadose.covidtracker.fr/centres-vaccination-covid-dpt95-val_d_oise/commune95203-95600-eaubonne/recherche-dose_rappel/en-triant-par-distance"
  );
  await page.waitForNetworkIdle();
  await page.waitForFunction(() => {
    try {
      return document
        .querySelector("vmd-app")
        .shadowRoot.querySelector("vmd-rdv-par-commune")
        .shadowRoot.querySelector(".search-standard")
        .innerText.includes("créneaux de vaccination trouvés autour de");
    } catch (e) {
      return false;
    }
  });
  const results = await page.evaluate(() => {
    const cards = document
      .querySelector("vmd-app")
      .shadowRoot.querySelector("vmd-rdv-par-commune")
      .shadowRoot.querySelectorAll("vmd-appointment-card");
    return Array.from(cards)
      .map((card) => {
        const isPfizer = card.shadowRoot
          .querySelector("vmd-appointment-metadata[icon=vmdicon-syringe]")
          .querySelector(".text-description")
          .innerText.includes("Pfizer-BioNTech");
        if (!isPfizer) {
          return null;
        }
        const slot = card.shadowRoot
          .querySelector(".card-title.h5")
          .innerText.split(" ")[0];
        if (Number(slot) < 2) {
          return null;
        }
        const distance = card.shadowRoot
          .querySelector(".distance")
          .innerText.trim()
          .slice(2);
        const address = card.shadowRoot
          .querySelector("vmd-appointment-metadata[icon=vmdicon-geo-alt-fill]")
          .querySelector(".text-description").innerText;
        return { slot, distance, address };
      })
      .filter(Boolean);
  });
  console.log("# results", results);
  await browser.close();
})();
