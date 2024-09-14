import{r as a,f as K,g as W,h as X,b as v,t as I,j as o,L as _,E as ee,R as se,v as w,n as oe,p as te,i as re,w as ne,l as ae,m as ie}from"./index-C1Md3IU_.js";import{u as me}from"./index.esm-CSBi2Yp2.js";import{B as ue}from"./index-DZXT9Nwh.js";import{S as ce}from"./Saving-5cbZdhLL.js";import{S as le}from"./SuccessNotification-BG_7mmcG.js";const Ie=()=>{const{register:n,handleSubmit:q,watch:g,setValue:u,formState:{errors:S}}=me(),[d,y]=a.useState(["headerTitle","aboutDescription","aboutImage"]),[s,$]=a.useState(null),{eventId:c}=K(),f=g("aboutImage");g("sponsorImage1"),g("sponsorImage2"),g("sponsorImage3"),g("sponsorImage4");const[j,b]=a.useState(),[F,ge]=a.useState();a.useState(),a.useState(),a.useState();const[D,R]=a.useState(!1),[Y,P]=a.useState(!0),[U,T]=a.useState(!1),[C,E]=a.useState(!1),[h,N]=a.useState({registrationSection:!1});a.useEffect(()=>{if(c){console.log("Fetching event data for ID:",c);const e=W();X(v(e,`events/${c}`)).then(t=>{if(console.log("Snapshot data:",t.val()),t.exists()){const r=t.val();$(r),Object.keys(r).forEach(i=>{if(i==="eventDate"){const m=I(r[i],"DD MMMM, YYYY").format("YYYY-MM-DD");u(i,m)}else if(i==="eventTime"){const m=I(r[i],"hh:mm A").format("HH:mm");u(i,m)}else u(i,r[i])}),r.aboutImage&&b(r.aboutImage)}else console.log("No data exists for this event ID:",c)}).catch(t=>{console.error("Error fetching event data:",t)})}},[c,u]),a.useEffect(()=>{if(f&&f[0]instanceof File){const e=f[0],t=new FileReader;t.onloadend=()=>{b(t.result)},t.readAsDataURL(e)}else s!=null&&s.aboutImage?b(s.aboutImage):b(null)},[f,s]),a.useEffect(()=>{const e=setTimeout(()=>{P(!1)},1e3);return()=>clearTimeout(e)},[]);const p=async(e,t)=>{const r=re(ne,t);return await ae(r,e),await ie(r)},A=async e=>{var t,r,i,m,L;R(!0);try{const l=[];let M=(s==null?void 0:s.aboutImage)||null;((t=e.aboutImage)==null?void 0:t[0])instanceof File&&(M=await p(e.aboutImage[0],`events/${e.aboutImage[0].name}`)),((r=e.sponsorImage1)==null?void 0:r[0])instanceof File&&l.push(p(e.sponsorImage1[0],`sponsors/${e.sponsorImage1[0].name}`)),((i=e.sponsorImage2)==null?void 0:i[0])instanceof File&&l.push(p(e.sponsorImage2[0],`sponsors/${e.sponsorImage2[0].name}`)),((m=e.sponsorImage3)==null?void 0:m[0])instanceof File&&l.push(p(e.sponsorImage3[0],`sponsors/${e.sponsorImage3[0].name}`)),((L=e.sponsorImage4)==null?void 0:L[0])instanceof File&&l.push(p(e.sponsorImage4[0],`sponsors/${e.sponsorImage4[0].name}`));const O=await Promise.all(l),[z,B,Z,Q]=O,G=I(e.eventDate).format("DD MMMM, YYYY"),J=I(e.eventTime,"HH:mm").format("hh:mm A"),k={...e,aboutImage:M,sponsorImage1:z||(s==null?void 0:s.sponsorImage1)||null,sponsorImage2:B||(s==null?void 0:s.sponsorImage2)||null,sponsorImage3:Z||(s==null?void 0:s.sponsorImage3)||null,sponsorImage4:Q||(s==null?void 0:s.sponsorImage4)||null,eventDate:G,eventTime:J},de=v(w,"events");if(c){const x=v(w,`events/${c}`);await oe(x,k)}else{const x=v(w,"events");await te(x,k)}T(!0)}catch(l){console.error("Error adding/updating event data: ",l),E(!0)}finally{R(!1)}};a.useEffect(()=>{n("aboutImage",{required:c?!1:"This field is required"}),n("sponsorImage1"),n("sponsorImage2"),n("sponsorImage3"),n("sponsorImage4")},[n,c]);const V=(e,t)=>{const r=new Set(d);e.every(m=>r.has(m))?(y(d.filter(m=>!e.includes(m))),N({...h,[t]:!1})):(y([...d,...e.filter(m=>!r.has(m))]),N({...h,[t]:!0}))};a.useEffect(()=>{h.registrationSection?(n("eligibility",{required:"This field is required"}),n("eventDate",{required:"This field is required"}),n("eventTime",{required:"This field is required"}),n("registrationFee",{required:"This field is required"}),n("registrationLink",{required:"This field is required"})):(u("eligibility",""),u("eventDate",""),u("eventTime",""),u("registrationFee",""),u("registrationLink",""))},[h,n,u]);const H={headerSection:["headerSubtitle"],featuresSection:["feature1","feature2","feature3","feature4"],sponsorsSection:["sponsor1","sponsorImage1","sponsor2","sponsorImage2","sponsor3","sponsorImage3","sponsor4","sponsorImage4"],rewardsSection:["studentReward1","studentReward2","studentReward3","schoolReward1","schoolReward2","schoolReward3"],aboutOrganizationSection:["organizationDescription"],advisorySection:["advisoryMember1","advisoryMemberDescription1","advisoryMember2","advisoryMemberDescription2","advisoryMember3","advisoryMemberDescription3","advisoryMember4","advisoryMemberDescription4"],registrationSection:["eligibility","eventDate","eventTime","registrationFee","registrationLink"]};return Y?o.jsx(_,{}):o.jsxs(o.Fragment,{children:[D&&o.jsx(ce,{}),o.jsxs("div",{className:"flex flex-col sm:flex-row",children:[U&&o.jsx(le,{message:"Event Created Successfully!",onClose:()=>T(!1)}),C&&o.jsx(ee,{message:"Something went wrong!",onClose:()=>E(!1)}),o.jsx("div",{className:"flex flex-col space-y-2 p-6 sm:w-1/3",children:Object.entries(H).map(([e,t])=>o.jsxs("button",{onClick:()=>V(t,e),className:`text-sm py-2 px-4 rounded transition duration-300 flex items-center gap-2 ${d.some(r=>t.includes(r))?"bg-red-500 hover:bg-red-700":"bg-blue-500 hover:bg-blue-700"} text-white`,children:[o.jsx(ue,{})," ",d.some(r=>t.includes(r))?"Remove":"Add"," ",e.replace(/([A-Z])/g," $1").replace("section"," Section")]},e))}),o.jsxs("form",{onSubmit:q(A),className:"p-6 bg-white shadow-lg rounded-lg flex-grow space-y-4 w-full sm:w-2/3",children:[o.jsx("h2",{className:"text-2xl font-bold text-indigo-600",children:"Event Details"}),d.map(e=>o.jsxs("div",{className:"relative",children:[o.jsxs("label",{className:"block text-sm font-medium text-gray-700 capitalize",children:[e.replace(/([A-Z])/g," $1"),["headerTitle","eligibility","eventDate","eventTime","registrationFee","registrationLink"].includes(e)&&o.jsx("span",{className:"text-red-500",children:" *"})]}),e==="eventDate"?o.jsx("input",{type:"date",...n("eventDate"),defaultValue:(s==null?void 0:s.eventDate)||"",className:"mt-1 block w-full pl-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"}):e==="eventTime"?o.jsx("input",{type:"time",...n("eventTime"),defaultValue:(s==null?void 0:s.eventTime)||"",className:"mt-1 block w-full pl-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"}):e==="registrationFee"?o.jsx("input",{type:"number",...n("registrationFee"),defaultValue:(s==null?void 0:s.registrationFee)||"",className:"mt-1 block w-full pl-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"}):e==="registrationLink"?o.jsx("input",{type:"url",...n("registrationLink"),defaultValue:(s==null?void 0:s.registrationLink)||"",className:"mt-1 block w-full pl-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"}):e==="aboutImage"||e.includes("sponsorImage")?o.jsxs("div",{children:[o.jsx("input",{type:"file",...n(e,{required:e==="aboutImage"&&!c?"This field is required":!1}),className:"mt-1 block w-full pl-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"}),e==="aboutImage"&&j&&o.jsx("img",{src:j,alt:"Preview",className:"mt-4 h-48 w-auto border rounded-md mx-auto"}),e==="sponsorImage1"&&F&&o.jsx("img",{src:F,alt:"Preview",className:"mt-4 h-48 w-auto border rounded-md mx-auto"})]}):o.jsx(se,{value:g(e)||(s==null?void 0:s[e])||"",onChange:t=>u(e,t),placeholder:`Enter ${e.replace(/([A-Z])/g," $1")}`}),S[e]&&o.jsx("p",{className:"mt-1 text-sm text-red-500",children:S[e].message})]},e)),o.jsx("button",{type:"submit",className:"w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded",children:"Submit Event Details"})]})]})]})};export{Ie as default};
