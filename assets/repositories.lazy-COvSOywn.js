import{f as n,j as t,t as e,g as u,B as p}from"./index-DzgnhqOz.js";const o=({title:r,subtitle:i,repositories:l})=>{const c=a.useRouteContext().lang;return t.jsx("div",{className:"col-12",children:t.jsx(u,{title:r,subTitle:i,className:"m-2 ml-6",style:{width:"90%"},children:l.map(s=>t.jsxs("div",{className:"flex align-items-center flex-wrap vertical-align-middle flex-row",children:[t.jsx("div",{children:t.jsx(p,{"data-testid":s.id?`repositoryLink${s.id} `:void 0,onClick:()=>window.open(s.url,"_blank"),text:!0,children:s.url.split("/").pop()})}),t.jsx("div",{children:e(s.about,c)})]},`repLine${Math.round(Math.random()*1e6)}`))},`repCard${Math.round(Math.random()*1e6)}`)})},a=n("/it/repositories")({component:()=>{const i=a.useRouteContext().lang;return t.jsxs(t.Fragment,{children:[t.jsx("h1",{className:"w-full pl-3","data-testid":"title",children:e("Code repositories",i)}),t.jsxs("div",{className:"grid flex-grow-1 overflow-y-visible bg-white min-w-0 min-h-0 w-full",children:[t.jsx(o,{title:e("This site",i),repositories:[{id:1,about:"repositories.thisSite.about",url:"https://github.com/cvdsfif/cvdsfif.github.io"}]}),t.jsx("br",{}),t.jsx(o,{title:e("Telegram bots examples",i),subtitle:e("repositories.tgbot.subtitle",i),repositories:[{about:"repositories.tgbot.plain",url:"https://github.com/cvdsfif/tg-cdk-plain"},{about:"repositories.tgbot.lib",url:"https://github.com/cvdsfif/tg-cdk-lib"}]}),t.jsx(o,{title:e("Typizator",i),subtitle:e("repositories.typizator.subtitle",i),repositories:[{about:"repositories.typizator.about",url:"https://github.com/cvdsfif/typizator"},{about:"repositories.typizator-handler.about",url:"https://github.com/cvdsfif/typizator-handler"},{about:"repositories.cdk-typescript-lib.about",url:"https://github.com/cvdsfif/cdk-typescript-lib"},{about:"repositories.typizator-client.about",url:"https://github.com/cvdsfif/typizator-client"},{about:"repositories.typizator-test.about",url:"https://github.com/cvdsfif/typizator-test"}]})]})]})}});export{a as Route};