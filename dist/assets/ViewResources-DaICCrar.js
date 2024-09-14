import{r as a,u as N,g,b as f,o as w,d as D,j as t,L as E,e as R}from"./index-C1Md3IU_.js";const S=()=>{const[n,i]=a.useState([]),[h,c]=a.useState(!0),[d,b]=a.useState(null),[o,u]=a.useState(!1),v=N();a.useEffect(()=>{const e=g(),s=f(e,"resources"),l=w(s,r=>{const x=r.val()||{},y=Object.keys(x).map(m=>({id:m,...x[m]}));i(y),c(!1)},r=>{console.error(r),b("Failed to fetch resources"),c(!1)});return()=>D(s,"value",l)},[]);const j=e=>{v(`/admin/forms/resource/edit/${e}`)},p=async e=>{u(!0);try{const s=g(),l=f(s,`resources/${e}`);await R(l),alert("Resource deleted successfully!"),i(n.filter(r=>r.id!==e))}catch(s){console.error("Error deleting resource:",s),alert("Failed to delete resource.")}finally{u(!1)}};return h?t.jsx(E,{}):d?t.jsxs("div",{className:"text-center text-red-500 mt-10",children:["Error: ",d]}):t.jsxs("div",{className:"relative mx-auto py-12 px-6 bg-gradient-to-br from-blue-100 to-indigo-200 min-h-screen",children:[t.jsx("h1",{className:"text-4xl font-bold mb-12 text-indigo-900 text-center",children:"Resource Documents"}),t.jsx("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:n.map(e=>t.jsx("div",{className:"relative bg-white border border-gray-300 p-6 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-2xl",children:t.jsxs("div",{className:"flex flex-col justify-between h-full",children:[t.jsx("p",{className:"text-lg font-semibold text-gray-800",children:e.title}),t.jsx("div",{className:"text-sm text-gray-600 mt-2",dangerouslySetInnerHTML:{__html:e.description}}),t.jsx("a",{href:e.link,target:"_blank",rel:"noopener noreferrer",className:"mt-4 text-blue-600 hover:text-blue-800 transition duration-300",children:"View Document"}),t.jsxs("div",{className:"flex justify-between mt-4",children:[t.jsx("button",{onClick:()=>j(e.id),className:"bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded",children:"Edit"}),t.jsx("button",{onClick:()=>p(e.id),className:`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded ${o?"opacity-50":""}`,disabled:o,children:o?"Deleting...":"Delete"})]})]})},e.id))})]})};export{S as default};
