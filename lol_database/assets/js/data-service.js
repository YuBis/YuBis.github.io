(() => {
  window.LolDb = window.LolDb || {};

  const { API, LOCALE, NETWORK } = window.LolDb.constants;
  const { readErrorMessage, sanitizeDescription } = window.LolDb.helpers;

  const fetchJson = async (url, label) => {
    try {
      const response = await axios.get(url, {
        timeout: NETWORK.REQUEST_TIMEOUT_MS
      });
      return response.data;
    } catch (error) {
      throw new Error(label + " 요청 실패 (" + readErrorMessage(error) + ")");
    }
  };

  const getLatestVersion = async () => {
    const versions = await fetchJson(API.VERSION_URL, "버전 목록");
    if (!Array.isArray(versions) || versions.length === 0) {
      throw new Error("최신 패치 버전을 찾을 수 없습니다.");
    }
    return versions[0];
  };

  const buildDataUrl = (cdnBase, locale, endpoint) => {
    return cdnBase + "/data/" + locale + "/" + endpoint;
  };

  const buildChampionRecord = (id, ko, en, cdnBase) => {
    const passiveKo = ko.passive || {};
    const passiveEn = en.passive || {};
    const spellsKo = Array.isArray(ko.spells) ? ko.spells : [];
    const spellsEn = Array.isArray(en.spells) ? en.spells : [];

    const abilityKeys = ["Q", "W", "E", "R"];
    const spellAbilities = abilityKeys.map((key, index) => {
      const spellKo = spellsKo[index] || {};
      const spellEn = spellsEn[index] || {};
      const spellIconName = spellKo.image && spellKo.image.full ? spellKo.image.full : "";

      return {
        key,
        nameKo: spellKo.name || "-",
        nameEn: spellEn.name || "-",
        iconUrl: spellIconName ? cdnBase + "/img/spell/" + spellIconName : ""
      };
    });

    const championIconName = ko.image && ko.image.full ? ko.image.full : "";
    const passiveIconName = passiveKo.image && passiveKo.image.full ? passiveKo.image.full : "";

    return {
      id,
      nameKo: ko.name || id,
      nameEn: en.name || id,
      iconUrl: championIconName ? cdnBase + "/img/champion/" + championIconName : "",
      abilities: [
        {
          key: "P",
          nameKo: passiveKo.name || "-",
          nameEn: passiveEn.name || "-",
          iconUrl: passiveIconName ? cdnBase + "/img/passive/" + passiveIconName : ""
        },
        ...spellAbilities
      ]
    };
  };

  const loadChampions = async (cdnBase) => {
    const [championFullKo, championFullEn] = await Promise.all([
      fetchJson(buildDataUrl(cdnBase, LOCALE.KO, "championFull.json"), "챔피언(한글)"),
      fetchJson(buildDataUrl(cdnBase, LOCALE.EN, "championFull.json"), "챔피언(영문)")
    ]);

    const ids = Object.keys(championFullKo.data || {});
    return ids
      .map((id) => buildChampionRecord(id, championFullKo.data[id], championFullEn.data[id], cdnBase))
      .sort((a, b) => a.nameKo.localeCompare(b.nameKo, "ko-KR"));
  };

  const loadItems = async (cdnBase) => {
    const [itemKo, itemEn] = await Promise.all([
      fetchJson(buildDataUrl(cdnBase, LOCALE.KO, "item.json"), "아이템(한글)"),
      fetchJson(buildDataUrl(cdnBase, LOCALE.EN, "item.json"), "아이템(영문)")
    ]);

    const ids = Object.keys(itemKo.data || {});
    return ids
      .map((id) => {
        const ko = itemKo.data[id] || {};
        const en = itemEn.data[id] || {};
        const iconName = ko.image && ko.image.full ? ko.image.full : "";

        return {
          id,
          nameKo: ko.name || id,
          nameEn: en.name || id,
          iconUrl: iconName ? cdnBase + "/img/item/" + iconName : "",
          safeDescription: sanitizeDescription(ko.description || ""),
          totalGold: ko.gold && typeof ko.gold.total === "number" ? ko.gold.total : 0
        };
      })
      .sort((a, b) => a.totalGold - b.totalGold);
  };

  const loadSummoners = async (cdnBase) => {
    const [summonerKo, summonerEn] = await Promise.all([
      fetchJson(buildDataUrl(cdnBase, LOCALE.KO, "summoner.json"), "소환사 주문(한글)"),
      fetchJson(buildDataUrl(cdnBase, LOCALE.EN, "summoner.json"), "소환사 주문(영문)")
    ]);

    const ids = Object.keys(summonerKo.data || {});
    return ids
      .map((id) => {
        const ko = summonerKo.data[id] || {};
        const en = summonerEn.data[id] || {};
        const iconName = ko.image && ko.image.full ? ko.image.full : "";
        const cooldown = Array.isArray(ko.cooldownBurn) ? ko.cooldownBurn.join(" / ") : ko.cooldownBurn || "-";

        return {
          id,
          nameKo: ko.name || id,
          nameEn: en.name || id,
          iconUrl: iconName ? cdnBase + "/img/spell/" + iconName : "",
          safeDescription: sanitizeDescription(ko.description || ""),
          cooldownText: cooldown
        };
      })
      .sort((a, b) => a.nameKo.localeCompare(b.nameKo, "ko-KR"));
  };

  const loadRunes = async (cdnBase) => {
    const [runesKo, runesEn] = await Promise.all([
      fetchJson(buildDataUrl(cdnBase, LOCALE.KO, "runesReforged.json"), "룬(한글)"),
      fetchJson(buildDataUrl(cdnBase, LOCALE.EN, "runesReforged.json"), "룬(영문)")
    ]);

    return (Array.isArray(runesKo) ? runesKo : []).map((pathKo, index) => {
      const pathEn = (Array.isArray(runesEn) ? runesEn : [])[index] || {};
      const runes = [];

      (pathKo.slots || []).forEach((slot, slotIndex) => {
        const slotEn = (pathEn.slots || [])[slotIndex] || {};
        (slot.runes || []).forEach((runeKo, runeIndex) => {
          const runeEn = (slotEn.runes || [])[runeIndex] || {};
          const fallbackRuneId = [pathKo.id || index, slotIndex, runeIndex].join("-");
          runes.push({
            id: String(runeKo.id || runeKo.key || runeKo.name || fallbackRuneId),
            nameKo: runeKo.name || "-",
            nameEn: runeEn.name || "-",
            iconUrl: runeKo.icon ? API.RUNE_ICON_ROOT + runeKo.icon : ""
          });
        });
      });

      return {
        id: String(pathKo.id || pathKo.key || index),
        nameKo: pathKo.name || "-",
        nameEn: pathEn.name || "-",
        runes
      };
    });
  };

  window.LolDb.dataService = {
    getLatestVersion,
    loadChampions,
    loadItems,
    loadSummoners,
    loadRunes
  };
})();
