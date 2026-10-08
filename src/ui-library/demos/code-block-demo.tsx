'use client';

import React, { useEffect, useState } from 'react';
import { CodeBlock } from '../registry/code-block';

const QUEUE = `// Estimate how long each order in the queue will wait.
export function withWaitTimes(orders: Order[], now = Date.now()) {
  const perScoop = 40_000; // ms, measured on a busy Saturday
  let ahead = 0;

  return orders.map((order) => {
    const scoops = order.items.reduce((n, item) => n + item.scoops, 0);
    ahead += scoops * perScoop;
    return { ...order, readyAt: new Date(now + ahead), waitMinutes: Math.ceil(ahead / 60_000) };
  });
}`;

const CHURN = `import math
from dataclasses import dataclass


@dataclass
class Flavour:
    name: str
    litres_per_hour: float  # sold on an average Saturday
    batch_litres: float = 6.0


# Plan how many batches to churn before opening.
def churn_plan(flavours: list[Flavour], open_hours: float = 10) -> dict[str, int]:
    plan = {}
    for flavour in flavours:
        needed = flavour.litres_per_hour * open_hours * 1.15  # 15% headroom
        plan[flavour.name] = math.ceil(needed / flavour.batch_litres)
    return plan


if __name__ == "__main__":
    menu = [
        Flavour("pistachio", 4.2),
        Flavour("strawberry", 3.1),
        Flavour("salted caramel", 3.6),
        Flavour("lemon sorbet", 1.8, batch_litres=5.0),
        Flavour("dark chocolate", 2.9),
    ]
    for name, batches in churn_plan(menu).items():
        print(f"{name:>16}: {batches} batches")`;

export default function CodeBlockDemo({ tab = 'Streaming' }: { tab?: string }) {
  const [shown, setShown] = useState(tab === 'Streaming' ? '' : QUEUE);
  const streaming = tab === 'Streaming' && shown.length < QUEUE.length;

  // A stand-in for a model writing code: a few characters at a time, at an uneven pace.
  useEffect(() => {
    if (tab !== 'Streaming') return;
    let i = 0;
    let timer = 0;
    const step = () => {
      i = Math.min(QUEUE.length, i + 3 + Math.floor(Math.random() * 6));
      setShown(QUEUE.slice(0, i));
      if (i < QUEUE.length) timer = window.setTimeout(step, 28);
    };
    timer = window.setTimeout(step, 300);
    return () => window.clearTimeout(timer);
  }, [tab]);

  return (
    <div className="w-full max-w-[560px]">
      {tab === 'Folded' ? (
        <CodeBlock code={CHURN} language="python" filename="churn_plan.py" />
      ) : (
        <CodeBlock
          code={shown}
          language="ts"
          filename="lib/queue.ts"
          streaming={streaming}
          onApply={tab === 'Apply' ? () => new Promise((resolve) => window.setTimeout(resolve, 900)) : undefined}
        />
      )}
    </div>
  );
}
