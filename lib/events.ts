export const EVENTS=['thursday_morning','thursday_party','friday_dinner','saturday_afternoon'] as const;
export type EventKey=typeof EVENTS[number];
export const defaults:Record<string,EventKey[]>={FULL:[...EVENTS],SOIREE:['thursday_morning','thursday_party'],OFFICES:['thursday_morning']};
export function allowed(formula:string,flags:Record<string,unknown>){const initial=new Set(defaults[formula.toUpperCase()]||defaults.OFFICES);for(const e of EVENTS){const v=flags[e];if(v===true)initial.add(e);if(v===false)initial.delete(e);}return [...initial];}
