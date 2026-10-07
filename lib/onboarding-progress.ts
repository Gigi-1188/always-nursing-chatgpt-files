import {sectionCompletion,submissionErrors,type ApplicationData,annualExpiry} from './onboarding.ts';
import {coreRequirements,type Compliance} from './workflow.ts';
export function onboardingProgress(data:ApplicationData,kinds:string[],submitted:boolean,compliance:Compliance|null,hired:boolean,now=Date.now()){
 const sections=sectionCompletion(data,kinds,now);
 const verified=!!compliance&&['RN','LPN','CNA'].includes(compliance.role)&&compliance.states.length>0&&coreRequirements.every(k=>Number.isFinite(compliance.expires[k])&&compliance.expires[k]>=now)&&['tb','bls','physical'].every(k=>{const date=compliance.issuedDates?.[k]||'';return annualExpiry(date)>=now&&Date.parse(date+'T00:00:00Z')<=now});
 return [...sections.map((s,i)=>({label:`${i+1}. ${s.name}`,done:s.missing.length===0,note:s.coveredByResume?'Covered By Your Uploaded Résumé':''})),{label:'8. Sign Applicant Certification',done:submissionErrors(data,kinds,now).length===0,note:''},{label:'9. Submit For Agency Review',done:submitted,note:'Submit Your Completed, Signed Application.'},{label:'10. Agency Verifies Credentials',done:verified,note:'Always Nursing Reviews Your Current Credentials.'},{label:'11. Agency Approves Hiring',done:hired,note:'Wait For Always Nursing Hiring Approval.'}];
}
