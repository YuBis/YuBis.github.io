const API_BASE = "https://pokeapi.co/api/v2";
const FALLBACK_MAX_ID = 1025;
const DETAIL_CONCURRENCY = 12;
const REGION_CONCURRENCY = 3;
const CACHE_TTL = 1000 * 60 * 60 * 24 * 14;
const RENDER_THROTTLE_MS = 220;

const STORAGE = {
  collected: "pokedex:collected:v1",
  pokemonPrefix: "pokedex:pokemon:v5:",
  evolutionPrefix: "pokedex:evolution:v1:",
  formsPrefix: "pokedex:forms:v3:",
  shellsPrefix: "pokedex:shells:v2:",
  maxId: "pokedex:max-id:v1",
};

const POKEDEX_FALLBACKS = [
  "national",
  "kanto",
  "original-johto",
  "hoenn",
  "original-sinnoh",
  "extended-sinnoh",
  "original-unova",
  "updated-unova",
  "kalos-central",
  "kalos-coastal",
  "kalos-mountain",
  "original-alola",
  "updated-alola",
  "galar",
  "isle-of-armor",
  "crown-tundra",
  "hisui",
  "paldea",
  "kitakami",
  "blueberry",
];

const POKEDEX_LABELS = {
  national: "전국도감",
  kanto: "관동도감",
  "original-johto": "성도도감",
  "updated-johto": "성도도감 (HGSS)",
  hoenn: "호연도감",
  "updated-hoenn": "호연도감 (ORAS)",
  "original-sinnoh": "신오도감",
  "extended-sinnoh": "신오도감 확장",
  "original-unova": "하나도감",
  "updated-unova": "하나도감 (BW2)",
  "kalos-central": "칼로스 센트럴",
  "kalos-coastal": "칼로스 코스트",
  "kalos-mountain": "칼로스 마운틴",
  "original-alola": "알로라 도감",
  "updated-alola": "알로라 도감 (USUM)",
  "original-melemele": "멜레멜레 도감",
  "updated-melemele": "멜레멜레 도감 (USUM)",
  "original-akala": "아칼라 도감",
  "updated-akala": "아칼라 도감 (USUM)",
  "original-ulaula": "울라울라 도감",
  "updated-ulaula": "울라울라 도감 (USUM)",
  "original-poni": "포니 도감",
  "updated-poni": "포니 도감 (USUM)",
  "letsgo-kanto": "레츠고 관동",
  galar: "가라르 도감",
  "isle-of-armor": "갑옷섬 도감",
  "crown-tundra": "왕관설원 도감",
  hisui: "히스이 도감",
  paldea: "팔데아 도감",
  kitakami: "북신 도감",
  blueberry: "블루베리 도감",
  "lumiose-city": "미르시티 도감",
  hyperspace: "환상의 공간",
  champions: "챔피언 도감",
  "conquest-gallery": "컨퀘스트 갤러리",
};

const TYPE_META = {
  normal: ["노말", "N", "#8a8b67"],
  fire: ["불꽃", "F", "#de5a3f"],
  water: ["물", "W", "#3b82c4"],
  electric: ["전기", "E", "#c99312"],
  grass: ["풀", "G", "#4f9f52"],
  ice: ["얼음", "I", "#35aab4"],
  fighting: ["격투", "F", "#b93b32"],
  poison: ["독", "P", "#9451a6"],
  ground: ["땅", "G", "#b9853a"],
  flying: ["비행", "A", "#6a8bc9"],
  psychic: ["에스퍼", "P", "#d85584"],
  bug: ["벌레", "B", "#829625"],
  rock: ["바위", "R", "#9f873e"],
  ghost: ["고스트", "H", "#665a9e"],
  dragon: ["드래곤", "D", "#6555c8"],
  dark: ["악", "D", "#5d4f47"],
  steel: ["강철", "S", "#6f8d98"],
  fairy: ["페어리", "Y", "#cf6da4"],
};

const REGION_META = {
  kanto: ["관동", "K", "#e44352"],
  johto: ["성도", "J", "#d6a21e"],
  hoenn: ["호연", "H", "#1b8dbf"],
  sinnoh: ["신오", "S", "#596bba"],
  hisui: ["히스이", "Hs", "#6b7c8f"],
  unova: ["하나", "U", "#30394c"],
  kalos: ["칼로스", "X", "#2f9d79"],
  alola: ["알로라", "A", "#df7e2e"],
  galar: ["가라르", "G", "#7d5ca5"],
  paldea: ["팔데아", "P", "#bb3f61"],
  unknown: ["정보 없음", "?", "#7b8494"],
};

const REGIONAL_FORM_REGIONS = ["alola", "galar", "hisui", "paldea"];

const REGIONAL_FORM_POKEDEX = {
  alola: "original-alola",
  galar: "galar",
  hisui: "hisui",
  paldea: "paldea",
};

const VERSION_REGION = {
  red: "kanto",
  blue: "kanto",
  yellow: "kanto",
  firered: "kanto",
  leafgreen: "kanto",
  "lets-go-pikachu": "kanto",
  "lets-go-eevee": "kanto",
  gold: "johto",
  silver: "johto",
  crystal: "johto",
  heartgold: "johto",
  soulsilver: "johto",
  ruby: "hoenn",
  sapphire: "hoenn",
  emerald: "hoenn",
  "omega-ruby": "hoenn",
  "alpha-sapphire": "hoenn",
  diamond: "sinnoh",
  pearl: "sinnoh",
  platinum: "sinnoh",
  "brilliant-diamond": "sinnoh",
  "shining-pearl": "sinnoh",
  "legends-arceus": "hisui",
  black: "unova",
  white: "unova",
  "black-2": "unova",
  "white-2": "unova",
  x: "kalos",
  y: "kalos",
  sun: "alola",
  moon: "alola",
  "ultra-sun": "alola",
  "ultra-moon": "alola",
  sword: "galar",
  shield: "galar",
  scarlet: "paldea",
  violet: "paldea",
};

const GENERATION_REGION = {
  "generation-i": "kanto",
  "generation-ii": "johto",
  "generation-iii": "hoenn",
  "generation-iv": "sinnoh",
  "generation-v": "unova",
  "generation-vi": "kalos",
  "generation-vii": "alola",
  "generation-viii": "galar",
  "generation-ix": "paldea",
};

const state = {
  dexName: "national",
  dexRegion: "unknown",
  searchQuery: "",
  statusFilter: "all",
  filtersEnabled: true,
  showAllForms: false,
  typeFilters: new Set(),
  regionFilters: new Set(),
  viewMode: "detail",
  pokemon: [],
  pokemonById: new Map(),
  collected: readCollected(),
  maxId: Number(localStorage.getItem(STORAGE.maxId)) || FALLBACK_MAX_ID,
  detailDoneCount: 0,
  regionDoneCount: 0,
  regionTargetCount: 0,
  isHydrating: false,
  isHydratingRegions: false,
  renderTimer: null,
  statusTimer: null,
  highlightTimer: null,
  loadToken: 0,
  flippedCardKey: "",
  highlightCardKey: "",
};

const grid = document.querySelector("#pokedexGrid");
const statusText = document.querySelector("#statusText");
const summaryText = document.querySelector("#summaryText");
const emptyState = document.querySelector("#emptyState");
const pokedexSelect = document.querySelector("#pokedexSelect");
const searchInput = document.querySelector("#searchInput");
const allFormsToggle = document.querySelector("#allFormsToggle");
const filterToggle = document.querySelector("#filterToggle");
const typeFilterGroup = document.querySelector("#typeFilterGroup");
const regionFilterGroup = document.querySelector("#regionFilterGroup");
const collectionDialog = document.querySelector("#collectionDialog");
const collectionCode = document.querySelector("#collectionCode");
const importCode = document.querySelector("#importCode");
const importMessage = document.querySelector("#importMessage");

document.addEventListener("DOMContentLoaded", init);

function init() {
  populatePokedexOptions(POKEDEX_FALLBACKS);
  populateFilterOptions();
  bindEvents();
  render();
  refreshPokedexOptions();
  loadSelectedPokedex();
}

