'use client';
import {useState} from 'react';
type Lang='fr'|'en'|'he';
const photos=[{"file": "01.jpg", "caption": "La famille de Lenny avec Nany & Dady"}, {"file": "02.jpg", "caption": "Elsa & Tata Didi"}, {"file": "03.jpg", "caption": "Jonah & Ella, les rois du déguisement !"}, {"file": "04.jpg", "caption": "La cousinade"}, {"file": "05.jpg", "caption": "La descendance de Nany et Dady au complet !"}, {"file": "06.jpg", "caption": "La descendance de Nany et Dady au complet !"}, {"file": "07.jpg", "caption": "Matteo & Maya, sensations fortes"}, {"file": "08.jpg", "caption": "Les Mani & les Cohen au Canada"}, {"file": "09.jpg", "caption": "Les cousins : Elsa, Maya, Emma, Eva & Alon"}, {"file": "10.jpg", "caption": "Les retrouvailles familiales à Paris"}, {"file": "11.jpg", "caption": "La famille Touati"}, {"file": "12.jpg", "caption": "Malorie, Tata Mag & Bruno"}, {"file": "13.jpg", "caption": "Tonton Jéjé au Louvre"}, {"file": "14.jpg", "caption": "Nany & Dady"}, {"file": "15.jpg", "caption": "Tata Mag, Tal & Tonton Dédé à Hollywood"}, {"file": "16.jpg", "caption": "Léana, Lenny, Tal, Etty & Papou"}, {"file": "17.jpg", "caption": "Tonton Dédé et les raananiens"}, {"file": "18.jpg", "caption": "Tal, Lenny & Papou"}, {"file": "19.jpg", "caption": "Pessah a strasbourg"}, {"file": "20.jpg", "caption": "Enrico Macias & Tonton Dédé"}];
const photo=(name:string)=>`/api/gallery/${name}`;
type FamilyCard={name:string;image:string;children?:string;childImage?:string;note?:string};
const mani:FamilyCard[]=[
 {name:'Jérémie (Jéjé) & Magalie',image:'jeje-mag.jpg',children:'Matteo · Maya · Emma',childImage:'mani-kids.jpg'},
 {name:'Mélanie (Didi) & Micha',image:'didi-micha.jpg',children:'Elsa · Eva · Alon',childImage:'cohen-kids.jpg'},
 {name:'Lorelie (Lolo) & Julien',image:'11.jpg',children:'Jonah · Ella',note:'Les Touati'},
];
const dreyfus:FamilyCard[]=[{name:'André (Dédé) & Mag',image:'dede-mag.jpg',children:'Tal',childImage:'tal.jpg'}];
function Portrait({name,image,note,highlight=false}:{name:string,image:string,note?:string,highlight?:boolean}){
 return <div className={'v8Person'+(highlight?' v8Highlight':'')}><img src={photo(image)} alt={name} loading="lazy"/><strong>{name}</strong>{note&&<span>{note}</span>}</div>;
}
function Branch({card}:{card:FamilyCard}){
 return <div className="v8Branch"><Portrait name={card.name} image={card.image} note={card.note}/>{card.children&&<><div className="v8Stem"/>{card.childImage?<Portrait name={card.children} image={card.childImage} note="Les enfants"/>:<div className="v8Kids"><Portrait name="Jonah" image="jonah.jpg"/><Portrait name="Ella" image="ella.jpg"/></div>}</>}</div>;
}
function UnifiedTree({lang}:{lang:Lang}){
 return <div className="v8Tree" aria-label="Arbre généalogique des familles Mani et Dreyfus">
  <p className="v8TreeIntro">{lang==='fr'?'Deux familles, une histoire, et Lenny au cœur de tout.':lang==='en'?'Two families, one story, with Lenny at its heart.':'שתי משפחות, סיפור אחד, ולני בלב הכול.'}</p>
  <div className="v8Families">
   <div className="v8Side"><h3>La famille Mani</h3><div className="v8Ancestors"><Portrait name="Nany & Dady" image="14.jpg" note="Les grands-parents maternels"/></div><div className="v8Stem"/><div className="v8SideBranches">{mani.map(card=><Branch card={card} key={card.name}/>)}</div></div>
   <div className="v8Side"><h3>La famille Dreyfus</h3><div className="v8Ancestors"><Portrait name="Mamie Monique ❤️" image="monique.jpg" note="À sa mémoire"/><Portrait name="Papou (Henri) & Ita" image="papou-ita.jpg" note="Grand-père et sa compagne"/></div><div className="v8Stem"/><div className="v8SideBranches">{dreyfus.map(card=><Branch card={card} key={card.name}/>)}</div></div>
  </div>
  <div className="v8Join"><span>♥</span><span>Le lien entre les deux familles</span></div>
  <div className="v8Center"><Portrait name="Bruno & Malorie" image="bruno-malorie.jpg" note="Les parents de Lenny" highlight/><div className="v8Stem"/><Portrait name="Léana · Etty · 🦁 Lenny" image="dreyfus-kids.jpg" note="La famille Dreyfus, nouvelle génération" highlight/></div>
  <p className="v8TreeFoot">{lang==='fr'?'Les photos et les liens familiaux sont réservés aux invités identifiés.':lang==='en'?'Family photos and relationships are available to identified guests only.':'תמונות וקשרים משפחתיים זמינים לאורחים מזוהים בלבד.'}</p>
 </div>;
}
export default function FamilyGallery({lang}:{lang:Lang}){
 const [tab,setTab]=useState<'tree'|'photos'>('tree');
 const [chosen,setChosen]=useState<number|null>(null);
 return <section className="familyPrivate" id="famille">
 <div className="eyebrow">✦ PRIVATE FAMILY CLUB ✦</div>
 <h2>{lang==='he'?'המשפחה שלנו':lang==='en'?'Meet the family':'La famille, toute une histoire'}</h2>
 <p>{lang==='fr'?'Réservé à nos invités. Les visages, les souvenirs et notre grande tribu.':lang==='en'?'Only for our guests. Faces, memories and our family tree.':'לאורחים שלנו בלבד: תמונות, זיכרונות ועץ המשפחה.'}</p>
 <div className="familyTabs"><button className={tab==='tree'?'active':''} onClick={()=>setTab('tree')}>🌳 {lang==='en'?'Our family tree':lang==='he'?'עץ המשפחה':'Notre arbre généalogique'}</button><button className={tab==='photos'?'active':''} onClick={()=>setTab('photos')}>📸 Album</button></div>
 {tab==='tree'?<UnifiedTree lang={lang}/>:<div className="familyPhotoGrid">{photos.map((item,i)=><button className="familyPhoto" key={item.file} onClick={()=>setChosen(i)}><img src={photo(item.file)} alt={item.caption} loading="lazy"/><span>{item.caption}</span></button>)}</div>}
 {chosen!==null&&<div className="photoModal" role="dialog" aria-modal="true" onClick={()=>setChosen(null)}><button className="closeModal" onClick={()=>setChosen(null)} aria-label="Fermer">✕</button><img src={photo(photos[chosen].file)} alt={photos[chosen].caption}/><p>{photos[chosen].caption}</p></div>}
 </section>;
}
