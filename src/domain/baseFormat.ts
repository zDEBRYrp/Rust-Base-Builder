export interface BaseObjectTransform {
  model: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
}

export type BaseObjects = Record<string, BaseObjectTransform>;

export interface RustBaseDocument {
  format: "rust-base-builder";
  version: 1;
  name: string;
  description: string;
  generatedBy: string;
  objects: BaseObjects;
}

export function createBaseDocument(objects: BaseObjects, name = "Моя база", description = "") : RustBaseDocument {
  return {
    format: "rust-base-builder",
    version: 1,
    name,
    description,
    generatedBy: "Rust Base Builder",
    objects,
  };
}

export function stringifyBaseDocument(objects: BaseObjects, name?: string, description?: string) {
  return JSON.stringify(createBaseDocument(objects, name, description), null, 2);
}

export function parseBaseDocument(value: string): BaseObjects {
  const parsed = JSON.parse(value);
  if (parsed?.format === "rust-base-builder" && parsed?.objects) return parsed.objects as BaseObjects;
  if (parsed && typeof parsed === "object") return parsed as BaseObjects;
  throw new Error("Некорректный формат базы");
}

export const AI_BASE_PROMPT = `Создай базу для Rust в формате Rust Base Builder.
Верни только валидный JSON без Markdown и комментариев:
{
  "format": "rust-base-builder",
  "version": 1,
  "name": "Название базы",
  "description": "Краткое описание",
  "generatedBy": "AI",
  "objects": {
    "wall-1": {
      "model": "StoneWallMid",
      "position": { "x": 0, "y": 1, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 }
    }
  }
}
Используй только модели из списка приложения (например StoneFoundationSquareMid, MetalWallMid, ArmoredWallMid, ToolCupboard, ShotgunTrap, AutoTurret, FlameTurret, SAMSite, VendingMachine).`;
