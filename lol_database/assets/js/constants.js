(() => {
  window.LolDb = window.LolDb || {};

  window.LolDb.constants = {
    API: {
      VERSION_URL: "https://ddragon.leagueoflegends.com/api/versions.json",
      CDN_ROOT: "https://ddragon.leagueoflegends.com/cdn",
      RUNE_ICON_ROOT: "https://ddragon.leagueoflegends.com/cdn/img/"
    },
    LOCALE: {
      KO: "ko_KR",
      EN: "en_US"
    },
    UI: {
      TOAST_DURATION_MS: 1800
    },
    NETWORK: {
      REQUEST_TIMEOUT_MS: 20000
    },
    MESSAGE: {
      EMPTY_COPY_URL: "복사할 URL이 없습니다.",
      COPY_FAILED: "클립보드 복사 실패"
    }
  };
})();
