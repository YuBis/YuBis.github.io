(() => {
  window.LolDb = window.LolDb || {};
  window.LolDb.components = window.LolDb.components || {};

  window.LolDb.components.championsPanel = {
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      loading: {
        type: Boolean,
        required: true
      },
      searchQuery: {
        type: String,
        required: true
      },
      champions: {
        type: Array,
        required: true
      },
      onCopyAsset: {
        type: Function,
        required: true
      }
    },
    emits: ["search-change"],
    methods: {
      onInput(event) {
        this.$emit("search-change", event.target.value);
      }
    },
    template: `
      <section class="panel" v-show="visible">
        <div class="panel-top">
          <div>
            <h2 class="panel-title">챔피언 스킬 아이콘</h2>
            <p class="panel-hint">아이콘을 클릭하면 이미지 URL이 복사됩니다.</p>
          </div>
          <label class="sr-only" for="championSearch">챔피언 검색</label>
          <input
            id="championSearch"
            class="search-input"
            :value="searchQuery"
            @input="onInput"
            placeholder="챔피언 이름(한/영) 검색"
          >
        </div>

        <div class="loading" v-if="loading">챔피언 데이터 로딩 중...</div>
        <div class="empty" v-else-if="!champions.length">검색 결과가 없습니다.</div>

        <div class="champion-grid" v-else>
          <article class="champion-card" v-for="champion in champions" :key="champion.id">
            <div class="champ-head">
              <div class="champ-meta">
                <img
                  class="champ-icon"
                  :src="champion.iconUrl"
                  :alt="champion.nameKo + ' 아이콘'"
                  loading="lazy"
                  @click="onCopyAsset(champion.iconUrl, champion.nameKo + ' 챔피언')"
                >
                <div class="name-wrap">
                  <strong class="name-ko">{{ champion.nameKo }}</strong>
                  <span class="name-en">{{ champion.nameEn }}</span>
                </div>
              </div>
              <button class="mini-btn" @click="onCopyAsset(champion.iconUrl, champion.nameKo + ' 챔피언')">아이콘 복사</button>
            </div>

            <div class="ability-grid">
              <button
                class="ability-btn"
                v-for="ability in champion.abilities"
                :key="champion.id + '-' + ability.key"
                @click="onCopyAsset(ability.iconUrl, champion.nameKo + ' ' + ability.key)"
                :title="ability.nameKo + ' / ' + ability.nameEn"
              >
                <img :src="ability.iconUrl" :alt="ability.nameKo" loading="lazy">
                <span class="ability-key">{{ ability.key }}</span>
                <span class="ability-name">{{ ability.nameKo }}</span>
              </button>
            </div>
          </article>
        </div>
      </section>
    `
  };
})();
