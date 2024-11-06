import { _decorator, Component, find, Node, v3, Vec3 } from 'cc';
import { VecUtils } from './VecUtils';
const { ccclass, property, executeInEditMode } = _decorator;

const t_vec = v3();

@ccclass('Billboard2D')
@executeInEditMode(true)
export class Billboard2D extends Component {
    @property(Node)
    cameraNode: Node = null;
    @property(Node)
    followNode: Node = null;
    @property(Vec3)
    followOffset = v3();

    private _currPos = v3();

    start() {
        if (this.cameraNode === null) {
            this.cameraNode = find('Main Camera');
        }
        this.node.getWorldPosition(this._currPos);
        this._currPos.add(this.followOffset);
    }

    update(deltaTime: number) {
        const cameraNode = this.cameraNode;
        if (cameraNode) {
            const cameraWR = cameraNode.worldRotation;
            if (!this.node.worldRotation.equals(cameraWR)) {
                this.node.worldRotation = cameraWR;
            }
        }

        const followNode = this.followNode;
        if (followNode) {
            const tPos = followNode.getWorldPosition(t_vec);
            if (!VecUtils.equalsVec3(this._currPos, tPos)) {
                this._currPos.set(tPos);
                tPos.add(this.followOffset);
                this.node.setWorldPosition(tPos);
            }
        }
    }
}


