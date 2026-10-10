"use client";
/** Every digit remains mounted; only its position changes. */
export function NumberRoll({ value }: { value: number }) {
  const text = value.toLocaleString("en-US");
  return (
    <span className="number-roll" aria-label={`$${text}`}>
      <span aria-hidden="true">$</span>
      <span aria-hidden="true" className="number-digits">
        {text.split("").map((char, i) =>
          /\d/.test(char) ? (
            <span className="digit-window" key={i}>
              <span
                className="digit-strip"
                style={{ transform: `translateY(-${Number(char) * 10}%)` }}
              >
                {Array.from({ length: 10 }, (_, n) => (
                  <span key={n}>{n}</span>
                ))}
              </span>
            </span>
          ) : (
            <span key={i}>{char}</span>
          ),
        )}
      </span>
    </span>
  );
}
