"use client";
import { ArrowUpRight, Check, FileText } from "lucide-react";
import { useRelay } from "@/components/RelayProvider";
import { Mark } from "@/components/ui/Brand";
import { getScenario, prepareResult } from "@/data/scenarios";
import { site } from "@/site.config";

export function HeroScene() {
  const { assistant, explore } = useRelay();
  const scenario = getScenario(assistant.id);
  const result = prepareResult(scenario.id, scenario.defaults);
  return (
    <div className="hero-scene grid-inner">
      <div className="scene-conversation">
        <div className="scene-question"><span>You</span><p>{scenario.request}</p></div>
        <div className="scene-answer">
          <div className="scene-avatar"><Mark /></div>
          <div className="scene-response">
            <span className="scene-author">Relay <span>Let’s make it happen.</span></span>
            <h2>{result.title}</h2>
            <p>{result.introduction}</p>
            <div className="scene-steps">
              {result.items.map(item => <div className="scene-step" key={item.title}><Check size={16}/><span>{item.title}</span></div>)}
            </div>
            <div className="scene-response-footer"><span><FileText size={14}/> Prepared example</span><button onClick={() => explore(scenario.id)}>Make it yours <ArrowUpRight size={15}/></button></div>
          </div>
        </div>
      </div>
      <div className="scene-options" role="group" aria-label="Preview a Relay example">
        {site.workspace.tabs.map(tab => <button key={tab.id} aria-pressed={assistant.id === tab.id} onClick={() => assistant.choose(tab.id)}>{tab.label}<ArrowUpRight size={15}/></button>)}
      </div>
    </div>
  );
}
