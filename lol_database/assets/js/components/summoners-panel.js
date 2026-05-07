(() => {
  window.LolDb = window.LolDb || {};
  window.LolDb.components = window.LolDb.components || {};

  window.LolDb.components.summonersPanel = {
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
      summoners: {
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
            <h2 class="panel-title">소환사 주문</h2>
            <p class="panel-hint">아이콘 클릭 시 이미지 URL 복사</p>
          </div>
          <label class="sr-only" for="summonerSearch">소환사 주문 검색</label>
          <input
            id="summonerSearch"
            class="search-input"
            :value="searchQuery"
            @input="onInput"
            placeholder="소환사 주문 검색"
          >
        </div>

        <div class="loading" v-if="loading">소환사 주문 데이터 로딩 중...</div>
        <div class="empty" v-else-if="!summoners.length">검색 결과가 없습니다.</div>

        <div class="table-wrap" v-else>
          <table>
            <thead>
              <tr>
                <th>소환사 주문</th>
                <th>설명</th>
                <th>재사용 대기시간</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="spell in summoners" :key="spell.id">
                <td>
                  <div class="entity-cell">
                    <img
                      class="entity-icon"
                      :src="spell.iconUrl"
                      :alt="spell.nameKo"
                      loading="lazy"
                      @click="onCopyAsset(spell.iconUrl, spell.nameKo + ' 주문')"
                    >
                    <div class="name-wrap">
                      <strong class="name-ko">{{ spell.nameKo }}</strong>
                      <span class="name-en">{{ spell.nameEn }}</span>
                    </div>
                  </div>
                </td>
                <td class="desc" v-html="spell.safeDescription"></td>
                <td>{{ spell.cooldownText }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    `
  };
})();
