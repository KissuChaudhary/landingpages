"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/site.config";
import { calculateQuote, money } from "@/lib/quote";
import { useBrief } from "@/components/BriefProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Investment() {
  const { options, update } = useBrief();
  const quote = calculateQuote(options);
  return (
    <section className="investment-section" id="investment">
      <div className="container">
        <Reveal>
          <SectionHeading {...site.pricing} />
        </Reveal>
        <div className="quote-grid">
          <div className="quote-options">
            <fieldset>
              <legend className="eyebrow">01 / Choose your direction</legend>
              <div className="format-options">
                {site.pricing.formats.map((format) => (
                  <label
                    key={format.id}
                    className={`format-option ${options.format === format.id ? "is-selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="shoot-format"
                      value={format.id}
                      checked={options.format === format.id}
                      onChange={() => update({ format: format.id })}
                    />
                    <span className="radio-mark" aria-hidden="true" />
                    <span>
                      <strong>{format.name}</strong>
                      <small>{format.description}</small>
                    </span>
                    <span className="format-count">
                      {format.imagesPerProduct} images / product
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="product-control">
              <legend className="eyebrow">02 / How many products?</legend>
              <div className="range-heading">
                <label htmlFor="product-count">Products in this shoot</label>
                <output htmlFor="product-count">
                  {options.products.toString().padStart(2, "0")}
                </output>
              </div>
              <input
                id="product-count"
                type="range"
                min="1"
                max={site.pricing.maxProducts}
                value={options.products}
                onChange={(event) =>
                  update({ products: Number(event.target.value) })
                }
              />
              <div className="range-labels">
                <span>1 product</span>
                <span>{site.pricing.maxProducts} products</span>
              </div>
            </fieldset>
            <fieldset className="extra-options">
              <legend className="eyebrow">03 / The finishing touches</legend>
              <label>
                <input
                  type="checkbox"
                  checked={options.social}
                  onChange={(event) => update({ social: event.target.checked })}
                />
                <span>
                  <strong>{site.pricing.extras.social.label}</strong>
                  <small>{site.pricing.extras.social.description}</small>
                </span>
                <span>{money(site.pricing.extras.social.price)}</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={options.rush}
                  onChange={(event) => update({ rush: event.target.checked })}
                />
                <span>
                  <strong>{site.pricing.extras.rush.label}</strong>
                  <small>{site.pricing.extras.rush.description}</small>
                </span>
                <span>+{site.pricing.extras.rush.rate * 100}%</span>
              </label>
            </fieldset>
          </div>
          <aside className="quote-summary" aria-label="Your shoot estimate">
            <div className="quote-summary-top">
              <p className="eyebrow">Your starting point</p>
              <span className="eyebrow">USD</span>
            </div>
            <p className="quote-name">{quote.format.name}</p>
            <div className="quote-total" aria-live="polite" aria-atomic="true">
              <span>{money(quote.total)}</span>
              <p>
                {quote.images} final images / {quote.products}{" "}
                {quote.products === 1 ? "product" : "products"}
              </p>
            </div>
            <dl className="quote-breakdown">
              <div>
                <dt>Creative setup</dt>
                <dd>{money(quote.format.setup)}</dd>
              </div>
              <div>
                <dt>
                  {quote.images} images × {money(quote.format.perImage)}
                </dt>
                <dd>{money(quote.imageCost)}</dd>
              </div>
              {options.social && (
                <div>
                  <dt>Social crops</dt>
                  <dd>{money(quote.socialCost)}</dd>
                </div>
              )}
              {options.rush && (
                <div>
                  <dt>Priority production</dt>
                  <dd>{money(quote.rushCost)}</dd>
                </div>
              )}
              <div className="quote-turnaround">
                <dt>Typical production</dt>
                <dd>
                  {options.rush
                    ? "Confirmed with your brief"
                    : quote.format.turnaround}
                </dd>
              </div>
            </dl>
            <ul className="quote-included">
              {site.pricing.included.map((item) => (
                <li key={item}>
                  <Check size={14} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Button href="#contact" light>
              {site.pricing.cta}
            </Button>
            <p className="quote-note">{site.pricing.note}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
