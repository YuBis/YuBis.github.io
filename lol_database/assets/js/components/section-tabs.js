(() => {
  window.LolDb = window.LolDb || {};
  window.LolDb.components = window.LolDb.components || {};

  window.LolDb.components.sectionTabs = {
    props: {
      activeSection: {
        type: String,
        required: true
      },
      championCount: {
        type: Number,
        required: true
      },
      itemCount: {
        type: Number,
        required: true
      },
      summonerCount: {
        type: Number,
        required: true
      },
      runeCount: {
        type: Number,
        required: true
      }
    },
    emits: ["change"],
    methods: {
      select(section) {
        this.$emit("change", section);
      }
    },
    template: `
      <nav class="tabs" aria-label="데이터 섹션">
        <button class="tab-btn" :class="{ active: activeSection === 'champions' }" @click="select('champions')">
          챔피언 <span>({{ championCount }})</span>
        </button>
        <button class="tab-btn" :class="{ active: activeSection === 'items' }" @click="select('items')">
          아이템 <span>({{ itemCount }})</span>
        </button>
        <button class="tab-btn" :class="{ active: activeSection === 'summoners' }" @click="select('summoners')">
          소환사 주문 <span>({{ summonerCount }})</span>
        </button>
        <button class="tab-btn" :class="{ active: activeSection === 'runes' }" @click="select('runes')">
          룬 <span>({{ runeCount }})</span>
        </button>
      </nav>
    `
  };
})();
