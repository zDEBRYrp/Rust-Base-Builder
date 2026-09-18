# Генерация базы через ИИ

Попросите ИИ вернуть только JSON по этому шаблону. Полученный JSON можно вставить в приложении в разделе «Импорт → JSON / код».

```text
Создай базу для Rust Base Builder. Верни только валидный JSON без Markdown:
{
  "format": "rust-base-builder",
  "version": 1,
  "name": "Название базы",
  "description": "Краткое описание",
  "generatedBy": "AI",
  "objects": {
    "foundation-1": {
      "model": "StoneFoundationSquareMid",
      "position": { "x": 0, "y": 0, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 }
    }
  }
}

Используй только эти модели: StoneFoundationSquareMid, StoneFoundationTriangleMid,
StoneWallMid, StoneWallHigh, StoneDoorway, StoneWindow, MetalWallMid,
ArmoredWallMid, ToolCupboard, ShotgunTrap, AutoTurret, Furnace, WorkbenchT3.
Также доступны FlameTurret, SAMSite и VendingMachine.
Координаты должны быть числами. Для поворота используй радианы.
```

Формат намеренно читаемый: человек или ИИ может открыть файл и понять каждую деталь базы без декодирования.
