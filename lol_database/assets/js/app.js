(() => {
  const { createApp } = Vue;
  const { API, UI, MESSAGE } = window.LolDb.constants;
  const { normalize, matchQuery, copyTextToClipboard, formatLoadedAt } = window.LolDb.helpers;
  const dataService = window.LolDb.dataService;
  const uiComponents = window.LolDb.components || {};

  createApp({
    components: {
      "section-tabs": uiComponents.sectionTabs,
      "champions-panel": uiComponents.championsPanel,
      "items-panel": uiComponents.itemsPanel,
      "summoners-panel": uiComponents.summonersPanel,
      "runes-panel": uiComponents.runesPanel
    },
    data() {
      return {
        patchVersion: "",
        lastLoadedAt: "",
        activeSection: "champions",
        champions: [],
        items: [],
        summoners: [],
        runePaths: [],
        search: {
          champions: "",
          items: "",
          summoners: "",
          runes: ""
        },
        loading: {
          global: false,
          champions: false,
          items: false,
          summoners: false,
          runes: false
        },
        errors: [],
        toast: {
          visible: false,
          message: "",
          kind: "success"
        },
        toastTimer: null
      };
    },
    computed: {
      runeCount() {
        return this.runePaths.reduce((total, path) => total + path.runes.length, 0);
      },
      filteredChampions() {
        const query = normalize(this.search.champions);
        if (!query) {
          return this.champions;
        }

        return this.champions.filter((champion) => {
          return matchQuery([champion.nameKo, champion.nameEn], query);
        });
      },
      filteredItems() {
        const query = normalize(this.search.items);
        if (!query) {
          return this.items;
        }

        return this.items.filter((item) => {
          return matchQuery([item.nameKo, item.nameEn], query);
        });
      },
      filteredSummoners() {
        const query = normalize(this.search.summoners);
        if (!query) {
          return this.summoners;
        }

        return this.summoners.filter((spell) => {
          return matchQuery([spell.nameKo, spell.nameEn], query);
        });
      },
      filteredRunePaths() {
        const query = normalize(this.search.runes);
        if (!query) {
          return this.runePaths;
        }

        return this.runePaths
          .map((path) => {
            const matchesPathName = matchQuery([path.nameKo, path.nameEn], query);
            const runes = matchesPathName
              ? path.runes
              : path.runes.filter((rune) => matchQuery([rune.nameKo, rune.nameEn], query));

            return {
              ...path,
              runes
            };
          })
          .filter((path) => path.runes.length > 0);
      },
      filteredRuneCount() {
        return this.filteredRunePaths.reduce((total, path) => total + path.runes.length, 0);
      }
    },
    mounted() {
      this.reloadAllData();
    },
    methods: {
      showToast(message, kind = "success") {
        this.toast.message = message;
        this.toast.kind = kind;
        this.toast.visible = true;

        if (this.toastTimer) {
          clearTimeout(this.toastTimer);
        }

        this.toastTimer = setTimeout(() => {
          this.toast.visible = false;
        }, UI.TOAST_DURATION_MS);
      },
      pushError(scope, error) {
        this.errors.push({
          scope,
          message: error.message
        });
      },
      async loadSection(stateKey, loadingKey, scope, loader) {
        this.loading[loadingKey] = true;
        try {
          this[stateKey] = await loader();
        } catch (error) {
          this[stateKey] = [];
          this.pushError(scope, error);
        } finally {
          this.loading[loadingKey] = false;
        }
      },
      async reloadAllData() {
        this.errors = [];
        this.loading.global = true;

        try {
          const version = await dataService.getLatestVersion();
          this.patchVersion = version;
          const cdnBase = API.CDN_ROOT + "/" + version;

          await Promise.allSettled([
            this.loadSection("champions", "champions", "챔피언", () => dataService.loadChampions(cdnBase)),
            this.loadSection("items", "items", "아이템", () => dataService.loadItems(cdnBase)),
            this.loadSection("summoners", "summoners", "소환사 주문", () => dataService.loadSummoners(cdnBase)),
            this.loadSection("runePaths", "runes", "룬", () => dataService.loadRunes(cdnBase))
          ]);

          this.lastLoadedAt = formatLoadedAt();

          if (this.errors.length === 0) {
            this.showToast("데이터를 최신 패치로 갱신했습니다.");
          } else {
            this.showToast("일부 데이터 로딩에 실패했습니다.", "error");
          }
        } catch (error) {
          this.pushError("공통", error);
          this.showToast("데이터 초기화 실패", "error");
        } finally {
          this.loading.global = false;
        }
      },
      async copyAsset(url, label) {
        if (!url) {
          this.showToast(MESSAGE.EMPTY_COPY_URL, "error");
          return;
        }

        const copied = await copyTextToClipboard(url);
        if (copied) {
          this.showToast(label + " URL 복사 완료");
        } else {
          this.showToast(MESSAGE.COPY_FAILED, "error");
        }
      }
    },
    beforeUnmount() {
      if (this.toastTimer) {
        clearTimeout(this.toastTimer);
      }
    }
  }).mount("#app");
})();