function bindEvents() {
  pokedexSelect.addEventListener("change", () => {
    state.dexName = pokedexSelect.value;
    state.searchQuery = "";
    searchInput.value = "";
    state.typeFilters.clear();
    state.regionFilters.clear();
    syncCheckboxUI();
    loadSelectedPokedex();
  });

  searchInput.addEventListener("input", () => {
    state.searchQuery = searchInput.value.trim().toLowerCase();
    render();
  });

  document.querySelectorAll("[data-status-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.statusFilter = button.dataset.statusFilter;
      if (state.statusFilter === "collected") preloadCollectedFormsForAll();
      render();
    });
  });

  document.querySelectorAll("[data-view-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.viewMode = button.dataset.viewMode;
      state.flippedCardKey = "";
      render();
    });
  });

  allFormsToggle.addEventListener("click", () => {
    state.showAllForms = !state.showAllForms;
    if (state.showAllForms) preloadAllForms();
    render();
  });

  filterToggle.addEventListener("click", () => {
    state.filtersEnabled = !state.filtersEnabled;
    render();
  });

  typeFilterGroup.addEventListener("change", () => {
    state.typeFilters = readCheckedValues(typeFilterGroup);
    render();
  });

  regionFilterGroup.addEventListener("change", () => {
    state.regionFilters = readCheckedValues(regionFilterGroup);
    render();
  });

  grid.addEventListener("click", (event) => {
    const jumpButton = event.target.closest("[data-jump-pokemon-id]");
    if (jumpButton) {
      jumpToPokemon(Number(jumpButton.dataset.jumpPokemonId));
      return;
    }

    const evolutionButton = event.target.closest("[data-evolution-id]");
    if (evolutionButton) {
      toggleEvolution(Number(evolutionButton.dataset.evolutionId));
      return;
    }

    const formButton = event.target.closest("[data-form-id]");
    if (formButton) {
      toggleForms(Number(formButton.dataset.formId));
      return;
    }

    const button = event.target.closest("[data-collect-id]");
    if (button) {
      toggleCollected(button.dataset.collectId);
      return;
    }

    const card = event.target.closest("[data-card-key]");
    if (card) {
      toggleFlippedCard(card.dataset.cardKey);
    }
  });

  document.querySelector("#openExport").addEventListener("click", () => {
    refreshExportCode();
    importCode.value = "";
    importMessage.textContent = "";
    collectionDialog.showModal();
  });

  document.querySelector("#copyCodeButton").addEventListener("click", copyExportCode);
  document.querySelector("#importCodeButton").addEventListener("click", importCollectionCode);
}

