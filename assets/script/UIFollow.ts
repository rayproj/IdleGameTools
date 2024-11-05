import { _decorator, Camera, Component, find, Node, NodeEventType, TransformBit, v3, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

const t_vec = v3();
const t_vec2 = v3();

@ccclass('UIFollow')
export class UIFollow extends Component {
    @property(Camera)
    camera: Camera = null;
    @property(Node)
    followNode: Node = null;
    @property(Vec3)
    followOffset = v3();

    private _currPos = v3();
    private _currCameraPos = v3();
    private _currCameraFov = 0;

    start() {
        if (this.camera === null) {
            const cameraNode = find('Main Camera');
            if (cameraNode) {
                const camera = this.camera = cameraNode.getComponent(Camera);
                cameraNode.getWorldPosition(this._currCameraPos);
                this._currCameraFov = camera.fov;
            }
        }
        if (this.followNode !== null) {
            const pos = this.followNode.getWorldPosition(this._currPos);
            pos.x -= 100;
        }
    }

    protected update(dt: number): void {
        const followNode = this.followNode, camera = this.camera;
        if (followNode && camera) {
            const tPos = followNode.getWorldPosition(t_vec);
            const cPos = camera.node.getWorldPosition(t_vec2)
            const cFov = camera.fov;
            let sync = false;
            if (!this._currPos.equals(tPos)) {
                this._currPos.set(tPos);
                sync = true;
            } else if (!this._currCameraPos.equals(cPos)) {
                this._currCameraPos.set(cPos);
                sync = true;
            } else if (this._currCameraFov !== cFov) {
                this._currCameraFov = cFov;
                sync = true;
            }
            if (sync) {
                camera.convertToUINode(tPos, this.node.parent, t_vec);
                t_vec.z = 0;
                this.node.setPosition(t_vec);
            }
        }
    }
}


