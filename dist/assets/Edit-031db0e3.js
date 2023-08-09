import{c as u,d as k,r as n,j as e,A as c}from"./index-07b8d0e5.js";import{B as p}from"./Button-6349ddeb.js";const z=async r=>{try{const a=await u({url:"/mypage/update",method:"GET",headers:{Authorization:r}});return a.data.data?a.data.data:null}catch(a){return console.error(a),null}},A=async(r,a)=>{try{const s=new FormData;s.append("file",a);const l=await u({url:"/mypage/update/image",method:"POST",headers:{Authorization:r},data:s});return l.data.data?l.data.data:null}catch(s){return console.error(s),null}},U=async(r,a,s)=>{try{const l={};a!==null&&(l.fullName=a),s!==null&&(l.password=s);const i=await u({url:"/mypage/update",method:"POST",headers:{Authorization:r},data:l});return i.data.data?i.data.data:null}catch(l){return console.error(l),null}};function T(){const[r]=k([c]),[a,s]=n.useState(""),[l,i]=n.useState(""),[d,j]=n.useState(""),[m,N]=n.useState(""),[f,x]=n.useState(null),[h,g]=n.useState(null);n.useEffect(()=>{async function t(){try{const o=await z(r[c]);o&&(s(o.fullName),i(o.email),x(o.profileImage))}catch(o){console.error("프로필 정보 가져오기 오류:",o)}}t()},[r]);const y=t=>{s(t.target.value)},v=t=>{j(t.target.value)},P=t=>{N(t.target.value)},C=t=>{if(t.target.files&&t.target.files[0]){const o=t.target.files[0];g(o);const b=new FileReader;b.onload=S=>{var w;const F=(w=S.target)==null?void 0:w.result;x(F)},b.readAsDataURL(o)}},I=async()=>{alert("회원 정보 수정이 취소되었습니다.")},E=async()=>{try{if(!d||!m){alert("비밀번호와 비밀번호 확인을 모두 입력해주세요.");return}if(d!==m){alert("비밀번호가 일치하지 않습니다.");return}if(d.length<8||!/[!@#$%^&*()_+{}[\]:;<>,.?~\-=/\\]/.test(d)){alert("비밀번호는 특수문자를 포함하고, 최소 8자 이상 입력해주세요.");return}await U(r[c],a,d),h&&await A(r[c],h),alert("회원정보 수정이 완료되었습니다."),x(null),g(null)}catch(t){console.error("에러 발생:",t)}};return e.jsxs("div",{className:"flex flex-col ml-4 p-4 h-screen",children:[e.jsx("h1",{className:"text-3xl font-bold border-b-2 pb-2 mb-8",children:"회원정보 수정"}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"w-24 h-24 mb-10 flex items-center justify-center overflow-hidden rounded-full",children:f!==null?e.jsx("img",{src:f,alt:"Profile Image"}):e.jsx("div",{children:"프로필 이미지 없음"})}),e.jsx(p,{text:"수정",size:"sm",className:"bg-point text-white rounded ml-8",onClick:()=>{var t;(t=document.getElementById("profile-image-input"))==null||t.click()}}),e.jsx("input",{type:"file",id:"profile-image-input",accept:"image/*",style:{display:"none"},onChange:C})]}),e.jsxs("div",{className:"grid grid-cols-3 grid-rows-4 min-w-[720px] max-w-[1392px]",children:[e.jsx("div",{className:"row-span-2 flex items-start border-t border-gray-300 bg-boxbg pl-4 pt-2",children:e.jsx("label",{htmlFor:"name",className:"text-sm font-medium",children:"계정"})}),e.jsx("div",{className:"flex flex-col mb-4 items-start border-t border-gray-300 pl-4 pt-2",children:e.jsx("label",{htmlFor:"name",className:"text-sm font-medium",children:"이름"})}),e.jsx("div",{className:"flex flex-col mb-4 items-start border-t border-gray-300 pl-4 pt-2",children:e.jsx("div",{className:"flex items-center",children:e.jsx("input",{type:"text",id:"name",value:a,onChange:y,className:"border p-2 rounded mr-2",style:{width:"250px"}})})}),e.jsx("div",{className:"flex flex-col mb-4 items-start col-start-2 row-start-2 pl-4 pt-2",children:e.jsx("label",{htmlFor:"email",className:"text-sm font-medium",children:"이메일"})}),e.jsxs("div",{className:"flex flex-col mb-4 items-start col-start-3 row-start-2 pl-4 pt-2",children:[e.jsx("p",{children:l})," "]}),e.jsx("div",{className:"flex flex-col mb-4 items-start row-span-2 row-start-3 border-t border-b border-gray-300 bg-boxbg pl-4 pt-2",children:e.jsx("label",{htmlFor:"newPassword",className:"text-sm font-medium",children:"비밀번호"})}),e.jsx("div",{className:"flex flex-col mb-4 items-start row-start-3 border-t border-gray-300 pl-4 pt-2",children:e.jsx("label",{htmlFor:"newPassword",className:"text-sm font-medium",children:"비밀번호"})}),e.jsx("div",{className:"flex flex-col mb-4 items-start row-start-3 border-t border-gray-300 pl-4 pt-2",children:e.jsx("div",{className:"flex items-center",children:e.jsx("input",{type:"password",id:"newPassword",value:d,onChange:v,className:"border p-2 rounded mr-2",style:{width:"250px"},placeholder:"특수문자를 포함, 최소 8자 이상"})})}),e.jsx("div",{className:"flex flex-col mb-4 items-start col-start-2 row-start-4 border-b border-gray-300 pl-4 pt-2",children:e.jsx("label",{htmlFor:"confirmPassword",className:"text-sm font-medium",children:"비밀번호 확인"})}),e.jsx("div",{className:"flex flex-col mb-4 items-start col-start-3 row-start-4 border-b border-gray-300 pl-4 pt-2",children:e.jsx("div",{className:"flex items-center",children:e.jsx("input",{type:"password",id:"confirmPassword",value:m,onChange:P,className:"border p-2 rounded mr-2",style:{width:"250px"},placeholder:"특수문자를 포함, 최소 8자 이상"})})})]}),e.jsxs("div",{className:"flex justify-center",children:[e.jsx(p,{text:"취소",size:"lg",onClick:I,className:"w-[150px] px-4 py-2 mr-2 bg-point text-white rounded"}),e.jsx(p,{text:"수정 완료",size:"lg",onClick:E,className:"w-[150px] px-4 py-2 bg-main text-white rounded"})]})]})}export{T as default};
