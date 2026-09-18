const translations: Record<string, string> = {
  "stone": "камень", "metal": "металл", "armored": "ВМК", "wood": "дерево", "straw": "солома",
  "foundation": "фундамент", "wall": "стена", "floor": "пол", "roof": "крыша", "door": "дверь",
  "doorway": "дверной проём", "window": "окно", "stairs": "лестница", "frame": "каркас",
  "square": "квадрат", "triangle": "треугольник", "high": "высокий", "mid": "средний", "low": "низкий",
  "left": "левый", "right": "правый", "garage": "гаражная", "vertical": "вертикальная", "embrasure": "бойница",
  "strenghtened": "усиленное", "glass": "стеклянное", "tool": "строительный", "cupboard": "шкаф",
  "storage": "ящик", "box": "ящик", "large": "большой", "furnace": "печь", "workbench": "верстак",
  "sleeping": "спальный", "bag": "мешок", "t3": "уровень 3", "build cost": "стоимость строительства",
  "upkeep cost": "содержание", "components cost": "компоненты", "search model...": "поиск объекта...",
};

export function ruLabel(value: string) {
  return value.split(/([ ()]+)/).map((part) => translations[part.toLowerCase()] ?? part).join("");
}

export function ruWords(value: string) {
  return value.split(/\s+/).map((part) => translations[part.toLowerCase()] ?? part).join(" ");
}
