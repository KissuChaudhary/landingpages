import { site } from "@/site.config";
import type { Brief } from "@/lib/contact";
export function BriefFields({
  brief,
  update,
  disabled,
}: {
  brief: Brief;
  update: (key: keyof Brief, value: string) => void;
  disabled: boolean;
}) {
  return (
    <fieldset disabled={disabled}>
      <legend className="sr-only">Your project details</legend>
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            placeholder="Alex Morgan"
            required
            maxLength={100}
            value={brief.name}
            onChange={(event) => update("name", event.target.value)}
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="alex@yourcompany.com"
            required
            maxLength={254}
            value={brief.email}
            onChange={(event) => update("email", event.target.value)}
          />
        </label>
      </div>
      <label>
        Company (optional)
        <input
          name="company"
          autoComplete="organization"
          placeholder="Your company or project"
          maxLength={150}
          value={brief.company}
          onChange={(event) => update("company", event.target.value)}
        />
      </label>
      <div className="form-row">
        <label>
          Your next challenge
          <select
            name="service"
            value={brief.service}
            onChange={(event) => update("service", event.target.value)}
          >
            <option value="">Let's figure it out</option>
            {site.services.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </select>
        </label>
        <label>
          Ways to work together
          <select
            name="engagement"
            value={brief.engagement}
            onChange={(event) => update("engagement", event.target.value)}
          >
            <option value="">Open to a conversation</option>
            {site.plans.map((plan) => (
              <option key={plan.id}>{plan.name}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Indicative budget
        <select
          name="budget"
          value={brief.budget}
          onChange={(event) => update("budget", event.target.value)}
        >
          <option value="">Let's discuss</option>
          <option>£3,000–£5,000</option>
          <option>£5,000–£10,000</option>
          <option>£10,000–£25,000</option>
          <option>£25,000+</option>
        </select>
      </label>
      <label>
        A little about your ambition
        <textarea
          name="message"
          placeholder="What are you building? What would you like to change? Tell us a little about your goals and timing."
          rows={5}
          required
          maxLength={5000}
          value={brief.message}
          onChange={(event) => update("message", event.target.value)}
        />
      </label>
    </fieldset>
  );
}
