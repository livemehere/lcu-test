import React, {useEffect, useState} from 'react';
import dDragonApi from './dDragonApi.js';
import For from "./components/For";
import ReactTooltip from 'react-tooltip';

function App() {
  const [champ, setChamp] = useState<any>();
  const [id,setId]=useState('');

  useEffect(()=>{
      if(!id) return;
    (async ()=>{
      const champName = await dDragonApi.getChampionNameByKey(id);
      const champData = await dDragonApi.getChampionData(champName);
      console.log(champData)
      setChamp(champData);

    })()
  },[id])


  return (
    <div className='app'>
        <input type="text" value={id} onChange={(e)=> setId(e.target.value)}/>
        {champ && (
            <main>
              <div className="cover">
                <img src={dDragonApi.getChampionSplashImage(champ.id)} alt="cover-image"/>
                <h1 >{champ.name}</h1>
              </div>
                <details open>
                  <summary>스토리</summary>
                  <p>{champ.lore}</p>
                </details>
                <h4>사용 팁</h4>
                <For items={champ.allytips} className='tips'/>
                <hr/>
                <h4>상대 팁</h4>
                <For items={champ.enemytips}/>
                <h4>스탯</h4>
                <section className="stats">
                  {Object.entries(champ.info).map((item,idx)=>{
                    return <div key={idx}><>{item[0]} : {item[1]}</></div>
                  })}
                </section>
              <section className="squre">
                <img src={dDragonApi.getChampionSquareImage(champ.image.full)} alt=""/>
              </section>
              <h4>패시브 : {champ.passive.name}</h4>
                <section className="passive">
                  <img src={dDragonApi.getChampionPassiveImage(champ.passive.image.full)} alt=""/>
                  <p>{champ.passive.description}</p>
                </section>
              <h4>스킬</h4>
              <section className="skills">
                {champ.spells.map((spell:any)=><div className='skill' data-tip={spell.description}>
                  <img src={dDragonApi.getSkillImage(spell.image.full)} alt=""/>
                  <p>{spell.name}</p>
                </div>)}
              </section>
              <h4>스킨</h4>
              <section className="skins">
                {champ.skins.map((skin:any,idx:number)=><div className='skin'>
                  <img src={dDragonApi.getChampionLoadingImage(champ.id, idx)} alt={skin.name}/>
                  <p>{skin.name}</p>
                </div>)}
              </section>
              <hr/>
              <h4>소환사 스펠</h4>
              <section className="spells">
                {Object.entries(dDragonApi.summonerSpells).map((spell:any,idx)=><div className='spell' data-tip={spell[1].description}>
                  <img src={dDragonApi.getSummonerSpellImage(spell[1].image.full)} alt=""/>
                  <p>{spell[1].name}</p>
                </div>)}
              </section>
              <h4>소환사 아이콘</h4>
              <section className="icons">
                {Object.entries(dDragonApi.profileIcons).slice(0,50).map((icon:any,idx)=><div className='icon'>
                  <img src={dDragonApi.getProfileIconImage(icon[1].image.full)} alt=""/>
                </div>)}
              </section>
              <ReactTooltip  />
            </main>
        )}
    </div>
  );
}

export default App;
