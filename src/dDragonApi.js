import axios from 'axios';

class DDragonApi{

    constructor() {
        this.#init();
    }

    static create(){
        return new DDragonApi();
    }

    async #init(){
        this.baseUrl = 'https://ddragon.leagueoflegends.com';
        this.instance = axios.create({
            baseURL:this.baseUrl,
        })
        this.region = 'ko_KR';
        await this.#getLatestVersion();
        await this.#getAllChampion();
        await this.#getSummonerSpells();
        await this.#getProfileIcons();
    }

    async #getLatestVersion(){
        const { data } = await this.instance.get(`${this.baseUrl}/api/versions.json`);
        this.version = data[0];
    }

    async #getAllChampion(){
        const {data:{data}} = await this.instance.get(`/cdn/${this.version}/data/${this.region}/champion.json`);
        this.allChampions = data;
    }

    async #getSummonerSpells(){
        this.summonerSpells = (await this.instance.get(`/cdn/${this.version}/data/${this.region}/summoner.json`)).data.data;
    }

    async #getProfileIcons(){
        this.profileIcons = (await this.instance.get(`/cdn/${this.version}/data/${this.region}/profileicon.json`)).data.data;
    }

    async getChampionNameByKey(key){
        if(!this.allChampions){
            await this.#init();
        }
        return Object.entries(this.allChampions).find(champion=>{
            const [champ, value] = champion;
            return value.key === key;
        })[0]
    }

    /*
    1. splash, loading 이미지는 스킨에 따라서 여러개가 있기 때문에 _숫자 형식이다.
    2. 또한 .jpg 로 고정이다.
    3. url에 version 이 없다.(과거 일러스트는 버리는 듯)
     */
    getChampionSplashImage(championName){
        return `${this.baseUrl}/cdn/img/champion/splash/${championName}_0.jpg`
    }

    getChampionLoadingImage(championName,idx){
        return `${this.baseUrl}/cdn/img/champion/loading/${championName}_${idx}.jpg`
    }

    /*
    1. square(초상화), passive, 스킬 이미지는 챔피언 데이터 내 파일명을 사용해야한다.
    2. url에 version 이 포함된다.
    3. 다 작은 엄지손가락만한 사이즈라는 공통점이 있다.
     */
    getChampionSquareImage(championPath){
        return `${this.baseUrl}/cdn/${this.version}/img/champion/${championPath}`
    }

    getChampionPassiveImage(passivePath){
        return `${this.baseUrl}/cdn/${this.version}/img/passive/${passivePath}`;
    }

    getSkillImage(skillPath){
        return `${this.baseUrl}/cdn/${this.version}/img/spell/${skillPath}`;
    }

    getSummonerSpellImage(spellPath){
        return `${this.baseUrl}/cdn/${this.version}/img/spell/${spellPath}`;
    }

    getProfileIconImage(profileIconPath){
        return `${this.baseUrl}/cdn/${this.version}/img/profileicon/${profileIconPath}`;
    }

    /*
    1. 개별 챔피언의 정본를 받아온다.
    2. 글귀가 있기 때문에 url에 언어가 포함된다.
    3. url에 version이 포함된다.
     */
    async getChampionData(championName){
        const {data:{data}} = await this.instance.get(`/cdn/${this.version}/data/${this.region}/champion/${championName}.json`);
        return data[championName];
    }



}

export default DDragonApi.create();