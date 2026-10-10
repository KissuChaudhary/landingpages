import { Check, ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { bookingHref } from "@/lib/urls";
import { SectionHead } from "@/components/ui/Primitives";
import { AccountScene } from "@/components/product/AccountScene";
import { FollowupScene } from "@/components/product/FollowupScene";
import { RenewalScene } from "@/components/product/RenewalScene";
const scenes = [AccountScene, FollowupScene, RenewalScene];
export function ProductStory() {
  return (
    <section className="product-story section frame" id="product">
      <SectionHead {...site.product} />
      <div className="story-stack">
        {site.product.items.map((item, index) => {
          const Scene = scenes[index];
          return (
            <article className={`story-panel story-${item.id}`} key={item.id}>
              <div className="story-copy">
                <span className="eyebrow">
                  <i />
                  {item.label}
                </span>
                <h3>
                  {item.title.split("\n").map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h3>
                <p>{item.text}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>
                      <Check size={14} />
                      {point}
                    </li>
                  ))}
                </ul>
                <a className="text-link" href={bookingHref()}>
                  See how it comes together
                  <ArrowUpRight size={15} />
                </a>
              </div>
              <div className="story-visual">
                <div className="scene-surround">
                  <Scene />
                </div>
                <span className="scene-example">
                  A small view of a better everyday · Example data
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
