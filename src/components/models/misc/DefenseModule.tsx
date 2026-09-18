import { RootState } from "../../../Store";
import { useSelector } from "react-redux";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";
import { ModelComponentsCommonLogic } from "../../script/ModelComponentsCommonLogic";

type DefenseName = "ShotgunTrap" | "AutoTurret" | "FlameTurret" | "SAMSite" | "VendingMachine";
type Props = { modelName: DefenseName; label: string; assetPath: string; scale?: number };

function DefenseModel({ modelName, label, assetPath, scale = 1 }: Props) {
  const miscs_active = useSelector((state: RootState) => state.modelsData.miscs_active);
  const { ModelOnClick, ModelOnPointerOver, ModelOnPointerOut, ModelMissedClick, meshAnnotationVisibility, model_destroyed } = ModelComponentsCommonLogic();
  const { scene } = useGLTF(assetPath) as { scene: THREE.Group };
  const modelScene = useMemo(() => scene.clone(), [scene]);
  return miscs_active && !model_destroyed ? (
    <group scale={scale}
        onClick={() => ModelOnClick(modelName)}
        onPointerOver={(event) => { event.stopPropagation(); ModelOnPointerOver(); }}
        onPointerOut={() => ModelOnPointerOut()}
        onPointerMissed={() => ModelMissedClick()}
      >
        <primitive object={modelScene} />
        {meshAnnotationVisibility([label, "не улучшается", "не ухудшается"])}
    </group>
  ) : null;
}

export function ShotgunTrap() { return <DefenseModel modelName="ShotgunTrap" label="Дробовиковая ловушка" assetPath="./models/facepunch/shotgun_trap.glb" scale={0.8} />; }
export function AutoTurret() { return <DefenseModel modelName="AutoTurret" label="Автоматическая турель" assetPath="./models/facepunch/auto_turret.glb" scale={0.8} />; }
export function FlameTurret() { return <DefenseModel modelName="FlameTurret" label="Огненная турель" assetPath="./models/facepunch/flame_turret.glb" scale={0.8} />; }
export function SAMSite() { return <DefenseModel modelName="SAMSite" label="Зенитная установка" assetPath="./models/facepunch/sam_site.glb" scale={0.8} />; }
export function VendingMachine() { return <DefenseModel modelName="VendingMachine" label="Торговый автомат" assetPath="./models/facepunch/vending_machine.glb" scale={0.8} />; }
ShotgunTrap.displayName = "ShotgunTrap";
AutoTurret.displayName = "AutoTurret";
FlameTurret.displayName = "FlameTurret";
SAMSite.displayName = "SAMSite";
VendingMachine.displayName = "VendingMachine";

useGLTF.preload("./models/facepunch/shotgun_trap.glb");
useGLTF.preload("./models/facepunch/auto_turret.glb");
useGLTF.preload("./models/facepunch/flame_turret.glb");
useGLTF.preload("./models/facepunch/sam_site.glb");
useGLTF.preload("./models/facepunch/vending_machine.glb");
