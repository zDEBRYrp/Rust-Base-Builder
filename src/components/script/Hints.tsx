import { RootState } from "../../Store";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpDownLeftRight } from "@fortawesome/free-solid-svg-icons";

//Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//Component This component is responsible for displaying the currently available shortcuts or actions at the top of the screen (if enabled)
//Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function Hints() {
  const object_selected = useSelector((state: RootState) => state.modelsData.object_selected);
  const camera_type = useSelector((state: RootState) => state.camerasSettings.camera_type);
  const model_cretion_state = useSelector((state: RootState) => state.modelsData.model_creation_state);

  //prettier-ignore
  return (
    <div className="hint_container_bottom">
      {camera_type === "camera_3d" && !object_selected && !model_cretion_state && (
        <div className="hint_default_3d">
          <div className="hint_part">
            <span style={{ color: "#ffd5b3" }}>ЛКМ | MB1</span> — вращение камеры.
          </div>

          <div className="hint_part">
            <span style={{ color: "#ffd5b3" }}>ПКМ | MB2</span> — перемещение камеры.
          </div>

          <div className="hint_part">
            <span style={{ color: "#ffd5b3" }}>колесо мыши</span> — масштаб.
          </div>
        </div>
      )}
      {camera_type === "camera_2d" && !object_selected && (
        <div className="hint_default_2d">
          <div className="hint_part">
            <span style={{ color: "#ffd5b3" }}>ЛКМ | ПКМ</span> — перемещение камеры.
          </div>

          <div className="hint_part">
            <span style={{ color: "#ffd5b3" }}>колесо мыши</span> — масштаб.
          </div>
        </div>
      )}
      {object_selected && (
        <div className="hint_object_selected">
          <div className="hint_part">
            <FontAwesomeIcon icon={faUpDownLeftRight} size="lg" style={{ color: "#ffd5b3" }} />
            <span style={{ color: "#ffd5b3"}}>| W/A/S/D</span> - move
          </div>

          <div className="hint_part">
            <span style={{ color: "#ffd5b3" }}>Q/E</span> - rotate
          </div>

          <div className="hint_part">
            <span style={{ color: "#ffd5b3" }}>SPACE/CTRL</span> - up/down
          </div>

          <div className="hint_part">
            <span style={{ color: "#ffd5b3" }}>SHIFT</span> - unit
          </div>

          <div className="hint_part">
            <span style={{ color: "#ffd5b3" }}>DEL</span> - del.
          </div>
        </div>
      )}
      {model_cretion_state && (
        <div className="hint_creaton_state">
          <div className="hint_part">
            <span style={{ color: "#ffd5b3" }}>ЛКМ | MB1</span> — поставить объект.
          </div>
          <div className="hint_part">
            <span style={{ color: "#ffd5b3" }}>Q | E</span> - rotate obj.
          </div>
          <div className="hint_part">
            <span style={{ color: "#ffd5b3" }}>WASD</span> - change offset
          </div>
        </div>
      )}
    </div>
  );
}
