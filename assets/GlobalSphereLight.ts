import { _decorator, Component, Node, SphereLight, v3 } from 'cc';
import { Shader } from './shader/Shader';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('GlobalSphereLight')
@executeInEditMode(true)
export class GlobalSphereLight extends Component {
    private _sphereLight: SphereLight = null;
    private t_vec = v3();

    protected onLoad(): void {
        this._sphereLight = this.getComponent(SphereLight);
    }

    protected onDisable(): void {
        Shader.setGlobal(1, 0, 0, 0);
    }

    update(deltaTime: number) {
        const pos = this.node.getPosition(this.t_vec);
        const lit = this._sphereLight;
        const color = lit.color;
        Shader.setGlobal(0, pos.x, pos.y, pos.z, lit.range);
        Shader.setGlobal(1, color.r / 255, color.g / 255, color.b / 255);
    }
}