function populatePokedexOptions(names) {
  const uniqueNames = Array.from(new Set(names));
  const selected = pokedexSelect.value || state.dexName;

  pokedexSelect.innerHTML = uniqueNames
    .map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(getPokedexLabel(name))}</option>`)
    .join("");
  pokedexSelect.value = uniqueNames.includes(selected) ? selected : "national";
}

async function refreshPokedexOptions() {
  try {
    const data = await fetchJson(`${API_BASE}/pokedex?limit=1000`);
    const names = data.results.map((entry) => entry.name).filter(Boolean);
    populatePokedexOptions(names);
  } catch {
    // The fallback list keeps the selector usable.
  }
}

function populateFilterOptions() {
  typeFilterGroup.innerHTML = renderCheckboxes(TYPE_META, "type-filter");
  regionFilterGroup.innerHTML = renderCheckboxes(REGION_META, "region-filter");
}

function renderCheckboxes(meta, name) {
  return Object.entries(meta)
    .map(([value, [label, icon, color]]) => {
      const checked = value === "unknown" ? "" : "";
      return `
        <label class="check-chip" style="--chip-color: ${color}">
          <input type="checkbox" name="${name}" value="${escapeHtml(value)}" ${checked} />
          <span class="badge-icon" aria-hidden="true">${escapeHtml(icon)}</span>
          <span>${escapeHtml(label)}</span>
        </label>
      `;
    })
    .join("");
}

async function loadSelectedPokedex() {
  const token = state.loadToken + 1;
  state.loadToken = token;
  state.isHydrating = false;
  state.isHydratingRegions = false;
  state.pokemon = [];
  state.pokemonById = new Map();
  state.detailDoneCount = 0;
  state.regionDoneCount = 0;
  state.regionTargetCount = 0;
  state.flippedCardKey = "";
  state.highlightCardKey = "";
  if (state.highlightTimer) {
    window.clearTimeout(state.highlightTimer);
    state.highlightTimer = null;
  }
  statusText.textContent = `${getPokedexLabel(state.dexName)} 카드 목록을 준비하는 중입니다.`;
  render();

  const dexData = await loadPokedexEntries(state.dexName);
  if (token !== state.loadToken) return;

  state.dexRegion = dexData.region || "unknown";
  state.pokemon = dexData.entries.map((entry) => createPokemonShell(entry, dexData.region, state.dexName));
  state.pokemonById = new Map(state.pokemon.map((pokemon) => [pokemon.id, pokemon]));
  state.detailDoneCount = state.pokemon.filter((pokemon) => pokemon.detailDone).length;
  state.maxId = Math.max(state.maxId, ...state.pokemon.map((pokemon) => pokemon.id), state.pokemon.length);
  localStorage.setItem(STORAGE.maxId, String(state.maxId));
  preloadCollectedFormsForAll();
  if (state.showAllForms) preloadAllForms();

  render();
  hydratePokemonDetails(token);
}

async function loadPokedexEntries(dexName) {
  const cached = readPokedexCache(dexName);
  if (cached?.entries?.length) {
    refreshPokedexCache(dexName);
    return cached;
  }

  try {
    return await fetchPokedexEntries(dexName);
  } catch (error) {
    console.warn(`Failed to fetch pokedex ${dexName}`, error);
    return {
      entries: createFallbackShells(),
      region: getRegionFromDexName(dexName),
    };
  }
}

async function refreshPokedexCache(dexName) {
  try {
    await fetchPokedexEntries(dexName);
  } catch {
    // Cached entries are enough for now.
  }
}

async function fetchPokedexEntries(dexName) {
  const dex = await fetchJson(`${API_BASE}/pokedex/${dexName}`);
  const entries = dex.pokemon_entries
    .map((entry) => ({
      id: getIdFromUrl(entry.pokemon_species.url),
      dexNumber: entry.entry_number,
      fallbackName: toTitleCase(entry.pokemon_species.name),
      englishName: entry.pokemon_species.name,
    }))
    .filter((entry) => Number.isInteger(entry.id))
    .sort((a, b) => a.dexNumber - b.dexNumber);
  const result = {
    entries,
    region: dex.region?.name || getRegionFromDexName(dex.name),
  };

  writePokedexCache(dexName, result);
  return result;
}

function createFallbackShells() {
  return Array.from({ length: FALLBACK_MAX_ID }, (_, index) => ({
    id: index + 1,
    dexNumber: index + 1,
    fallbackName: `Pokemon ${index + 1}`,
    englishName: `pokemon-${index + 1}`,
  }));
}

function createPokemonShell(entry, dexRegion, dexName) {
  const cached = readPokemonCache(entry.id, dexName);
  const base = {
    id: entry.id,
    dexNumber: entry.dexNumber,
    name: entry.fallbackName,
    englishName: entry.englishName,
    image: "",
    types: [],
    originRegion: dexRegion || "unknown",
    regions: dexRegion && dexRegion !== "unknown" ? [dexRegion] : [],
    regionsEstimated: false,
    accent: "#637084",
    formNames: [],
    forms: [],
    formsLoaded: false,
    formsLoading: false,
    formsExpanded: false,
    evolutionChainUrl: "",
    evolutions: [],
    evolutionLoaded: false,
    evolutionLoading: false,
    evolutionExpanded: false,
    detailDone: false,
    failed: false,
  };

  return cached
    ? { ...base, ...cached, dexNumber: entry.dexNumber, detailDone: true, failed: false }
    : base;
}

async function hydratePokemonDetails(token) {
  const ids = state.pokemon.filter((pokemon) => !pokemon.detailDone).map((pokemon) => pokemon.id);
  if (!ids.length) {
    updateStatusText();
    hydrateEncounterRegions(token);
    return;
  }

  state.isHydrating = true;
  updateStatusText();

  let cursor = 0;
  const context = {
    dexName: state.dexName,
    dexRegion: state.dexRegion,
  };

  async function worker() {
    while (cursor < ids.length && token === state.loadToken) {
      const id = ids[cursor];
      cursor += 1;

      const detail = await loadPokemon(id, context);
      if (token !== state.loadToken) return;

      if (detail) {
        mergePokemonDetail(detail);
      } else {
        markPokemonFailed(id);
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(DETAIL_CONCURRENCY, ids.length) }, worker));
  if (token !== state.loadToken) return;

  state.isHydrating = false;
  updateStatusText();
  hydrateEncounterRegions(token);
}

async function loadPokemon(id, context) {
  const cached = readPokemonCache(id, context.dexName);
  if (cached) return cached;

  try {
    const species = await fetchJson(`${API_BASE}/pokemon-species/${id}`);
    const pokemonName = getPreferredPokemonName(species, context);
    const pokemon = await fetchJson(`${API_BASE}/pokemon/${pokemonName}`);
    const data = normalizePokemon(id, pokemon, species, context);

    writePokemonCache(id, context.dexName, data);
    return data;
  } catch (error) {
    console.warn(`Failed to load pokemon ${id}`, error);
    return null;
  }
}

function normalizePokemon(id, pokemon, species, context) {
  const types = pokemon.types
    .slice()
    .sort((a, b) => a.slot - b.slot)
    .map((entry) => entry.type.name);
  const image =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.other?.home?.front_default ||
    pokemon.sprites?.front_default ||
    "";
  const originRegion = GENERATION_REGION[species.generation?.name] || "unknown";
  const formRegion = getRegionalFormRegion(pokemon.name, species.name);
  const regions = getCatchRegions([], originRegion, context.dexRegion, formRegion);

  return {
    id,
    originRegion,
    evolutionChainUrl: species.evolution_chain?.url || "",
    speciesName: species.name,
    activePokemonName: pokemon.name,
    baseName: getLocalizedName(species, species.name),
    name: getDisplayName(species, pokemon.name),
    englishName: pokemon.name,
    image,
    types,
    regions,
    regionsEstimated: true,
    accent: getTypeColor(types[0]),
    formNames: getVarietyNames(species),
  };
}

async function hydrateEncounterRegions(token) {
  const targets = state.pokemon.filter(
    (pokemon) => pokemon.detailDone && pokemon.regionsEstimated && pokemon.activePokemonName,
  );

  if (!targets.length) {
    state.isHydratingRegions = false;
    state.regionDoneCount = 0;
    state.regionTargetCount = 0;
    updateStatusText();
    return;
  }

  state.isHydratingRegions = true;
  state.regionDoneCount = 0;
  state.regionTargetCount = targets.length;
  updateStatusText();

  let cursor = 0;
  const context = {
    dexName: state.dexName,
    dexRegion: state.dexRegion,
  };

  async function worker() {
    while (cursor < targets.length && token === state.loadToken) {
      const pokemon = targets[cursor];
      cursor += 1;

      const regions = await loadEncounterRegions(pokemon, context);
      if (token !== state.loadToken) return;

      state.regionDoneCount += 1;
      if (regions) mergeEncounterRegions(pokemon.id, regions, context.dexName);
      scheduleStatusUpdate();
    }
  }

  await Promise.all(Array.from({ length: Math.min(REGION_CONCURRENCY, targets.length) }, worker));
  if (token !== state.loadToken) return;

  state.isHydratingRegions = false;
  state.regionTargetCount = 0;
  updateStatusText();
}

async function loadEncounterRegions(pokemon, context) {
  try {
    const encounters = await fetchJson(`${API_BASE}/pokemon/${pokemon.activePokemonName}/encounters`);
    const formRegion = getRegionalFormRegion(pokemon.activePokemonName, pokemon.speciesName);
    return getCatchRegions(encounters, pokemon.originRegion || "unknown", context.dexRegion, formRegion);
  } catch (error) {
    console.warn(`Failed to load encounter regions for ${pokemon.id}`, error);
    return pokemon.regions?.length ? pokemon.regions : ["unknown"];
  }
}

function mergeEncounterRegions(id, regions, dexName) {
  const pokemon = state.pokemonById.get(id);
  if (!pokemon || !pokemon.regionsEstimated) return;

  const changed = regions.join("|") !== pokemon.regions.join("|");
  pokemon.regions = regions;
  pokemon.regionsEstimated = false;
  writePokemonCache(id, dexName, getPokemonCacheData(pokemon));

  if (changed) updateCardAfterDetail(pokemon);
}

function getPokemonCacheData(pokemon) {
  return {
    id: pokemon.id,
    originRegion: pokemon.originRegion,
    speciesName: pokemon.speciesName,
    activePokemonName: pokemon.activePokemonName,
    baseName: pokemon.baseName,
    name: pokemon.name,
    englishName: pokemon.englishName,
    image: pokemon.image,
    types: pokemon.types,
    regions: pokemon.regions,
    regionsEstimated: Boolean(pokemon.regionsEstimated),
    evolutionChainUrl: pokemon.evolutionChainUrl,
    accent: pokemon.accent,
    formNames: pokemon.formNames,
  };
}

function mergePokemonDetail(detail) {
  const pokemon = state.pokemonById.get(detail.id);
  if (!pokemon) return;

  if (!pokemon.detailDone) state.detailDoneCount += 1;
  Object.assign(pokemon, detail, { detailDone: true, failed: false });
  preloadCollectedForms(pokemon);
  if (state.showAllForms) ensurePokemonForms(pokemon);
  updateCardAfterDetail(pokemon);
}

function markPokemonFailed(id) {
  const pokemon = state.pokemonById.get(id);
  if (!pokemon || pokemon.detailDone) return;

  pokemon.detailDone = true;
  pokemon.failed = true;
  pokemon.regionsEstimated = false;
  if (!pokemon.regions.length) pokemon.regions = ["unknown"];
  state.detailDoneCount += 1;
  updateCardAfterDetail(pokemon);
}

function updateCardAfterDetail(pokemon) {
  if (state.statusFilter === "collected") {
    scheduleRender();
    scheduleStatusUpdate();
    return;
  }

  if (state.filtersEnabled && (state.typeFilters.size || state.regionFilters.size)) {
    scheduleRender();
    return;
  }

  const card = grid.querySelector(`[data-pokemon-id="${pokemon.id}"]`);
  if (card && matchesFilters(pokemon)) {
    card.outerHTML = renderPokemonCard(pokemon);
  } else if (card) {
    card.remove();
  }

  scheduleStatusUpdate();
}

function getPreferredPokemonName(species, context) {
  const varieties = species.varieties || [];
  const names = varieties.map((variety) => variety.pokemon.name);
  const preferredRegions = [context.dexRegion, getRegionFromDexName(context.dexName)].filter(
    (region) => region && region !== "unknown",
  );

  for (const region of preferredRegions) {
    const exact = names.find((name) => name === `${species.name}-${region}`);
    if (exact) return exact;

    const regional = names.find((name) => name.startsWith(`${species.name}-${region}`) || name.includes(`-${region}`));
    if (regional) return regional;
  }

  return varieties.find((variety) => variety.is_default)?.pokemon.name || species.name;
}

function getVarietyNames(species) {
  return (species.varieties || []).map((variety) => variety.pokemon.name).filter(Boolean);
}

function getDisplayName(species, pokemonName) {
  const baseName = getLocalizedName(species, species.name);
  const formRegion = getRegionalFormRegion(pokemonName, species.name);
  const formLabel = formRegion ? REGION_META[formRegion]?.[0] : "";

  return formLabel ? `${baseName} (${formLabel})` : baseName;
}

function getRegionalFormRegion(pokemonName, speciesName) {
  if (pokemonName === speciesName) return "";
  return REGIONAL_FORM_REGIONS.find((region) => pokemonName.includes(`-${region}`)) || "";
}

function getLocalizedName(species, fallbackName) {
  const korean = species.names?.find((name) => name.language.name === "ko");
  const english = species.names?.find((name) => name.language.name === "en");
  return korean?.name || english?.name || toTitleCase(fallbackName);
}

function getCatchRegions(encounters, originRegion, dexRegion, formRegion) {
  const regions = new Set();

  if (dexRegion && dexRegion !== "unknown") regions.add(dexRegion);
  if (formRegion) regions.add(formRegion);

  for (const encounter of encounters || []) {
    for (const detail of encounter.version_details || []) {
      const region = VERSION_REGION[detail.version.name];
      if (region) regions.add(region);
    }
  }

  if (!regions.size) regions.add(originRegion || "unknown");
  return Array.from(regions).slice(0, 4);
}

function render() {
  const visibleItems = getVisibleItems();
  grid.classList.toggle("is-compact", state.viewMode === "compact");
  grid.innerHTML = visibleItems.map(renderVisibleItem).join("");
  emptyState.hidden = visibleItems.length > 0 || !state.pokemon.length;

  pokedexSelect.value = state.dexName;
  searchInput.value = state.searchQuery;
  updateStatusButtons();
  updateModeButtons();
  updateAllFormsToggle();
  updateFilterToggle();
  updateStatusText();

  if (collectionDialog.open) refreshExportCode();
}

function scheduleRender() {
  if (state.renderTimer) return;

  state.renderTimer = window.setTimeout(() => {
    state.renderTimer = null;
    render();
  }, RENDER_THROTTLE_MS);
}

function scheduleStatusUpdate() {
  if (state.statusTimer) return;

  state.statusTimer = window.setTimeout(() => {
    state.statusTimer = null;
    updateStatusText();
  }, RENDER_THROTTLE_MS);
}

function updateStatusText() {
  const visibleCount = getVisibleItems().length;
  const totalCount = state.pokemon.length || state.maxId;
  const loadedText = state.pokemon.length
    ? `핵심 정보 ${state.detailDoneCount}/${totalCount}개`
    : "카드 목록 준비 중";
  const regionText = state.isHydratingRegions
    ? ` · 지방 보강 ${state.regionDoneCount}/${state.regionTargetCount || state.pokemon.length}개`
    : "";
  const dexLabel = getPokedexLabel(state.dexName);

  statusText.textContent = state.isHydrating
    ? `${dexLabel} 카드 배치 완료 · ${loadedText} 불러오는 중${regionText}`
    : `${dexLabel} 카드 배치 완료 · ${loadedText}${regionText}`;
  summaryText.textContent = `수집 ${state.collected.size} / 표시 ${visibleCount}`;
}

function renderPokemonCard(pokemon) {
  const collectionKey = getSpeciesCollectionKey(pokemon);
  const cardKey = getPokemonCardKey(pokemon);
  const collected = state.collected.has(collectionKey);
  const flipped = isCardFlipped(cardKey);
  const highlighted = state.highlightCardKey === cardKey;
  const image = pokemon.image
    ? `<img src="${escapeHtml(pokemon.image)}" alt="${escapeHtml(pokemon.name)} 이미지" loading="lazy" />`
    : `<div class="image-fallback" aria-hidden="true"></div>`;
  const compactMedia =
    state.viewMode === "compact" && !flipped
      ? `<div class="compact-media">${renderCompactImage(pokemon.image, pokemon.name)}</div>`
      : "";
  const forms = renderFormsPanel(pokemon);
  const evolution = renderEvolutionPanel(pokemon);
  const collectButton = renderCollectButton(collectionKey, collected, pokemon.name);

  return `
    <article
      class="pokemon-card ${pokemon.detailDone ? "" : "is-loading-detail"} ${flipped ? "is-flipped" : ""} ${highlighted ? "is-card-highlighted" : ""}"
      data-pokemon-id="${pokemon.id}"
      data-card-key="${escapeHtml(cardKey)}"
      aria-expanded="${flipped}"
      style="--card-accent: ${escapeHtml(pokemon.accent)}"
    >
      <div class="card-flip">
        <div class="card-face card-front">
          <div class="card-media">${image}</div>
          <div class="card-body card-front-body">
            ${compactMedia}
            <div class="card-topline">
              <div>
                <h2 class="pokemon-name">${escapeHtml(pokemon.name)}</h2>
                ${renderDexNumber(pokemon)}
              </div>
            </div>

            <div class="front-type-row" aria-label="타입">
              ${renderTypeBadges(pokemon)}
            </div>

            ${collectButton}
          </div>
        </div>

        <div class="card-face card-back">
          <div class="card-back-header">
            <div class="card-back-media">${image}</div>
            <div class="card-back-title">
              <h2 class="pokemon-name">${escapeHtml(pokemon.name)}</h2>
              ${renderDexNumber(pokemon)}
              <div class="front-type-row" aria-label="타입">
                ${renderTypeBadges(pokemon)}
              </div>
            </div>
          </div>

          <div class="card-details">
            <div class="badge-group" aria-label="포획 가능 지방">
              ${renderRegionBadges(pokemon)}
            </div>
          </div>

          ${forms}
          ${evolution}
          ${collectButton}
        </div>
      </div>
    </article>
  `;
}

function renderCollectedFormCard(item) {
  const { form, parent } = item;
  const cardKey = getFormCardKey(form);
  const collected = state.collected.has(form.collectionKey);
  const flipped = isCardFlipped(cardKey);
  const highlighted = state.highlightCardKey === cardKey;
  const image = form.image
    ? `<img src="${escapeHtml(form.image)}" alt="${escapeHtml(form.name)} 이미지" loading="lazy" />`
    : `<div class="image-fallback" aria-hidden="true"></div>`;
  const compactMedia =
    state.viewMode === "compact" && !flipped
      ? `<div class="compact-media">${renderCompactImage(form.image, form.name)}</div>`
      : "";
  const collectButton = renderCollectButton(form.collectionKey, collected, form.name);

  return `
    <article
      class="pokemon-card form-result-card ${flipped ? "is-flipped" : ""} ${highlighted ? "is-card-highlighted" : ""}"
      data-pokemon-id="${parent.id}"
      data-form-key="${escapeHtml(form.collectionKey)}"
      data-card-key="${escapeHtml(cardKey)}"
      aria-expanded="${flipped}"
      style="--card-accent: ${escapeHtml(form.accent)}"
    >
      <div class="card-flip">
        <div class="card-face card-front">
          <div class="card-media">${image}</div>
          <div class="card-body card-front-body">
            ${compactMedia}
            <div class="card-topline">
              <div>
                <h2 class="pokemon-name">${escapeHtml(form.name)}</h2>
                ${renderFormDexNumber(form, parent)}
              </div>
            </div>

            <div class="front-type-row" aria-label="타입">
              ${form.types.map(renderTypeBadge).join("")}
            </div>

            ${collectButton}
          </div>
        </div>

        <div class="card-face card-back">
          <div class="card-back-header">
            <div class="card-back-media">${image}</div>
            <div class="card-back-title">
              <h2 class="pokemon-name">${escapeHtml(form.name)}</h2>
              ${renderFormDexNumber(form, parent)}
              <div class="front-type-row" aria-label="타입">
                ${form.types.map(renderTypeBadge).join("")}
              </div>
            </div>
          </div>

          <div class="card-details">
            <div class="badge-group" aria-label="포획 가능 지방">
              ${form.regions.map(renderRegionBadge).join("")}
            </div>
          </div>

          ${collectButton}
        </div>
      </div>
    </article>
  `;
}

function renderVisibleItem(item) {
  if (item.kind === "form") return renderCollectedFormCard(item);
  return renderPokemonCard(item.pokemon);
}

function renderCompactImage(image, name) {
  return image
    ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(name)} 이미지" loading="lazy" />`
    : `<span class="compact-image-fallback" aria-hidden="true"></span>`;
}

