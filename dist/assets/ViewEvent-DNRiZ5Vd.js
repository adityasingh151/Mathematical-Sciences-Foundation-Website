import{r as s,g as m,b as f,o as S,j as e,L as M,q as D,e as L,B as k}from"./index-C1Md3IU_.js";import{M as T}from"./Modal-DhpaDZAq.js";const $=()=>{const[d,r]=s.useState([]),[h,g]=s.useState(!0),[c,p]=s.useState(null),[b,n]=s.useState(!1),[y,j]=s.useState(""),[o,a]=s.useState({show:!1,message:"",type:""});s.useEffect(()=>{const t=m(),i=f(t,"events");return S(i,C=>{const l=C.val(),E=l?Object.keys(l).map(x=>({id:x,...l[x]})):[];r(E),g(!1)},{onlyOnce:!0}),()=>{}},[]);const v=async()=>{const t=m();await L(f(t,`events/${c.id}`)),n(!1),r(d.filter(i=>i.id!==c.id)),a({show:!0,message:"Event deleted successfully!",type:"success"}),setTimeout(()=>a({show:!1,message:"",type:""}),3e3)},w=t=>{p(t),j(`Are you sure you want to delete the event: ${t.headerTitle}?`),n(!0)},N=t=>{window.location.href=`/admin/forms/event/edit/${t.id}`},u=t=>({__html:k.sanitize(t)});return h?e.jsx(M,{}):e.jsxs("div",{className:"container mx-auto p-4",children:[e.jsx("h1",{className:"text-3xl font-bold mb-8 text-center",children:"Events"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:d.map(t=>e.jsxs("div",{className:"bg-white shadow-md rounded-lg p-6 flex flex-col justify-between",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-semibold mb-2 text-gray-800 ",dangerouslySetInnerHTML:u(t.headerTitle)}),e.jsx("div",{className:"text-gray-600 ql-editor",dangerouslySetInnerHTML:u(t.aboutDescription)})]}),e.jsxs("div",{className:"mt-4 flex justify-end space-x-2",children:[e.jsx("button",{onClick:()=>N(t),className:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300",children:"Edit"}),e.jsx("button",{onClick:()=>w(t),className:"bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300",children:"Delete"})]})]},t.id))}),e.jsxs(T,{isOpen:b,title:"Confirm Deletion",onClose:()=>n(!1),children:[e.jsx("p",{children:y}),e.jsxs("div",{className:"mt-4 flex justify-end space-x-2",children:[e.jsx("button",{onClick:v,className:"bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition duration-300",children:"Confirm"}),e.jsx("button",{onClick:()=>n(!1),className:"bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded transition duration-300",children:"Cancel"})]})]}),o.show&&e.jsx(D,{message:o.message,type:o.type,onClose:()=>a({show:!1,message:"",type:""})})]})};export{$ as default};
