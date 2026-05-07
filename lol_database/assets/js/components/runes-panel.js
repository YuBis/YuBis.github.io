(() => {
  window.LolDb = window.LolDb || {};
  window.LolDb.components = window.LolDb.components || {};

  window.LolDb.components.runesPanel = {
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
      runePaths: {
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
            <h2 class="panel-title">룬</h2>
            <p class="panel-hint">룬 아이콘 클릭 시 이미지 URL 복사</p>
          </div>
          <label class="sr-only" for="runeSearch">룬 검색</label>
          <input
            id="runeSearch"
            class="search-input"
            :value="searchQuery"
            @input="onInput"
            placeholder="룬 이름(한/영) 검색"
          >
        </div>

        <div class="loading" v-if="loading">룬 데이터 로딩 중...</div>
        <div class="empty" v-else-if="!runePaths.length">검색 결과가 없습니다.</div>

        <div class="rune-grid" v-else>
          <article class="rune-path" v-for="path in runePaths" :key="path.id">
            <h3 class="rune-path-title">
              <span>{{ path.nameKo }}</span>
              <small>{{ path.nameEn }}</small>
            </h3>
            <div class="rune-list">
              <button
                class="rune-item"
                v-for="rune in path.runes"
                :key="rune.id"
                :title="rune.nameKo + ' / ' + rune.nameEn"
                @click="onCopyAsset(rune.iconUrl, rune.nameKo + ' 룬')"
              >
                <img :src="rune.iconUrl" :alt="rune.nameKo" loading="lazy">
                <div class="rune-name">
                  <strong>{{ rune.nameKo }}</strong>
                  <span>{{ rune.nameEn }}</span>
                </div>
              </button>
            </div>
          </article>
        </div>
      </section>
    `
  };
})();