function renderCollectButton(collectionKey, collected, name) {
  return `
    <button
      class="collect-button ${collected ? "is-collected" : ""}"
      type="button"
      data-collect-id="${escapeHtml(collectionKey)}"
      aria-label="${escapeHtml(name)} 수집 완료"
      aria-pressed="${collected}"
    >
      <span class="pokeball-icon" aria-hidden="true"></span>
      <span class="collect-label">수집 완료</span>
    </button>
  `;
}

function getPokemonCardKey(pokemon) {
  return `pokemon:${pokemon.id}`;
}

function getFormCardKey(form) {
  return form.collectionKey;
}

function isCardFlipped(cardKey) {
  return state.flippedCardKey === cardKey;
}

function toggleFlippedCard(cardKey) {
  state.flippedCardKey = state.flippedCardKey === cardKey ? "" : cardKey;
  render();
}

function jumpToPokemon(id) {
  const pokemon = state.pokemonById.get(id);
  if (!pokemon) return;

  const cardKey = getPokemonCardKey(pokemon);
  if (!findRenderedCardByKey(cardKey)) {
    statusText.textContent = `${pokemon.name} 카드는 현재 검색/필터 조건에서 숨겨져 있습니다.`;
    return;
  }

  state.flippedCardKey = cardKey;
  state.highlightCardKey = cardKey;
  render();

  window.setTimeout(() => {
    const card = findRenderedCardByKey(cardKey);
    if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 0);

  if (state.highlightTimer) window.clearTimeout(state.highlightTimer);
  state.highlightTimer = window.setTimeout(() => {
    if (state.highlightCardKey === cardKey) {
      state.highlightCardKey = "";
      render();
    }
  }, 1800);
}

function findRenderedCardByKey(cardKey) {
  return grid.querySelector(`[data-card-key="${escapeAttributeSelectorValue(cardKey)}"]`);
}

function escapeAttributeSelectorValue(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function renderDexNumber(pokemon) {
  const number = String(pokemon.dexNumber).padStart(4, "0");

  if (state.statusFilter === "collected") {
    return `<span class="pokemon-id pokemon-id-context">${escapeHtml(getPokedexLabel(state.dexName))} No. ${number}</span>`;
  }

  return `<span class="pokemon-id">No. ${number}</span>`;
}

function renderFormDexNumber(form, parent) {
  const context = form.dexContext || {
    dexName: state.dexName,
    dexNumber: parent.dexNumber,
  };
  const number = String(context.dexNumber).padStart(4, "0");

  return `<span class="pokemon-id pokemon-id-context">${escapeHtml(getPokedexLabel(context.dexName))} No. ${number}</span>`;
}

function renderTypeBadges(pokemon) {
  if (!pokemon.detailDone) return `<span class="placeholder-chip">타입 확인 중</span>`;
  if (!pokemon.types.length) return `<span class="placeholder-chip">타입 정보 없음</span>`;
  return pokemon.types.map(renderTypeBadge).join("");
}

function renderRegionBadges(pokemon) {
  if (!pokemon.detailDone) return `<span class="placeholder-chip">지방 확인 중</span>`;
  return pokemon.regions.map(renderRegionBadge).join("");
}

function renderEvolutionPanel(pokemon) {
  if (!pokemon.detailDone) return "";

  const buttonText = pokemon.evolutionExpanded
    ? "진화 정보 접기"
    : pokemon.evolutionLoading
      ? "진화 정보 불러오는 중"
      : "진화 정보 보기";
  const panel = pokemon.evolutionExpanded
    ? `
      <div class="evolution-panel" aria-label="${escapeHtml(pokemon.name)} 진화 정보">
        ${renderEvolutionContent(pokemon)}
      </div>
    `
    : "";

  return `
    <div class="evolution-block">
      <button
        class="evolution-toggle"
        type="button"
        data-evolution-id="${pokemon.id}"
        aria-expanded="${pokemon.evolutionExpanded}"
      >
        ${escapeHtml(buttonText)}
      </button>
      ${panel}
    </div>
  `;
}

function renderEvolutionContent(pokemon) {
  if (pokemon.evolutionLoading) return `<span class="placeholder-chip">진화 정보를 확인하는 중</span>`;
  if (!pokemon.evolutionLoaded) return `<span class="placeholder-chip">버튼을 누르면 진화 정보를 불러옵니다</span>`;
  if (!pokemon.evolutions.length) return `<span class="placeholder-chip">진화 정보 없음</span>`;
  if (pokemon.evolutions.length === 1 && pokemon.evolutions[0].length === 1) {
    return `<span class="placeholder-chip">진화 단계 없음</span>`;
  }

  return pokemon.evolutions
    .map((stage, index) => {
      const stageLabel = index === 0 ? "기본" : `${index}단계`;
      return `
        <div class="evolution-stage">
          <span class="evolution-stage-label">${escapeHtml(stageLabel)}</span>
          <div class="evolution-list">
            ${stage.map((entry) => renderEvolutionSpecies(entry, pokemon.id)).join("")}
          </div>
        </div>
      `;
    })
    .join("");
}

function renderEvolutionSpecies(entry, currentId) {
  const pokemon = state.pokemonById.get(entry.id);
  const name = pokemon?.baseName || pokemon?.name || toTitleCase(entry.speciesName.replace(/-/g, " "));
  const dexNumber = pokemon?.dexNumber ? `No. ${String(pokemon.dexNumber).padStart(4, "0")}` : `#${entry.id}`;
  const image = pokemon?.image
    ? `<img src="${escapeHtml(pokemon.image)}" alt="${escapeHtml(name)} 이미지" loading="lazy" />`
    : `<span class="evolution-image-fallback" aria-hidden="true"></span>`;

  return `
    <button
      class="evolution-species ${entry.id === currentId ? "is-current" : ""}"
      type="button"
      data-jump-pokemon-id="${entry.id}"
      aria-label="${escapeHtml(name)} 카드로 이동"
    >
      <span class="evolution-image">${image}</span>
      <span class="evolution-name">${escapeHtml(name)}</span>
      <span class="evolution-number">${escapeHtml(dexNumber)}</span>
    </button>
  `;
}

function renderFormsPanel(pokemon) {
  const otherFormCount = getOtherFormNames(pokemon).length;
  if (!pokemon.detailDone || otherFormCount < 1) return "";

  const buttonText = pokemon.formsExpanded
    ? "폼 접기"
    : pokemon.formsLoading
      ? "폼 불러오는 중"
      : `다른 폼 보기 ${otherFormCount}`;
  const panel = pokemon.formsExpanded
    ? `
      <div class="forms-panel" aria-label="${escapeHtml(pokemon.name)} 폼 목록">
        ${
          pokemon.formsLoading
            ? `<span class="placeholder-chip">폼 정보 확인 중</span>`
            : getOtherForms(pokemon).map(renderFormCard).join("")
        }
      </div>
    `
    : "";

  return `
    <div class="forms-block">
      <button
        class="forms-toggle"
        type="button"
        data-form-id="${pokemon.id}"
        aria-expanded="${pokemon.formsExpanded}"
      >
        ${escapeHtml(buttonText)}
      </button>
      ${panel}
    </div>
  `;
}

function renderFormCard(form) {
  const collected = state.collected.has(form.collectionKey);
  const image = form.image
    ? `<img src="${escapeHtml(form.image)}" alt="${escapeHtml(form.name)} 이미지" loading="lazy" />`
    : `<span class="form-image-fallback" aria-hidden="true"></span>`;

  return `
    <div class="form-card" style="--form-accent: ${escapeHtml(form.accent)}">
      <div class="form-media">${image}</div>
      <div class="form-info">
        <strong>${escapeHtml(form.name)}</strong>
        <div class="form-types">${form.types.map(renderTypeBadge).join("")}</div>
      </div>
      <button
        class="form-collect-button ${collected ? "is-collected" : ""}"
        type="button"
        data-collect-id="${escapeHtml(form.collectionKey)}"
        aria-label="${escapeHtml(form.name)} 수집 완료"
        aria-pressed="${collected}"
      >
        <span class="pokeball-icon" aria-hidden="true"></span>
      </button>
    </div>
  `;
}

function getOtherFormNames(pokemon) {
  return pokemon.formNames.filter((formName) => formName !== pokemon.activePokemonName);
}

function getOtherForms(pokemon) {
  return pokemon.forms.filter((form) => form.pokemonName !== pokemon.activePokemonName);
}

async function toggleForms(id) {
  const pokemon = state.pokemonById.get(id);
  if (!pokemon || !pokemon.detailDone || pokemon.formNames.length <= 1) return;

  pokemon.formsExpanded = !pokemon.formsExpanded;
  replaceRenderedCard(pokemon);

  if (!pokemon.formsExpanded || pokemon.formsLoaded || pokemon.formsLoading) return;

  pokemon.formsLoading = true;
  replaceRenderedCard(pokemon);

  try {
    pokemon.forms = await loadPokemonForms(pokemon);
    pokemon.formsLoaded = true;
  } catch (error) {
    console.warn(`Failed to load forms for ${pokemon.id}`, error);
    pokemon.forms = [];
  } finally {
    pokemon.formsLoading = false;
    replaceRenderedCard(pokemon);
  }
}

async function preloadCollectedForms(pokemon) {
  if (!hasCollectedForms(pokemon) || pokemon.formsLoaded || pokemon.formsLoading) return;

  pokemon.formNames = Array.from(new Set([...pokemon.formNames, ...getCollectedFormNamesForPokemon(pokemon)]));
  ensurePokemonForms(pokemon);
}

function preloadCollectedFormsForAll() {
  for (const pokemon of state.pokemon) {
    preloadCollectedForms(pokemon);
  }
}

function preloadAllForms() {
  for (const pokemon of state.pokemon) {
    ensurePokemonForms(pokemon);
  }
}

async function ensurePokemonForms(pokemon) {
  if (!pokemon.detailDone || pokemon.formsLoaded || pokemon.formsLoading) return;

  const formNames = new Set([...(pokemon.formNames || []), ...getCollectedFormNamesForPokemon(pokemon)]);
  pokemon.formNames = Array.from(formNames);

  if (getOtherFormNames(pokemon).length < 1 && !hasCollectedForms(pokemon)) return;

  pokemon.formsLoading = true;

  try {
    pokemon.forms = await loadPokemonForms(pokemon);
    pokemon.formsLoaded = true;
  } catch (error) {
    console.warn(`Failed to load forms for ${pokemon.id}`, error);
  } finally {
    pokemon.formsLoading = false;
    if (state.showAllForms || state.statusFilter === "collected") scheduleRender();
    if (pokemon.formsExpanded) replaceRenderedCard(pokemon);
  }
}

function toggleEvolution(id) {
  const pokemon = state.pokemonById.get(id);
  if (!pokemon || !pokemon.detailDone) return;

  pokemon.evolutionExpanded = !pokemon.evolutionExpanded;
  if (pokemon.evolutionExpanded && !pokemon.evolutionLoaded && !pokemon.evolutionLoading) {
    ensurePokemonEvolution(pokemon);
  }

  replaceRenderedCard(pokemon);
}

async function ensurePokemonEvolution(pokemon) {
  if (!pokemon.detailDone || pokemon.evolutionLoaded || pokemon.evolutionLoading) return;

  pokemon.evolutionLoading = true;
  replaceRenderedCard(pokemon);

  try {
    pokemon.evolutions = await loadPokemonEvolution(pokemon);
    pokemon.evolutionLoaded = true;
  } catch (error) {
    console.warn(`Failed to load evolution chain for ${pokemon.id}`, error);
    pokemon.evolutions = [];
    pokemon.evolutionLoaded = true;
  } finally {
    pokemon.evolutionLoading = false;
    replaceRenderedCard(pokemon);
  }
}

async function loadPokemonEvolution(pokemon) {
  let chainUrl = pokemon.evolutionChainUrl;

  if (!chainUrl) {
    const species = await fetchJson(`${API_BASE}/pokemon-species/${pokemon.id}`);
    chainUrl = species.evolution_chain?.url || "";
    pokemon.evolutionChainUrl = chainUrl;
  }

  if (!chainUrl) return [];

  const cacheKey = chainUrl || pokemon.speciesName || pokemon.englishName || String(pokemon.id);
  const cached = readEvolutionCache(cacheKey);
  if (cached) return cached;

  const chain = await fetchJson(chainUrl);
  const evolutions = normalizeEvolutionChain(chain.chain);
  writeEvolutionCache(cacheKey, evolutions);
  return evolutions;
}

function normalizeEvolutionChain(chain) {
  const stages = [];

  function visit(node, depth) {
    if (!node?.species) return;

    if (!stages[depth]) stages[depth] = [];
    stages[depth].push({
      id: getIdFromUrl(node.species.url),
      speciesName: node.species.name,
    });

    for (const child of node.evolves_to || []) {
      visit(child, depth + 1);
    }
  }

  visit(chain, 0);
  return stages.map((stage) => stage.filter((entry) => Number.isInteger(entry.id))).filter((stage) => stage.length);
}

function hasCollectedForms(pokemon) {
  return getCollectedFormNamesForPokemon(pokemon).length > 0;
}

function getCollectedFormNamesForPokemon(pokemon) {
  const speciesName = pokemon.speciesName || pokemon.englishName;
  if (!speciesName) return [];

  const formNames = new Set(pokemon.formNames || []);

  for (const key of state.collected) {
    if (!String(key).startsWith("form:")) continue;

    const formName = String(key).slice(5);
    if (formName === speciesName || formName.startsWith(`${speciesName}-`)) {
      formNames.add(formName);
    }
  }

  return Array.from(formNames).filter((formName) => state.collected.has(getFormCollectionKey(formName)));
}

async function loadPokemonForms(pokemon) {
  const cached = readFormsCache(pokemon.speciesName);
  if (cached) return cached.map((form) => localizeFormDetail(form, pokemon));

  const forms = await Promise.all(
    pokemon.formNames.map(async (formName) => {
      const formPokemon = await fetchJson(`${API_BASE}/pokemon/${formName}`);
      return normalizeFormPokemon(formPokemon, pokemon);
    }),
  );

  writeFormsCache(pokemon.speciesName, forms);
  return forms;
}

async function normalizeFormPokemon(formPokemon, pokemon) {
  const types = formPokemon.types
    .slice()
    .sort((a, b) => a.slot - b.slot)
    .map((entry) => entry.type.name);
  const image =
    formPokemon.sprites?.other?.["official-artwork"]?.front_default ||
    formPokemon.sprites?.other?.home?.front_default ||
    formPokemon.sprites?.front_default ||
    "";

  return {
    collectionKey: getFormCollectionKey(formPokemon.name),
    pokemonName: formPokemon.name,
    name: getFormDisplayName(pokemon.baseName || pokemon.name, pokemon.speciesName, formPokemon.name),
    image,
    types,
    regions: getFormRegions(formPokemon.name, pokemon),
    dexContext: await getFormDexContext(formPokemon.name, pokemon),
    accent: getTypeColor(types[0]),
  };
}

function localizeFormDetail(form, pokemon) {
  return {
    ...form,
    name: getFormDisplayName(pokemon.baseName || pokemon.name, pokemon.speciesName, form.pokemonName),
    regions: form.regions?.length ? form.regions : getFormRegions(form.pokemonName, pokemon),
    dexContext: form.dexContext || {
      dexName: state.dexName,
      dexNumber: pokemon.dexNumber,
    },
  };
}

async function getFormDexContext(pokemonName, pokemon) {
  const formRegion = getRegionalFormRegion(pokemonName, pokemon.speciesName);
  const regionalDexName = REGIONAL_FORM_POKEDEX[formRegion];

  if (regionalDexName) {
    try {
      const dexData = await loadPokedexEntries(regionalDexName);
      const entry = dexData.entries.find((candidate) => candidate.id === pokemon.id);

      if (entry) {
        return {
          dexName: regionalDexName,
          dexNumber: entry.dexNumber,
        };
      }
    } catch (error) {
      console.warn(`Failed to resolve form dex context for ${pokemonName}`, error);
    }
  }

  return {
    dexName: state.dexName,
    dexNumber: pokemon.dexNumber,
  };
}

function getFormRegions(pokemonName, pokemon) {
  const regions = new Set();
  const formRegion = getRegionalFormRegion(pokemonName, pokemon.speciesName);

  if (formRegion) regions.add(formRegion);
  for (const region of pokemon.regions || []) regions.add(region);
  if (!regions.size) regions.add(state.dexRegion || "unknown");

  return Array.from(regions).slice(0, 4);
}

function getFormDisplayName(baseName, speciesName, pokemonName) {
  const formRegion = getRegionalFormRegion(pokemonName, speciesName);
  const formLabel = formRegion ? REGION_META[formRegion]?.[0] : "";

  if (formLabel) return `${baseName} (${formLabel})`;
  if (pokemonName === speciesName) return baseName;

  const suffix = pokemonName.replace(`${speciesName}-`, "").replace(/-/g, " ");
  return `${baseName} (${toTitleCase(suffix)})`;
}

function replaceRenderedCard(pokemon) {
  const card = grid.querySelector(`[data-pokemon-id="${pokemon.id}"]`);
  if (!card) return;
  card.outerHTML = renderPokemonCard(pokemon);
}

function renderTypeBadge(type) {
  const [label, icon, color] = TYPE_META[type] || [toTitleCase(type), "?", "#637084"];
  return `
    <span
      class="type-badge"
      style="--type-ink: ${color}; --type-bg: ${hexToAlpha(color, 0.12)}; --type-line: ${hexToAlpha(color, 0.28)}; --badge-color: ${color}"
    >
      <span class="badge-icon" aria-hidden="true">${escapeHtml(icon)}</span>
      ${escapeHtml(label)}
    </span>
  `;
}

function renderRegionBadge(region) {
  const [label, icon, color] = REGION_META[region] || REGION_META.unknown;
  return `
    <span class="region-badge" style="--badge-color: ${color}">
      <span class="badge-icon" aria-hidden="true">${escapeHtml(icon)}</span>
      ${escapeHtml(label)}
    </span>
  `;
}

function getVisibleItems() {
  if (state.statusFilter === "collected") {
    return getCollectedVisibleItems();
  }

  const items = [];

  for (const pokemon of state.pokemon) {
    if (matchesFilters(pokemon)) {
      items.push({ kind: "pokemon", pokemon });
    }

    if (!state.showAllForms || !pokemon.detailDone || getOtherFormNames(pokemon).length < 1) continue;

    ensurePokemonForms(pokemon);

    for (const form of getOtherForms(pokemon)) {
      if (matchesFormFilters(form) && matchesFormSearch(form, pokemon)) {
        items.push({ kind: "form", form, parent: pokemon });
      }
    }
  }

  return items;
}

function getCollectedVisibleItems() {
  const items = [];

  for (const pokemon of state.pokemon) {
    if (hasCollectedForms(pokemon) && !pokemon.formsLoaded && !pokemon.formsLoading) {
      preloadCollectedForms(pokemon);
    }

    if (state.collected.has(getSpeciesCollectionKey(pokemon)) && matchesDataFilters(pokemon) && matchesSearch(pokemon)) {
      items.push({ kind: "pokemon", pokemon });
    }

    const collectedFormKeys = new Set(getCollectedFormNamesForPokemon(pokemon).map(getFormCollectionKey));

    for (const form of pokemon.forms || []) {
      if (!collectedFormKeys.has(form.collectionKey)) continue;
      if (state.collected.has(form.collectionKey) && matchesFormFilters(form) && matchesFormSearch(form, pokemon)) {
        items.push({ kind: "form", form, parent: pokemon });
      }
    }
  }

  return items;
}

function matchesFilters(pokemon) {
  const collected = isPokemonCollected(pokemon);
  if (state.statusFilter === "collected" && !collected) return false;
  if (state.statusFilter === "missing" && collected) return false;
  return matchesDataFilters(pokemon) && matchesSearch(pokemon);
}

function matchesDataFilters(pokemon) {
  if (!state.filtersEnabled) return true;
  if (state.typeFilters.size && !includesAll(pokemon.types, state.typeFilters)) return false;
  if (state.regionFilters.size && !includesAll(pokemon.regions, state.regionFilters)) return false;
  return true;
}

function matchesFormFilters(form) {
  if (!state.filtersEnabled) return true;
  if (state.typeFilters.size && !includesAll(form.types, state.typeFilters)) return false;
  if (state.regionFilters.size && !includesAll(form.regions, state.regionFilters)) return false;
  return true;
}

function includesAll(values, requiredValues) {
  return Array.from(requiredValues).every((value) => values.includes(value));
}

function matchesSearch(pokemon) {
  if (!state.searchQuery) return true;

  const query = state.searchQuery;
  const number = String(pokemon.dexNumber);
  const paddedNumber = number.padStart(4, "0");
  const haystack = [
    pokemon.name,
    pokemon.englishName,
    pokemon.activePokemonName,
    pokemon.speciesName,
    number,
    paddedNumber,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

function matchesFormSearch(form, parent) {
  if (!state.searchQuery) return true;

  const query = state.searchQuery;
  const number = String(parent.dexNumber);
  const paddedNumber = number.padStart(4, "0");
  const haystack = [
    form.name,
    form.pokemonName,
    parent.name,
    parent.englishName,
    parent.speciesName,
    number,
    paddedNumber,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

function updateStatusButtons() {
  document.querySelectorAll("[data-status-filter]").forEach((button) => {
    const active = button.dataset.statusFilter === state.statusFilter;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function updateModeButtons() {
  document.querySelectorAll("[data-view-mode]").forEach((button) => {
    const active = button.dataset.viewMode === state.viewMode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function updateAllFormsToggle() {
  allFormsToggle.classList.toggle("is-active", state.showAllForms);
  allFormsToggle.setAttribute("aria-checked", String(state.showAllForms));
  allFormsToggle.querySelector(".filter-switch-state").textContent = state.showAllForms ? "ON" : "OFF";
}

function updateFilterToggle() {
  filterToggle.classList.toggle("is-active", state.filtersEnabled);
  filterToggle.setAttribute("aria-checked", String(state.filtersEnabled));
  filterToggle.querySelector(".filter-switch-state").textContent = state.filtersEnabled ? "ON" : "OFF";
  const filterPanel = document.querySelector(".checkbox-filters");
  if (filterPanel) filterPanel.hidden = !state.filtersEnabled;
}

function readCheckedValues(group) {
  return new Set(
    Array.from(group.querySelectorAll("input[type='checkbox']:checked")).map((input) => input.value),
  );
}

function syncCheckboxUI() {
  for (const input of typeFilterGroup.querySelectorAll("input[type='checkbox']")) {
    input.checked = state.typeFilters.has(input.value);
  }

  for (const input of regionFilterGroup.querySelectorAll("input[type='checkbox']")) {
    input.checked = state.regionFilters.has(input.value);
  }
}

function getSpeciesCollectionKey(pokemon) {
  return String(pokemon.id);
}

function getFormCollectionKey(formName) {
  return `form:${formName}`;
}

function isPokemonCollected(pokemon) {
  return state.collected.has(getSpeciesCollectionKey(pokemon));
}

function toggleCollected(collectionKey) {
  if (state.collected.has(collectionKey)) {
    state.collected.delete(collectionKey);
  } else {
    state.collected.add(collectionKey);
  }

  writeCollected();
  render();
}

function refreshExportCode() {
  collectionCode.value = encodeCollection(state.collected, state.maxId);
}

async function copyExportCode() {
  refreshExportCode();

  try {
    await navigator.clipboard.writeText(collectionCode.value);
    importMessage.textContent = "수집 코드를 복사했습니다.";
  } catch {
    collectionCode.focus();
    collectionCode.select();
    importMessage.textContent = "텍스트를 선택했습니다.";
  }
}

function importCollectionCode() {
  try {
    const imported = decodeCollection(importCode.value.trim());
    state.collected = imported;
    writeCollected();
    preloadCollectedFormsForAll();
    importMessage.textContent = `${imported.size}마리의 수집 정보를 가져왔습니다.`;
    render();
  } catch {
    importMessage.textContent = "가져오기 코드 형식을 확인해 주세요.";
  }
}

function encodeCollection(collected, maxId) {
  const values = Array.from(collected).map(String).sort(compareCollectionKeys);

  if (!values.every(isNumericCollectionKey)) {
    return `PD2.j.${base64UrlEncode(new TextEncoder().encode(JSON.stringify(values)))}`;
  }

  const numericValues = new Set(values.map(Number));
  const sparseCode = `PD1.v.${base64UrlEncode(encodeSparseIds(numericValues))}`;
  const bitsetCode = encodeBitsetCollection(numericValues, maxId);

  return sparseCode.length <= bitsetCode.length ? sparseCode : bitsetCode;
}

function encodeBitsetCollection(collected, maxId) {
  const safeMaxId = Math.max(maxId, ...collected, 0);
  const bytes = new Uint8Array(Math.ceil(safeMaxId / 8));

  for (const id of collected) {
    if (id > 0) bytes[Math.floor((id - 1) / 8)] |= 1 << ((id - 1) % 8);
  }

  return `PD1.b.${safeMaxId.toString(36)}.${base64UrlEncode(bytes)}`;
}

function decodeCollection(code) {
  const parts = code.split(".");
  const [prefix, mode] = parts;

  if (prefix === "PD2" && mode === "j") {
    const json = new TextDecoder().decode(base64UrlDecode(parts[2] || ""));
    return new Set(JSON.parse(json).map(String));
  }

  if (prefix !== "PD1") {
    throw new Error("Invalid collection code");
  }

  if (mode === "v") {
    return decodeSparseIds(base64UrlDecode(parts[2] || ""));
  }

  if (mode === "b") {
    return decodeBitsetCollection(parts[2], parts[3]);
  }

  return decodeBitsetCollection(parts[1], parts[2]);
}

function decodeBitsetCollection(maxPart, payload) {
  if (!maxPart || payload === undefined) throw new Error("Invalid bitset collection code");

  const maxId = parseInt(maxPart, 36);
  const bytes = base64UrlDecode(payload);
  const collected = new Set();

  for (let id = 1; id <= maxId; id += 1) {
    if (bytes[Math.floor((id - 1) / 8)] & (1 << ((id - 1) % 8))) {
      collected.add(String(id));
    }
  }

  return collected;
}

function encodeSparseIds(collected) {
  const ids = Array.from(collected).sort((a, b) => a - b);
  const bytes = [];
  let previous = 0;

  for (const id of ids) {
    writeVarint(id - previous, bytes);
    previous = id;
  }

  return Uint8Array.from(bytes);
}

function decodeSparseIds(bytes) {
  const collected = new Set();
  let previous = 0;
  let value = 0;
  let shift = 0;

  for (const byte of bytes) {
    value |= (byte & 0x7f) << shift;

    if (byte & 0x80) {
      shift += 7;
      continue;
    }

    previous += value;
    if (previous > 0) collected.add(String(previous));
    value = 0;
    shift = 0;
  }

  if (shift !== 0) throw new Error("Incomplete varint");
  return collected;
}

function writeVarint(value, bytes) {
  let current = value;

  while (current >= 0x80) {
    bytes.push((current & 0x7f) | 0x80);
    current >>= 7;
  }

  bytes.push(current);
}

function readCollected() {
  try {
    const ids = JSON.parse(localStorage.getItem(STORAGE.collected) || "[]");
    return new Set(ids.map(String).filter(isValidCollectionKey));
  } catch {
    return new Set();
  }
}

function writeCollected() {
  localStorage.setItem(STORAGE.collected, JSON.stringify(Array.from(state.collected).sort(compareCollectionKeys)));
}

function isNumericCollectionKey(value) {
  return /^\d+$/.test(String(value)) && Number(value) > 0;
}

function isValidCollectionKey(value) {
  return isNumericCollectionKey(value) || /^form:[a-z0-9-]+$/.test(String(value));
}

function compareCollectionKeys(a, b) {
  const left = String(a);
  const right = String(b);
  const leftNumber = isNumericCollectionKey(left);
  const rightNumber = isNumericCollectionKey(right);

  if (leftNumber && rightNumber) return Number(left) - Number(right);
  if (leftNumber) return -1;
  if (rightNumber) return 1;
  return left.localeCompare(right);
}

function readPokedexCache(dexName) {
  try {
    const cached = JSON.parse(localStorage.getItem(`${STORAGE.shellsPrefix}${dexName}`) || "null");
    if (!cached || Date.now() - cached.cachedAt > CACHE_TTL) return null;
    return cached.data;
  } catch {
    return null;
  }
}

function writePokedexCache(dexName, data) {
  try {
    localStorage.setItem(`${STORAGE.shellsPrefix}${dexName}`, JSON.stringify({ cachedAt: Date.now(), data }));
  } catch {
    // The list can be fetched again when storage is unavailable.
  }
}

function readPokemonCache(id, dexName) {
  try {
    const cached = JSON.parse(localStorage.getItem(`${STORAGE.pokemonPrefix}${dexName}:${id}`) || "null");
    if (!cached || Date.now() - cached.cachedAt > CACHE_TTL) return null;
    return cached.data;
  } catch {
    return null;
  }
}

function writePokemonCache(id, dexName, data) {
  try {
    localStorage.setItem(`${STORAGE.pokemonPrefix}${dexName}:${id}`, JSON.stringify({ cachedAt: Date.now(), data }));
  } catch {
    // If browser storage is full, the app still works without cache.
  }
}

function readEvolutionCache(speciesName) {
  try {
    const cached = JSON.parse(localStorage.getItem(`${STORAGE.evolutionPrefix}${speciesName}`) || "null");
    if (!cached || Date.now() - cached.cachedAt > CACHE_TTL) return null;
    return cached.data;
  } catch {
    return null;
  }
}

function writeEvolutionCache(speciesName, data) {
  try {
    localStorage.setItem(`${STORAGE.evolutionPrefix}${speciesName}`, JSON.stringify({ cachedAt: Date.now(), data }));
  } catch {
    // Evolution details can be loaded again on demand.
  }
}

function readFormsCache(speciesName) {
  try {
    const cached = JSON.parse(localStorage.getItem(`${STORAGE.formsPrefix}${speciesName}`) || "null");
    if (!cached || Date.now() - cached.cachedAt > CACHE_TTL) return null;
    return cached.data;
  } catch {
    return null;
  }
}

function writeFormsCache(speciesName, data) {
  try {
    localStorage.setItem(`${STORAGE.formsPrefix}${speciesName}`, JSON.stringify({ cachedAt: Date.now(), data }));
  } catch {
    // Form details can be loaded again on demand.
  }
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

function getPokedexLabel(name) {
  return POKEDEX_LABELS[name] || toTitleCase(name.replace(/-/g, " "));
}

function getRegionFromDexName(name) {
  if (!name) return "unknown";
  if (name.includes("kanto")) return "kanto";
  if (name.includes("johto")) return "johto";
  if (name.includes("hoenn")) return "hoenn";
  if (name.includes("sinnoh")) return "sinnoh";
  if (name.includes("unova")) return "unova";
  if (name.includes("kalos")) return "kalos";
  if (
    name.includes("alola") ||
    name.includes("melemele") ||
    name.includes("akala") ||
    name.includes("ulaula") ||
    name.includes("poni")
  ) {
    return "alola";
  }
  if (name.includes("galar") || name.includes("armor") || name.includes("tundra")) return "galar";
  if (name.includes("hisui")) return "hisui";
  if (name.includes("paldea") || name.includes("kitakami") || name.includes("blueberry")) return "paldea";
  return "unknown";
}

function getIdFromUrl(url) {
  const match = String(url).match(/\/(\d+)\/?$/);
  return match ? Number(match[1]) : null;
}

function base64UrlEncode(bytes) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(value) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(base64);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function getTypeColor(type) {
  return TYPE_META[type]?.[2] || "#637084";
}

function hexToAlpha(hex, alpha) {
  const clean = hex.replace("#", "");
  const value = parseInt(clean, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function toTitleCase(value) {
  return value.replace(/(^|\s|-)([a-z])/g, (_, prefix, char) => `${prefix}${char.toUpperCase()}`);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
