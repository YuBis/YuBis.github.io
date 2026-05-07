(() => {
  window.LolDb = window.LolDb || {};
  window.LolDb.components = window.LolDb.components || {};

  window.LolDb.components.itemsPanel = {
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
      items: {
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
            <h2 class="panel-title">아이템</h2>
            <p class="panel-hint">아이콘 클릭 시 이미지 URL 복사</p>
          </div>
          <label class="sr-only" for="itemSearch">아이템 검색</label>
          <input
            id="itemSearch"
            class="search-input"
            :value="searchQuery"
            @input="onInput"
            placeholder="아이템 이름(한/영) 검색"
          >
        </div>

        <div class="loading" v-if="loading">아이템 데이터 로딩 중...</div>
        <div class="empty" v-else-if="!items.length">검색 결과가 없습니다.</div>

        <div class="table-wrap" v-else>
          <table>
            <thead>
              <tr>
                <th>아이템</th>
                <th>설명</th>
                <th>비용</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>
                  <div class="entity-cell">
                    <img
                      class="entity-icon"
                      :src="item.iconUrl"
                      :alt="item.nameKo"
                      loading="lazy"
                      @click="onCopyAsset(item.iconUrl, item.nameKo + ' 아이템')"
                    >
                    <div class="name-wrap">
                      <strong class="name-ko">{{ item.nameKo }}</strong>
                      <span class="name-en">{{ item.nameEn }}</span>
                    </div>
                  </div>
                </td>
                <td class="desc" v-html="item.safeDescription"></td>
                <td>{{ item.totalGold.toLocaleString('ko-KR') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    `
  };
})();
