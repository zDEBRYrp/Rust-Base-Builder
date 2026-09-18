const exactTranslations: Record<string, string> = {
  "stone foundation square (high)": "Каменный фундамент · квадрат · высокий",
  "stone foundation square (mid)": "Каменный фундамент · квадрат · средний",
  "stone foundation square (low)": "Каменный фундамент · квадрат · низкий",
  "stone foundation triangle (high)": "Каменный фундамент · треугольник · высокий",
  "stone foundation triangle (mid)": "Каменный фундамент · треугольник · средний",
  "stone foundation triangle (low)": "Каменный фундамент · треугольник · низкий",
  "stone wall frame": "Каменный каркас стены", "metal vertical embrasure": "Металлическая вертикальная бойница",
  "strenghtened glass window": "Усиленное стеклянное окно", "tool cupboard (tc)": "Строительный шкаф",
  "wood storage box": "Деревянный ящик", "large box": "Большой деревянный ящик", "workbench (t3)": "Верстак 3 уровня",
  "sleeping bag": "Спальный мешок", "shotgun trap": "Дробиковая ловушка", "auto turret": "Автоматическая турель",
  "flame turret": "Огненная турель", "sam site": "Зенитная установка", "vending machine": "Торговый автомат",
};

const wordTranslations: Record<string, string> = {
  stone: "каменный", metal: "металлический", armored: "ВМК", wood: "деревянный", straw: "соломенный", foundation: "фундамент",
  wall: "стена", found: "фундамент", "found.": "фундамент", floor: "пол", roof: "крыша", door: "дверь", doorway: "дверной проём", window: "окно", stairs: "лестница",
  frame: "каркас", square: "квадрат", triangle: "треугольник", high: "высокий", mid: "средний", low: "низкий", left: "левый",
  right: "правый", garage: "гаражная", vertical: "вертикальная", embrasure: "бойница", strenghtened: "усиленное", glass: "стеклянное",
  tool: "строительный", cupboard: "шкаф", storage: "ящик", box: "ящик", large: "большой", furnace: "печь", workbench: "верстак",
  sleeping: "спальный", bag: "мешок", t3: "3 уровня", upgradeable: "улучшаемый", "non-upgradeable": "не улучшается",
  downgradeable: "ухудшаемый", "non-downgradeable": "не ухудшается", scrap: "скрап",
  gears: "шестерни", "sewing kit": "швейный набор", "lq. fuel": "топливо низкого качества",
};

export function ruLabel(value: string) {
  const normalized = value.trim().replace(/\s+/g, " ").toLowerCase();
  if (exactTranslations[normalized]) return exactTranslations[normalized];
  const translated = value.replace(/found\./gi, "foundation").replace(/L[- ]shape/gi, "Г-образная форма").replace(/U[- ]shape/gi, "П-образная форма")
    .split(/([ ()/.]+)/).map((part) => wordTranslations[part.toLowerCase()] ?? part).join("");
  return translated.replace(/каменный (стена|крыша|дверь|окно)/g, "каменная $1")
    .replace(/металлический (стена|крыша|дверь|окно|лестница)/g, "металлическая $1")
    .replace(/каменный лестница/g, "каменная лестница");
}

export function ruWords(value: string) {
  return value.split(/\s+/).map((part) => wordTranslations[part.toLowerCase()] ?? part).join(" ");
}

export function ruUi(value: string) {
  const map: Record<string, string> = {
    "Export the base": "Экспорт базы", "Import the base": "Импорт базы", "Base imported": "База импортирована",
    "Base code applied": "Код базы применён", "File removed": "Файл удалён", "Base not imported / incorrect data": "База не импортирована: неверные данные",
    "Base imported correctly!": "База успешно импортирована", "Imported base models": "Модели базы импортированы", "Base downloaded": "База скачана", "Base code generated": "Код базы создан",
    "Base code copied to clipboard": "Код базы скопирован", "Base code cleared": "Поле кода очищено",
    "save": "сохранить", "delete": "удалить", "reset": "сбросить", "upgrade": "улучшить",
  };
  return map[value] ?? value;
}
